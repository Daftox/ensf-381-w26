import React, { useState, useEffect } from "react";
import flavors from "../data/flavors";
import reviews from "../data/reviews";

function MainSection() {
  const [randomFlavors, setRandomFlavors] = useState([]);
  const [randomReviews, setRandomReviews] = useState([]);

  /*
  useEffect(() => {
    const shuffledFlavors = [...flavors].sort(() => 0.5 - Math.random());
    setRandomFlavors(shuffledFlavors.slice(0, 3));

    const shuffledReviews = [...reviews].sort(() => 0.5 - Math.random());
    setRandomReviews(shuffledReviews.slice(0, 2));
  }, []);
  */

  useEffect(() => {
    // 1. Fetch Flavors depuis le backend (Exigence Point 2.a)
    fetch("http://127.0.0.1:5000/flavors")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // On mélange et on prend 3 saveurs comme avant, mais avec les données API
          const shuffled = [...data.flavors].sort(() => 0.5 - Math.random());
          setRandomFlavors(shuffled.slice(0, 3));
        }
      })
      .catch((err) => console.error("Error fetching flavors:", err));

    // 2. Fetch Reviews depuis le backend (Exigence Point 2.b)
    // Note: Ta route Flask GET /reviews renvoie déjà 2 avis aléatoires !
    fetch("http://127.0.0.1:5000/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRandomReviews(data.reviews);
        }
      })
      .catch((err) => console.error("Error fetching reviews:", err));
  }, []);

  return (
    <div className="main-section">
      <h2>About Sweet Scoop</h2>
      <p className="about-text">
        Sweet Scoop offers a variety of delicious ice cream flavors made from
        fresh ingredients.
      </p>

      <h2>Featured Flavors</h2>

      <div className="featured-flavors">
        {randomFlavors.map((f) => (
          <div className="flavor-card" key={f.id}>
            <img src={f.image}/>
            <h4>{f.name}</h4>
            <p>${typeof f.price === 'number' ? f.price.toFixed(2) : f.price}</p>
          </div>
        ))}
      </div>

      <h2>Customer Reviews</h2>

      <div className="reviews">
        {randomReviews.length > 0 ? (
          randomReviews.map((r, i) => (
            <div key={i} className="review-card">
              <h4>{r.customerName}</h4>
              <p>"{r.review}"</p>
              <p style={{ color: "#f28c8c" }}>{"★".repeat(r.rating)}</p>
            </div>
          ))
        ) : (
          <p>Loading reviews...</p>
        )}
      </div>
    </div>
  );
}

export default MainSection;
