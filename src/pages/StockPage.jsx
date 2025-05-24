import React, { useState, useEffect } from 'react';
import StockChart from '../components/StockChart';
import StockSelector from '../components/StockSelector';
import TimeIntervalSelector from '../components/TimeIntervalSelector';
import { getStockAveragePrice, getAvailableStocks } from '../services/api';
import './StockPage.css';

function StockPage() {
  const [availableStocks, setAvailableStocks] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState('');
  const [minutes, setMinutes] = useState(60);
  const [stockData, setStockData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list of available stocks once on component mount
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stocksMap = await getAvailableStocks();
        const stocksList = Object.keys(stocksMap).map(ticker => ({
          ticker: ticker,
          name: stocksMap[ticker]
        }));
        setAvailableStocks(stocksList);
        if (stocksList.length > 0) {
          setSelectedTicker(stocksList[0].ticker);
        }
      } catch (err) {
        console.error("Error fetching available stocks:", err);
        setError("Failed to load available stocks. Please check backend connection.");
      }
    };
    fetchStocks();
  }, []);

  // Fetch stock data whenever selectedTicker or minutes changes
  useEffect(() => {
    if (selectedTicker && minutes) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        setStockData(null);
        try {
          const data = await getStockAveragePrice(selectedTicker, minutes);
          setStockData(data);
        } catch (err) {
          console.error('Error fetching stock data:', err);
          setError(`Failed to fetch stock data for ${selectedTicker}. Please try again.`);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [selectedTicker, minutes]);

  const handleTickerChange = (event) => {
    setSelectedTicker(event.target.value);
  };

  const handleMinutesChange = (event) => {
    setMinutes(event.target.value);
  };

  const chartData = stockData?.priceHistory.map((item) => ({
    time: new Date(item.lastUpdatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    price: item.price,
  }));

  return (
    <div className="stock-page-container">
      <h1 className="stock-page-title">
        Stock Price Tracker
      </h1>

      <div className="card controls-card">
        <div className="grid-container">
          <div className="grid-item">
            <StockSelector
              stocks={availableStocks}
              selectedTicker={selectedTicker}
              onTickerChange={handleTickerChange}
            />
          </div>
          <div className="grid-item">
            <TimeIntervalSelector
              minutes={minutes}
              onMinutesChange={handleMinutesChange}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-spinner-container">
          <div className="loading-spinner"></div>
          <p>Loading data...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {stockData && !loading && !error && (
        <div className="card data-display-card">
          <h2 className="stock-section-title">
            {availableStocks.find(s => s.ticker === selectedTicker)?.name || selectedTicker} Price History
          </h2>
          <p className="stock-average-price">
            Average Price: ${stockData.averageStockPrice.toFixed(2)}
          </p>
          <StockChart data={chartData} averagePrice={stockData.averageStockPrice} />
        </div>
      )}

      {!selectedTicker && !loading && !error && availableStocks.length > 0 && (
        <div className="alert alert-info">
          Please select a stock from the dropdown to view its price history.
        </div>
      )}
       {availableStocks.length === 0 && !loading && !error && (
        <div className="alert alert-warning">
          No stocks available. Ensure your backend is running and can fetch stocks from the test server.
        </div>
      )}
    </div>
  );
}

export default StockPage;
