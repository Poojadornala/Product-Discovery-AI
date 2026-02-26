/**
 * API utility — all backend calls live here
 */
const BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

/** Fetch all products (optional category filter) */
export async function fetchProducts(category = '') {
    const url = category
        ? `${BASE}/api/products?category=${encodeURIComponent(category)}`
        : `${BASE}/api/products`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.json();
}

/** Send natural-language query to AI */
export async function askAI(query) {
    const res = await fetch(`${BASE}/api/ask`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ query }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
    return data;
}