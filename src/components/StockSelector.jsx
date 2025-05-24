import React from 'react';
import './StockSelector.css'; // New CSS file for this component

function StockSelector({ stocks, selectedTicker, onTickerChange, label = "Select Stock" }) {
  return (
    <div className="form-control-group">
      <label htmlFor="stock-select" className="form-label">{label}</label>
      <select
        id="stock-select"
        value={selectedTicker}
        onChange={onTickerChange}
        className="form-select"
      >
        {stocks.length === 0 ? (
          <option value="" disabled>
            aNo stocks available
          </option>
        ) : (
          stocks.map((stock) => (
            <option key={stock.ticker} value={stock.ticker}>
              {stock.name} ({stock.ticker})
            </option>
          ))
        )}
      </select>
    </div>
  );
}

export default StockSelector;
