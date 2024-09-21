import React from 'react';
import './styles/Error.css'; // Optional for styling

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="loader"></div>
      <p>Loading...</p>
    </div>
  );
};

export default Spinner;
