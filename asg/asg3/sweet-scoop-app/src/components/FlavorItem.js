import React, { useState } from 'react';

function FlavorItem({ flavor, onAddToOrder }) {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div 
      className="flavor-card" 
      onMouseEnter={() => setShowDescription(true)}
      onMouseLeave={() => setShowDescription(false)}
    >
      <img src={flavor.image} alt={flavor.name} style={{ width: '100px' }} />
      <h3>{flavor.name}</h3>
      <p>{flavor.price}</p>
      {showDescription && <p className="description">{flavor.description}</p>}
      <button onClick={() => onAddToOrder(flavor)}>Add to Order</button>
    </div>
  );
}

export default FlavorItem;