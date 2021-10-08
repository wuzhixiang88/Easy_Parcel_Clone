import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <ul>
        <li>
            <Link to="/quote">
                Quote Page
            </Link>
        </li>
        <li>
            <Link to="/details">
                Details Page
            </Link>
        </li>
    </ul>
  );
}

export default Navbar;