const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { getProductRecommendations } = require("./llmService");
const productsData = require("./data/products.json");

const app = express();
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

app.get("/health", (req, res) => res.json({ status: "healthy" }));

app.get("/api/products", (req, res) => {
    let products = [...productsData.products];
    if (req.query.category)
        products = products.filter(p => p.category.toLowerCase() === req.query.category.toLowerCase());
    res.json({ success: true, count: products.length, products });
});

app.post("/api/ask", async (req, res) => {
    const { query } = req.body;
    if (!query || !query.trim()) return res.status(400).json({ success: false, error: "Query required" });
    if (!process.env.GEMINI_API_KEY) return res.status(502).json({ success: false, error: "Add GEMINI_API_KEY to .env file" });
    try {
        const aiResponse = await getProductRecommendations(query.trim(), productsData.products);
        const matchedProducts = productsData.products.filter(p => aiResponse.productIds.includes(p.id));
        res.json({ success: true, query: query.trim(), summary: aiResponse.summary, products: matchedProducts });
    } catch (err) {
        res.status(502).json({ success: false, error: "AI error: " + err.message });
    }
});

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on http://localhost:" + (process.env.PORT || 5000));
    console.log("Gemini API: " + (process.env.GEMINI_API_KEY ? "Configured ✓" : "NOT configured ✗"));
});
