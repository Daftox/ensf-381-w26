import React, { useState, useEffect } from 'react';
import flavors from '../data/flavors';
import reviews from '../data/reviews';

function MainSection() {
  const [featuredFlavors, setFeaturedFlavors] = useState([]);
  const [featuredReviews, setFeaturedReviews] = useState([]);

  useEffect(() => {
    const shuffledFlavors = [...flavors].sort(() => 0.5 - Math.random());
    setFeaturedFlavors(shuffledFlavors.slice(0, 3));

    const shuffledReviews = [...reviews].sort(() => 0.5 - Math.random());
    setFeaturedReviews(shuffledReviews.slice(0, 2));
  }, []);

  const renderStars = (rating) => {
    return '★'.repeat(rating);
  };

  return (
    <div className="main-section">
      <section>
        <h2>About Sweet Scoop Ice Cream</h2>
        <p>
          Sweet Scoop Ice Cream is a family-owned business that has been serving delicious ice cream since 1990. We pride ourselves on using only the freshest ingredients to create our unique flavors. Whether you‘re in the mood for a classic vanilla or something more adventurous like our signature "Chocolate Explosion," we have something for everyone. Come visit us and treat yourself to a sweet scoop today!
        </p>
      </section>

      <section>
        <h2>Featured Flavors</h2>
        <div className="flavor-grid">
          {featuredFlavors.map((flavor) => (
            <div className="flavor-card" key={flavor.id}>
              <h3>{flavor.name}</h3>
              <p>{flavor.description}</p>
              <p><strong>Price: {flavor.price}</strong></p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Customer Reviews</h2>
        <div className="reviews-container">
          {featuredReviews.map((review, index) => (
            <div className="review-card" key={index}>
              <h4>{review.customerName}</h4>
              <p><strong>Rating: {renderStars(review.rating)}</strong></p>
              <p>"{review.review}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default MainSection;