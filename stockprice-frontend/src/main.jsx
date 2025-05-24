import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Essential for client-side routing
import App from './App.jsx'; // Your main application component
import './index.css'; // Global CSS for basic styling and font imports

// Get the root DOM element where the React app will be mounted
const rootElement = document.getElementById('root');

// Ensure the root element exists before attempting to render
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      {/* BrowserRouter wraps the entire application to enable routing */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>,
  );
} else {
  console.error('Root element with ID "root" not found in the DOM.');
}
