import React from 'react';
import './CorrelationHeatmap.css'; // New CSS file for this component

function CorrelationHeatmap({ ticker1, ticker2, correlation, stock1AvgPrice, stock2AvgPrice }) {
  // Function to determine color based on correlation value
  const getCorrelationColor = (value) => {
    if (value >= 0.7) return '#4CAF50'; // Strong positive (Green)
    if (value >= 0.3) return '#8BC34A'; // Moderate positive (Light Green)
    if (value >= -0.3) return '#FFEB3B'; // Weak/No correlation (Yellow)
    if (value >= -0.7) return '#FF9800'; // Moderate negative (Orange)
    return '#F44336'; // Strong negative (Red)
  };

  const backgroundColor = getCorrelationColor(correlation);

  return (
    <div className="heatmap-container">
      <div className="heatmap-card">
        <h3 className="heatmap-title">
          Correlation between {ticker1} and {ticker2}
        </h3>
        <div
          className="correlation-box"
          style={{ backgroundColor: backgroundColor }}
        >
          <span className="correlation-value">
            {correlation.toFixed(3)}
          </span>
        </div>

        <div className="stock-details-row">
            <div className="stock-details-item">
                <p className="stock-ticker">{ticker1}</p>
                <p className="stock-avg-price">Avg Price: ${stock1AvgPrice?.toFixed(2) || 'N/A'}</p>
            </div>
            <div className="stock-details-item">
                <p className="stock-ticker">{ticker2}</p>
                <p className="stock-avg-price">Avg Price: ${stock2AvgPrice?.toFixed(2) || 'N/A'}</p>
            </div>
        </div>

        <div className="legend-container">
          <h4 className="legend-title">
            Correlation Strength Legend:
          </h4>
          <div className="legend-grid">
            <div className="legend-item">
              <span className="legend-color-box" style={{ backgroundColor: '#F44336' }}></span>
              <span className="legend-text">Strong Negative</span>
            </div>
            <div className="legend-item">
              <span className="legend-color-box" style={{ backgroundColor: '#FF9800' }}></span>
              <span className="legend-text">Moderate Negative</span>
            </div>
            <div className="legend-item">
              <span className="legend-color-box" style={{ backgroundColor: '#FFEB3B' }}></span>
              <span className="legend-text">Weak/No</span>
            </div>
            <div className="legend-item">
              <span className="legend-color-box" style={{ backgroundColor: '#8BC34A' }}></span>
              <span className="legend-text">Moderate Positive</span>
            </div>
            <div className="legend-item">
              <span className="legend-color-box" style={{ backgroundColor: '#4CAF50' }}></span>
              <span className="legend-text">Strong Positive</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CorrelationHeatmap;
