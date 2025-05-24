import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the new CSS for this page

function HomePage() {
  return (
    <div className="home-page-container">
      <h1 className="home-page-title">
        Welcome to Stock Insights
      </h1>
      <p className="home-page-subtitle">
        Explore real-time analytical insights into stock prices and their correlations.
      </p>
      <div className="home-page-buttons">
        <Link to="/stock-tracker" className="home-button primary-button">
          View Stock Prices
        </Link>
        <Link to="/correlation-heatmap" className="home-button secondary-button">
          View Correlation Heatmap
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
