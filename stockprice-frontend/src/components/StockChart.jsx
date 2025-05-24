import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import './StockChart.css'; // Import the new CSS file for this component

// Custom Tooltip component (now without Material UI)
function CustomTooltip({ active, payload, label, averagePrice }) {
  if (active && payload && payload.length) {
    // The payload[0].payload contains the original data point
    // const dataPoint = payload[0].payload; // Not directly used in display but good for debugging

    return (
      <div className="custom-tooltip-card"> {/* Replaced Paper */}
        <p className="tooltip-text">
          Time: {label}
        </p>
        <p className="tooltip-price" style={{ color: payload[0].stroke }}> {/* Apply line color */}
          Price: ${payload[0].value.toFixed(2)}
        </p>
        {averagePrice && (
          <p className="tooltip-text">
            Avg Price: ${averagePrice.toFixed(2)}
          </p>
        )}
      </div>
    );
  }
  return null;
}

function StockChart({ data, averagePrice }) {
  if (!data || data.length === 0) {
    return <p className="no-data-message">No data available for the selected period.</p>; // Replaced Typography
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={['auto', 'auto']} />
        {/* Pass the CustomTooltip component to Recharts Tooltip */}
        <Tooltip content={<CustomTooltip averagePrice={averagePrice} />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="price"
          stroke="#8884d8" // A default purple-ish color for the line
          strokeWidth={2}
          dot={false} // Hide individual dots for cleaner look
          activeDot={{ r: 6 }} // Show larger dot on hover
        />
        {averagePrice && (
          <ReferenceLine
            y={averagePrice}
            label={{ value: `Avg: $${averagePrice.toFixed(2)}`, fill: 'red', position: 'top' }}
            stroke="red"
            strokeDasharray="3 3"
          />
        )}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default StockChart;
