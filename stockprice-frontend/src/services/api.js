import axios from 'axios';

// IMPORTANT: Replace 5000 with the actual port your backend microservice is running on
const BACKEND_BASE_URL = 'http://localhost:5000'; // Example port, adjust as needed

const api = axios.create({
  baseURL: BACKEND_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches the average stock price and price history for a given ticker and time interval.
 * @param {string} ticker - The stock ticker symbol (e.g., 'NVDA').
 * @param {number} minutes - The time interval in minutes.
 * @returns {Promise<object>} - A promise that resolves to the stock data.
 */
export const getStockAveragePrice = async (ticker, minutes) => {
  try {
    const response = await api.get(`/api/stocks/${ticker}`, {
      params: { minutes, aggregation: 'average' },
    });
    return response.data;
  } catch (error) {
    console.error(`API Error: getStockAveragePrice for ${ticker}, ${minutes} minutes:`, error);
    // Propagate error for UI to handle
    throw error;
  }
};

/**
 * Fetches the correlation of price movement between two stocks over a time interval.
 * @param {string} ticker1 - The first stock ticker symbol.
 * @param {string} ticker2 - The second stock ticker symbol.
 * @param {number} minutes - The time interval in minutes.
 * @returns {Promise<object>} - A promise that resolves to the correlation data.
 */
export const getStockCorrelation = async (ticker1, ticker2, minutes) => {
  try {
    const response = await api.get(`/api/stockcorrelation`, {
      params: {
        minutes,
        ticker: [ticker1, ticker2] // Axios handles array params by repeating the key
      }
    });
    return response.data;
  } catch (error) {
    console.error(`API Error: getStockCorrelation for ${ticker1}, ${ticker2}, ${minutes} minutes:`, error);
    throw error;
  }
};

/**
 * Fetches a list of all available stock tickers and their names from your backend.
 * @returns {Promise<object>} - A promise that resolves to an object where keys are tickers and values are names.
 * Expected format: { "AMD": "Advanced Micro Devices, Inc.", "GOOGL": "Alphabet Inc. Class A" }
 */
export const getAvailableStocks = async () => {
  try {
    // Assuming your backend exposes an endpoint like /api/stocks to list all available stocks
    // which internally calls the test server's /evaluation-service/stocks API.
    const response = await api.get('/api/stocks');
    return response.data.stocks; // Adjust based on your backend's actual response structure
  } catch (error) {
    console.error("API Error: getAvailableStocks:", error);
    throw error;
  }
};

// You can add more API functions here as your backend expands
