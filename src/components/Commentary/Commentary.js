// Commentary.js
import React from 'react';
import './Commentary.css';

const Commentary = ({ commentary }) => {
  return (
    <div className="commentary-container">
      <h2>Commentary</h2>
      <p>{commentary}</p>
    </div>
  );
};

export default Commentary;