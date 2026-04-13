import React from "react";
import FlavorItem from "./FlavorItem";

function FlavorCatalog({ flavors, addToOrder }) {
  return (
    <div className="catalog-container">
      <h2>Ice Cream Flavors</h2>
      <div className="flavor-grid">
        {flavors.length > 0 ? (
          flavors.map((f) => (
            <FlavorItem key={f.id} flavor={f} addToOrder={addToOrder} />
          ))
        ) : (
          <p>Loading flavors...</p>
        )}
      </div>
    </div>
  );
}

export default FlavorCatalog;
