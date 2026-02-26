import React from 'react';
import ProductCard from './ProductCard';

function ProductList({ products, title }) {
    if (!products || products.length === 0) {
        return (
            <div style={{
                textAlign:     'center',
                padding:       '48px 24px',
                background:    '#f9fafb',
                borderRadius:  '12px',
                color:         '#6b7280',
                fontSize:      '15px',
            }}>
                No products found.
            </div>
        );
    }

    return (
        <section>
            {title && (
                <h2 style={{ fontSize: '22px', fontWeight: '700', marginBottom: '20px', color: '#111827' }}>
                    {title}
                </h2>
            )}
            <div style={{
                display:               'grid',
                gridTemplateColumns:   'repeat(auto-fill, minmax(300px, 1fr))',
                gap:                   '20px',
            }}>
                {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        </section>
    );
}

export default ProductList;