import React, { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import AskBox      from './components/AskBox';
import { fetchProducts, askAI } from './api';

function App() {
    const [allProducts,      setAllProducts]      = useState([]);
    const [aiProducts,       setAiProducts]        = useState([]);
    const [aiSummary,        setAiSummary]          = useState('');
    const [isAiView,         setIsAiView]           = useState(false);
    const [loading,          setLoading]            = useState(false);
    const [error,            setError]              = useState(null);
    const [activeCategory,   setActiveCategory]     = useState('');

    // Load all products on mount
    useEffect(() => { loadProducts(); }, []);

    async function loadProducts(category = '') {
        try {
            setLoading(true);
            setError(null);
            const data = await fetchProducts(category);
            setAllProducts(data.products);
        } catch (err) {
            setError('Failed to load products. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    }

    async function handleAskAI(query) {
        try {
            setLoading(true);
            setError(null);
            const data = await askAI(query);
            setAiProducts(data.products);
            setAiSummary(data.summary);
            setIsAiView(true);
        } catch (err) {
            setError(err.message || 'AI service is currently unavailable.');
        } finally {
            setLoading(false);
        }
    }

    function handleReset() {
        setIsAiView(false);
        setAiProducts([]);
        setAiSummary('');
        setError(null);
    }

    function handleCategoryFilter(cat) {
        setActiveCategory(cat);
        setIsAiView(false);
        loadProducts(cat);
    }

    const categories = ['', 'Electronics', 'Gaming', 'Accessories'];

    return (
        <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>

            {/* ── Header ── */}
            <header style={{
                background:   '#fff',
                borderBottom: '1px solid #e5e7eb',
                padding:      '20px 0',
                textAlign:    'center',
                boxShadow:    '0 2px 8px rgba(0,0,0,0.05)',
            }}>
                <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#111827' }}>
                    🛍️ Product Discovery AI
                </h1>
                <p style={{ color: '#6b7280', marginTop: '6px', fontSize: '15px' }}>
                    Find the perfect product with natural language search
                </p>
            </header>

            {/* ── Main ── */}
            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 20px' }}>

                {/* Ask AI box */}
                <AskBox onAsk={handleAskAI} loading={loading} />

                {/* Error banner */}
                {error && (
                    <div style={{
                        background:   '#fef2f2',
                        border:       '1px solid #fecaca',
                        borderRadius: '10px',
                        padding:      '14px 18px',
                        marginBottom: '24px',
                        color:        '#991b1b',
                        display:      'flex',
                        justifyContent: 'space-between',
                        alignItems:   'center',
                    }}>
                        <span>⚠️ {error}</span>
                        <button onClick={handleReset} style={{
                            background: 'none', border: '1px solid #fca5a5',
                            borderRadius: '6px', color: '#991b1b',
                            padding: '4px 12px', cursor: 'pointer', fontSize: '13px',
                        }}>
                            Dismiss
                        </button>
                    </div>
                )}

                {/* AI result banner */}
                {isAiView && aiSummary && (
                    <div style={{
                        background:   '#eff6ff',
                        border:       '1px solid #bfdbfe',
                        borderRadius: '12px',
                        padding:      '18px 22px',
                        marginBottom: '24px',
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                            <span style={{ fontWeight: '700', color: '#1e40af', fontSize: '16px' }}>🤖 AI Recommendation</span>
                            <button onClick={handleReset} style={{
                                background: '#fff', border: '1px solid #bfdbfe',
                                borderRadius: '8px', color: '#1e40af',
                                padding: '6px 14px', cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                            }}>
                                ← Show All Products
                            </button>
                        </div>
                        <p style={{ color: '#1d4ed8', margin: 0, lineHeight: '1.6' }}>{aiSummary}</p>
                    </div>
                )}

                {/* Category filter tabs — only in browse view */}
                {!isAiView && (
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryFilter(cat)}
                                style={{
                                    padding:      '8px 20px',
                                    borderRadius: '20px',
                                    border:       '1px solid',
                                    borderColor:  activeCategory === cat ? '#4f46e5' : '#d1d5db',
                                    background:   activeCategory === cat ? '#4f46e5' : '#fff',
                                    color:        activeCategory === cat ? '#fff' : '#374151',
                                    fontWeight:   '600',
                                    fontSize:     '14px',
                                    cursor:       'pointer',
                                }}
                            >
                                {cat === '' ? 'All' : cat}
                            </button>
                        ))}
                    </div>
                )}

                {/* Product grid */}
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '60px', color: '#6b7280', fontSize: '16px' }}>
                        ⏳ Loading…
                    </div>
                ) : isAiView ? (
                    <ProductList
                        products={aiProducts}
                        title={`${aiProducts.length} Matching Product${aiProducts.length !== 1 ? 's' : ''} Found`}
                    />
                ) : (
                    <ProductList
                        products={allProducts}
                        title={`${activeCategory || 'All'} Products (${allProducts.length})`}
                    />
                )}
            </main>

            {/* ── Footer ── */}
            <footer style={{
                textAlign:    'center',
                padding:      '24px',
                color:        '#9ca3af',
                fontSize:     '13px',
                borderTop:    '1px solid #e5e7eb',
                background:   '#fff',
                marginTop:    '40px',
            }}>
              Dornala Pooja / Email: poojadornala0507@gmail.com
                Built with React + Node.js + OpenAI (via OpenRouter)
                THANK YOU FOR CHECKING OUT MY PROJECT! 🙏
            </footer>
        </div>
    );
}

export default App;