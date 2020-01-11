import React from 'react';

import Brand from './Brand';

const Header = () => {
  return (
    <div>
      <header className="level">
        <nav
          className="navbar"
          style={{ borderBottom: '1px solid #eee' }}
          role="navigation"
          aria-label="main navigation"
        >
          <Brand />
          <div className="level-item" style={{ width: '100%' }}>
            <h1
              className="title"
              style={{ width: '100%', textAlign: 'center' }}
            >
              Spirit Animal Quiz
            </h1>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
