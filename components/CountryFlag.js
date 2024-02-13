import React, { useEffect, useState } from "react";
import './components.css';

const CountryFlag = ({ country, onSelect, onDeselect }) => {
  const [selected, setSelected] = useState(false);
  const [classname, setclassname] = useState("smallFlag");

  // handles when a flag is clicked
  onClick = () => {
    setSelected(!selected);
    selected ? onDeselect(country) : onSelect(country);
  };

  // updates css class when selected or not
  useEffect( () => {
    setclassname( selected ? 'selectedFlag' : 'smallFlag' );
  }, [selected]);

  return (
    <div onClick={onClick} className="image-container" title={country.name}>
    <img className={classname} src={window.location.origin + country.flagPath} alt={country.country} title={country.name}/>
  </div>
  );
};

export default CountryFlag;
