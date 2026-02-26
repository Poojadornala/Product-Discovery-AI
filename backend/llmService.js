const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY
});

async function getProductRecommendations(userQuery, products) {
  const productContext = products.map(p => ({
    id: p.id,
    name: p.name,
    category: p.category,
    price: p.price,
    tags: p.tags.join(", ")
  }));

  const prompt = `
You are an AI product recommendation engine.

Select up to 5 most relevant products.

Product Catalog:
${JSON.stringify(productContext, null, 2)}

User Query: "${userQuery}"

Return ONLY valid JSON:
{
  "productIds": [numbers],
  "summary": "brief explanation"
}
`;

  const response = await client.chat.completions.create({
    model: "meta-llama/llama-3.1-8b-instruct",
    messages: [
      { role: "system", content: "Return strict JSON only." },
      { role: "user", content: prompt }
    ]
  });

  try {
    const clean = response.choices[0].message.content
      .trim()
      .replace(/```json|```/g, "")
      .trim();

    const parsed = JSON.parse(clean.match(/\{[\s\S]*\}/)[0]);

    return {
      productIds: Array.isArray(parsed.productIds) ? parsed.productIds : [],
      summary: parsed.summary || "Here are matching products."
    };
  } catch {
    return { productIds: [], summary: "AI parsing failed." };
  }
}

module.exports = { getProductRecommendations };