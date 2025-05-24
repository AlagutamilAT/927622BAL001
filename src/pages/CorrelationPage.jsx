import React, { useState, useEffect } from 'react';
import StockSelector from '../components/StockSelector';
import TimeIntervalSelector from '../components/TimeIntervalSelector';
import CorrelationHeatmap from '../components/CorrelationHeatmap';
import { getStockCorrelation, getAvailableStocks } from '../services/api';
import './CorrelationPage.css';

function CorrelationPage() {
  const [availableStocks, setAvailableStocks] = useState([]);
  const [selectedTicker1, setSelectedTicker1] = useState('');
  const [selectedTicker2, setSelectedTicker2] = useState('');
  const [minutes, setMinutes] = useState(60);
  const [correlationData, setCorrelationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch list of available stocks
  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const stocksMap = await getAvailableStocks();
        const stocksList = Object.keys(stocksMap).map(ticker => ({
          ticker: ticker,
          name: stocksMap[ticker]
        }));
        setAvailableStocks(stocksList);
        if (stocksList.length >= 2) {
            setSelectedTicker1(stocksList[0].ticker);
            setSelectedTicker2(stocksList[1].ticker);
        } else if (stocksList.length === 1) {
            setSelectedTicker1(stocksList[0].ticker);
        }
      } catch (err) {
        console.error("Error fetching available stocks:", err);
        setError("Failed to load available stocks. Please check backend connection.");
      }
    };
    fetchStocks();
  }, []);

  const handleCalculateCorrelation = async () => {
    if (!selectedTicker1 || !selectedTicker2 || selectedTicker1 === selectedTicker2) {
      setError("Please select two different stocks to calculate correlation.");
      setCorrelationData(null);
      return;
    }

    setLoading(true);
    setError(null);
    setCorrelationData(null);
    try {
      const data = await getStockCorrelation(selectedTicker1, selectedTicker2, minutes);
      setCorrelationData(data);
    } catch (err) {
      console.error('Error fetching correlation data:', err);
      setError(`Failed to fetch correlation for ${selectedTicker1} and ${selectedTicker2}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="correlation-page-container">
      <h1 className="correlation-page-title">
        Stock Price Correlation Heatmap
      </h1>

      <div className="card controls-card">
        <div className="grid-container">
          <div className="grid-item">
            <StockSelector
              stocks={availableStocks}
              selectedTicker={selectedTicker1}
              onTickerChange={(e) => setSelectedTicker1(e.target.value)}
              label="Select Stock 1"
            />
          </div>
          <div className="grid-item">
            <StockSelector
              stocks={availableStocks.filter(stock => stock.ticker !== selectedTicker1)}
              selectedTicker={selectedTicker2}
              onTickerChange={(e) => setSelectedTicker2(e.target.value)}
              label="Select Stock 2"
            />
          </div>
          <div className="grid-item">
            <TimeIntervalSelector
              minutes={minutes}
              onMinutesChange={(e) => setMinutes(e.target.value)}
            />
          </div>
          <div className="grid-item">
            <button
              className="calculate-button"
              onClick={handleCalculateCorrelation}
              disabled={loading || !selectedTicker1 || !selectedTicker2 || selectedTicker1 === selectedTicker2}
            >
              Calculate Correlation
            </button>
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

      {correlationData && !loading && !error && (
        <div className="card data-display-card">
          <h2 className="correlation-section-title">
            Correlation between {selectedTicker1} and {selectedTicker2}
          </h2>
          <CorrelationHeatmap
            ticker1={selectedTicker1}
            ticker2={selectedTicker2}
            correlation={correlationData.correlation}
            stock1AvgPrice={correlationData.stocks[selectedTicker1]?.averagePrice}
            stock2AvgPrice={correlationData.stocks[selectedTicker2]?.averagePrice}
          />
        </div>
      )}

      {!correlationData && !loading && !error && (
        <div className="alert alert-info">
          Select two different stocks and a time interval, then click "Calculate Correlation" to see the heatmap.
        </div>
      )}
       {availableStocks.length < 2 && !loading && !error && (
        <div className="alert alert-warning">
          Not enough stocks available to calculate correlation. Ensure your backend is running and can fetch stocks.
        </div>
      )}
    </div>
  );
}

export default CorrelationPage;
