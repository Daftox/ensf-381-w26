import React from "react";
import OrderItem from "./OrderItem";

function OrderList({ order, removeFromOrder }) {
  
  const totalPrice = order.reduce((sum, item) => {
    const price = typeof item.price === 'string' ? parseFloat(item.price.replace('$', '')) : item.price;
    return sum + (price * item.quantity);
  }, 0);

  return (
    <div className="order-sidebar-container">
      <h3>Your Order</h3>
      <div className="order-list">
        {order.length === 0 ? (
          <p>No items in your order.</p>
        ) : (
          <>
            {order.map((item) => (
              <OrderItem 
                key={item.flavorId} 
                item={item} 
                removeFromOrder={() => removeFromOrder(item.flavorId)} 
              />
            ))}
            <h4>Total: ${totalPrice.toFixed(2)}</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default OrderList;