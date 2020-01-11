import React from 'react';

import Header from './Header';

const Home = () => {
  return (
    <div>
      <Header />
      <div className="section">
        <div className="container">
          <h1 className="title">Title</h1>
          <h2 className="subtitle">Subtitle</h2>
        </div>
      </div>
    </div>
  );
};

export default Home;
