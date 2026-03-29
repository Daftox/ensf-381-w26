import React from 'react';
import flavors from '../data/flavors';
import FlavorItem from './FlavorItem';

function FlavorCatalog({ onAddToOrder }) {
  return (
    <>
        <h2>Ice Cream Flavors</h2>
        <div className="flavor-grid">
        {flavors.map((flavor) => (
            <FlavorItem 
            key={flavor.id} 
            flavor={flavor} 
            onAddToOrder={onAddToOrder} 
            />
        ))}
        </div>
    </>
  );
}

export default FlavorCatalog;