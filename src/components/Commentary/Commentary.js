import React from 'react';

const Commentary = ({ commentary }) => {
  return (
    <div>
      <h2>Image Commentary</h2>
      {commentary ? (
        <p>{commentary}</p>
      ) : (
        <p>No commentary available.</p>
      )}
    </div>
  );
};

export default Commentary;