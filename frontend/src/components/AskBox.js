import React, { useState } from 'react';

const EXAMPLES = [
    'budget laptop for students',
    'good for gaming under 10000',
    'wireless audio accessories',
    'home automation devices',
];

function AskBox({ onAsk, loading }) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() && !loading) onAsk(query.trim());
    };

    return (
        <div style={{
            background:   'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
            borderRadius: '16px',
            padding:      '32px',
            marginBottom: '32px',
            color:        '#fff',
        }}>
            <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px' }}>
                Ask AI for Recommendations
            </h2>
            <p style={{ opacity: 0.85, fontSize: '14px', marginBottom: '20px' }}>
                Describe what you need in plain English
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px' }}>
                <input
                    type="text"
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    placeholder={EXAMPLES[Math.floor(Math.random() * EXAMPLES.length)]}
                    disabled={loading}
                    style={{
                        flex:         1,
                        padding:      '13px 18px',
                        borderRadius: '10px',
                        border:       '2px solid rgba(255, 255, 255, 0.3)',
                        background:   'rgba(255,255,255,0.15)',
                        color:        '#ffffff',
                        fontSize:     '15px',
                        backdropFilter: 'blur(4px)',
                    }}
                />
                <button
                    type="submit"
                    disabled={loading || !query.trim()}
                    style={{
                        padding:      '13px 28px',
                        background:   loading || !query.trim() ? 'rgba(255,255,255,0.3)' : '#fff',
                        color:        loading || !query.trim() ? 'rgba(255, 255, 255, 0.99)' : '#4f46e5',
                        border:       'none',
                        borderRadius: '10px',
                        fontWeight:   '700',
                        fontSize:     '15px',
                        cursor:       loading || !query.trim() ? 'not-allowed' : 'pointer',
                        whiteSpace:   'nowrap',
                        
                    }}
                >
                    {loading ? 'Thinking…' : 'Ask AI'}
                </button>
            </form>

            {/* Example chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                {EXAMPLES.map((ex, i) => (
                    <button
                        key={i}
                        onClick={() => { setQuery(ex); }}
                        disabled={loading}
                        style={{
                            background:   'rgba(255,255,255,0.2)',
                            border:       '1px solid rgba(255,255,255,0.35)',
                            borderRadius: '20px',
                            color:        '#fff',
                            fontSize:     '12px',
                            padding:      '5px 14px',
                            cursor:       'pointer',
                        }}
                    >
                        {ex}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default AskBox;