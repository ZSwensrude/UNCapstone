// Country.jsx
import React from 'react';

const Country = ({ position, countryName, flagPath }) => {
  return (
    <div className='countryItem'>
      <h3>{position}. {countryName}</h3>
      <img src={flagPath} alt={`Flag of ${countryName}`} />
    </div>
  );
};

export default Country;
