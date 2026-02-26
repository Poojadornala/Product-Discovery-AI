const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.GEMINI_API_KEY
});

async function getProductRecommendations(userQuery, products) {
    const productContext = products.map(p => ({
        id: p.id, name: p.name, category: p.category,
        price: p.price, tags: p.tags.join(", ")
    }));

    const prompt = `You are a product recommendation assistant.
Product Catalog:
${JSON.stringify(productContext, null, 2)}
User Query: "${userQuery}"
Respond ONLY with valid JSON, no extra text:
{"productIds": [array of matching product IDs as numbers], "summary": "brief explanation"}`;

    const response = await client.chat.completions.create({
        model: "openrouter/auto",
        messages: [{ role: "user", content: prompt }]
    });

    const clean = response.choices[0].message.content.trim().replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean.match(/\{[\s\S]*\}/)[0]);
    if (!Array.isArray(parsed.productIds)) parsed.productIds = [];
    if (!parsed.summary) parsed.summary = "Here are matching products.";
    return parsed;
}

module.exports = { getProductRecommendations };
