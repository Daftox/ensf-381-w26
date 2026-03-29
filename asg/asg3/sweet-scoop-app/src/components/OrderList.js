import React from 'react';
import OrderItem from './OrderItem';

function OrderList({ order, onRemove }) {
  const total = order.reduce((sum, item) => {
    const priceNum = parseFloat(item.price.replace('$', ''));
    return sum + (priceNum * item.quantity);
  }, 0);

  return (
    <>
        <h2>Your Order</h2>
        <div className="order-list">
        {order.length === 0 ? (
            <p>No items in your order yet.</p>
        ) : (
            <>
            {order.map((item) => (
                <OrderItem 
                key={item.id} 
                item={item} 
                onRemove={onRemove} 
                />
            ))}
            <h3>Total: ${total.toFixed(2)}</h3>
            </>
        )}
        </div>
    </>
  );
}

export default OrderList;