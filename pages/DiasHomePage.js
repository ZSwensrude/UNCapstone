import { Typography } from "@mui/material";
import React from "react";
import './DiasHomePageIndex.css';
import Dias from "./Dias";
import Country from '../components/Country';

// Placeholder for Dias screen
const DiasHome = () => {
  const countries = [
    { position: 1, countryName: 'Country A', flagPath: '/path/to/flagA.png' },
    { position: 2, countryName: 'Country B', flagPath: '/path/to/flagB.png' },
    // Add more countries as needed
  ];

  return (
    <div className="HomePageDias">
        <h2>HELLO</h2>

        
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#news">News</a></li>
          <li class="dropdown">
            <a href="javascript:void(0)" class="dropbtn">Dropdown</a>
            <div class="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </li>
        </ul>

    <div>
        <h3>Countries:</h3>
        {countries.map((country, index) => (
          <Country key={index} {...country} />
        ))}
      </div>
    </div>
    );
}

export default DiasHome;