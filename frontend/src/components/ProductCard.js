import React, { useState } from 'react';

// Color scheme per category
const CATEGORY_STYLES = {
    Electronics: { badge: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    Gaming:      { badge: '#dcfce7', text: '#166534', border: '#86efac' },
    Accessories: { badge: '#f3e8ff', text: '#6b21a8', border: '#c084fc' },
};

function ProductCard({ product }) {
    const [hovered, setHovered] = useState(false);
    const cat = CATEGORY_STYLES[product.category] || { badge: '#f1f5f9', text: '#475569', border: '#cbd5e1' };

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background:    '#ffffff',
                borderRadius:  '14px',
                padding:       '22px',
                display:       'flex',
                flexDirection: 'column',
                gap:           '12px',
                border:        '1px solid #e8ecf0',
                boxShadow:     hovered ? '0 12px 32px rgba(0,0,0,0.1)' : '0 2px 8px rgba(0,0,0,0.05)',
                transform:     hovered ? 'translateY(-4px)' : 'translateY(0)',
                transition:    'all 0.25s ease',
                cursor:        'default',
            }}
        >
            {/* Name + Price */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', lineHeight: 1.3 }}>
                    {product.name}
                </h3>
               <span style={{ fontSize: '18px', fontWeight: '800', color: '#059669', whiteSpace: 'nowrap' }}>
    ₹{product.price.toLocaleString('en-IN')}
</span>
            </div>

            {/* Category badge */}
            <span style={{
                display:         'inline-block',
                width:           'fit-content',
                background:      cat.badge,
                color:           cat.text,
                border:          `1px solid ${cat.border}`,
                borderRadius:    '20px',
                padding:         '3px 12px',
                fontSize:        '11px',
                fontWeight:      '700',
                letterSpacing:   '0.6px',
                textTransform:   'uppercase',
            }}>
                {product.category}
            </span>

            {/* Description */}
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: '1.65', margin: 0 }}>
                {product.description}
            </p>

            {/* Tags */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: 'auto' }}>
                {product.tags.map((tag, i) => (
                    <span key={i} style={{
                        background:   '#f3f4f6',
                        color:        '#6b7280',
                        borderRadius: '20px',
                        padding:      '3px 10px',
                        fontSize:     '11px',
                        fontWeight:   '500',
                    }}>
                        #{tag}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default ProductCard;