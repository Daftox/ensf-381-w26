import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrderHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = parseInt(localStorage.getItem("userId"), 10);

  useEffect(() => {
    if (userId) {
      fetch(`http://127.0.0.1:5000/orders?userId=${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrders(data.orders);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching history:", err);
          setLoading(false);
        });
    }
  }, [userId]);

  return (
    <div className="order-history-page">
      <Header />
      <main className="main-section">
        <h2>Your Order History</h2>

        {loading ? (
          <p>Loading your orders...</p>
        ) : orders.length === 0 ? (
          <p className="no-orders">You haven't placed any orders yet. Go get some ice cream!</p>
        ) : (
          <div className="orders-container">
            {orders.map((order) => (
              <div key={order.orderId} className="order-card" style={cardStyle}>
                <h3>Order #{order.orderId}</h3>
                <p><strong>Date:</strong> {order.timestamp}</p>
                
                <ul className="order-items-list">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} x {item.quantity} — ${item.price}
                    </li>
                  ))}
                </ul>
                
                <hr />
                <p className="order-total">
                  <strong>Total Price: ${order.total.toFixed(2)}</strong>
                </p>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

const cardStyle = {
  border: "1px solid #e4b48c",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
  backgroundColor: "#fffaf4",
  textAlign: "left"
};

export default OrderHistoryPage;