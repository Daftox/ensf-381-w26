import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FlavorCatalog from "../components/FlavorCatalog";
import OrderList from "../components/OrderList";

function FlavorsPage() {
    const [flavors, setFlavors] = useState([]); 
    const [order, setOrder] = useState([]);   
    const [message, setMessage] = useState(""); 
    const userId = parseInt(localStorage.getItem("userId"), 10);

    useEffect(() => {
        fetch("http://127.0.0.1:5000/flavors")
            .then(res => res.json())
            .then(data => { if (data.success) setFlavors(data.flavors); });

        fetch(`http://127.0.0.1:5000/cart?userId=${userId}`)
            .then(res => res.json())
            .then(data => { if (data.success) setOrder(data.cart); });
    }, [userId]);

    const refreshCart = () => {
        fetch(`http://127.0.0.1:5000/cart?userId=${userId}`)
            .then(res => res.json())
            .then(data => { if (data.success) setOrder(data.cart); });
    };

    const addToOrder = async (flavor) => {
        const existingItem = order.find(item => item.flavorId === flavor.id);
        if (existingItem) {
            await fetch("http://127.0.0.1:5000/cart", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, flavorId: flavor.id, quantity: existingItem.quantity + 1 })
            });
        } else {
            await fetch("http://127.0.0.1:5000/cart", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, flavorId: flavor.id })
            });
        }
        refreshCart();
    };

    const removeFromOrder = async (flavorId) => {
        await fetch(`http://127.0.0.1:5000/cart`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, flavorId })
        });
        refreshCart();
    };

    const handlePlaceOrder = async () => {
        try {
            const res = await fetch("http://127.0.0.1:5000/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId })
            });
            const data = await res.json();
            if (data.success) {
                setMessage("Order placed successfully!");
                setOrder([]); 
            } else {
                setMessage(data.message || "Error placing order");
            }
        } catch (err) {
            setMessage("Failed to connect to server.");
        }
    };

    return (
        <div className="flavors-page">
            <Header />
            <main className="main-section">
                {message && <p className="status-message" style={{textAlign: 'center', color: 'green', fontWeight: 'bold'}}>{message}</p>}
                
                <div className="content" style={{ display: 'flex', gap: '20px', padding: '20px' }}>
                    <FlavorCatalog flavors={flavors} addToOrder={addToOrder} />
                    
                    <div className="order-sidebar" style={{ minWidth: '300px' }}>
                        <OrderList order={order} removeFromOrder={removeFromOrder} />
                        
                        {order.length > 0 && (
                            <button 
                                className="place-order-button" 
                                onClick={handlePlaceOrder}
                                style={{ width: '100%', marginTop: '10px', padding: '12px', backgroundColor: '#e4b48c', cursor: 'pointer', border: 'none', borderRadius: '5px', fontWeight: 'bold' }}
                            >
                                Place Order
                            </button>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default FlavorsPage;