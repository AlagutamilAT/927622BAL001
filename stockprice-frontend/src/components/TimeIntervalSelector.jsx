import React from 'react';
import './TimeIntervalSelector.css'; // New CSS file for this component (can share with StockSelector.css if styles are identical)

function TimeIntervalSelector({ minutes, onMinutesChange, label = "Time Interval" }) {
  return (
    <div className="form-control-group">
      <label htmlFor="minutes-select" className="form-label">{label}</label>
      <select
        id="minutes-select"
        value={minutes}
        onChange={onMinutesChange}
        className="form-select"
      >
        <option value={15}>15 minutes</option>
        <option value={30}>30 minutes</option>
        <option value={60}>60 minutes</option>
        <option value={120}>2 hours</option>
        <option value={240}>4 hours</option>
        <option value={720}>12 hours</option>
        <option value={1440}>24 hours</option>
      </select>
    </div>
  );
}

export default TimeIntervalSelector;
