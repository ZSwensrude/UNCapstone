import React from "react";
import { Link } from "react-router-dom";

// Basic navbar, we'll get rid of it later, just shows how to link between pages
const Navbar = () => {
  return (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/dias'>Dias</Link></li>
      <li><Link to='/delegate'>Delegate</Link></li>
    </ul>
  );
}


export default Navbar;