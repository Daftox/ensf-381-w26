import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import FlavorCatalog from './FlavorCatalog';
import OrderList from './OrderList';

function FlavorsPage() {
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const savedOrder = localStorage.getItem('sweetScoopOrder');
    if (savedOrder) {
      setOrder(JSON.parse(savedOrder));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sweetScoopOrder', JSON.stringify(order));
  }, [order]);

  const addToOrder = (flavor) => {
    setOrder((prevOrder) => {
      const existingItem = prevOrder.find((item) => item.id === flavor.id);
      if (existingItem) {
        return prevOrder.map((item) =>
          item.id === flavor.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevOrder, { ...flavor, quantity: 1 }];
    });
  };

  const removeFromOrder = (id) => {
    setOrder((prevOrder) => {
      return prevOrder
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0); 
    });
  };

  return (
    <div className="flavors-page">
      <Header />
      <div className="content">
        <FlavorCatalog onAddToOrder={addToOrder} />
        <OrderList order={order} onRemove={removeFromOrder} />
      </div>
      <Footer />
    </div>
  );
}

export default FlavorsPage;