import React, { useEffect, useState } from "react";
import './components.css';

const CountryFlag = ({ country, onSelect, onDeselect }) => {
  const [selected, setSelected] = useState(false);
  const [classname, setclassname] = useState("smallFlag");

  onClick = () => {
    setSelected(!selected);
    selected ? onDeselect(country) : onSelect(country);
  };

  useEffect( () => {
    setclassname( selected ? 'selectedFlag' : 'smallFlag' );
  }, [selected]);

  return (
    <div onClick={onClick} >
      <img className={classname} src={window.location.origin + country.flagPath } alt={country.country}/>
    </div>
  );
};

export default CountryFlag;
