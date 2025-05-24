import React from 'react';
import { Routes, Route, Link } from 'react-router-dom'; // Routes, Route, and Link for navigation
import HomePage from './pages/HomePage'; // Import your Home Page component
import StockPage from './pages/StockPage'; // Import your Stock Price Tracker Page component
import CorrelationPage from './pages/CorrelationPage'; // Import your Correlation Heatmap Page component
import './App.css'; // Application-wide CSS for header and general layout

function App() {
  return (
    <>
      {/* Application Header and Navigation Bar */}
      <header className="app-header">
        <nav className="app-toolbar">
          <h1 className="app-title">
            Stock Insights Dashboard
          </h1>
          <div className="app-nav-links">
            {/* Navigation links using React Router's Link component */}
            <Link to="/" className="nav-button">
              Home
            </Link>
            <Link to="/stock-tracker" className="nav-button">
              Stock Tracker
            </Link>
            <Link to="/correlation-heatmap" className="nav-button">
              Correlation Heatmap
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content Area */}
      <div className="main-content-container">
        {/* Routes define which component to render based on the URL path */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock-tracker" element={<StockPage />} />
          <Route path="/correlation-heatmap" element={<CorrelationPage />} />
          {/* Optional: Add a fallback route for 404 Not Found pages */}
          {/* <Route path="*" element={<div><h1>404 - Page Not Found</h1><p>The page you are looking for does not exist.</p><Link to="/">Go to Home</Link></div>} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
