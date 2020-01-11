import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../img/logo.png';

const Brand = () => {
  return (
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <img
          style={{ maxHeight: '80px' }}
          src={logo}
          width="217"
          height="80"
          className="logo"
          alt="logo"
        />
      </Link>
    </div>
  );
};

export default Brand;
