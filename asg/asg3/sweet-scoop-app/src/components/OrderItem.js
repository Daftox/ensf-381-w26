import React from 'react';

function OrderItem({ item, onRemove }) {
  return (
    <div className="order-item">
      <p><strong>{item.name}</strong></p>
      <p>Quantity: {item.quantity}</p>
      <p>Price: {item.price}</p>
      <button className="remove" onClick={() => onRemove(item.id)}>
        Remove Item
      </button>
    </div>
  );
}

export default OrderItem;