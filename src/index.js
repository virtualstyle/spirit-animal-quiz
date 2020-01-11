import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Link } from 'react-router-dom';
import CookieBanner from 'react-cookie-banner';

import App from './components/App';

const privacyLink = <Link to="/privacy">Learn more</Link>;

ReactDOM.render(
  <BrowserRouter>
    <CookieBanner
      message="This website uses cookies to ensure the best user experience."
      link={privacyLink}
      onAccept={() => {}}
      cookie="vs-user-has-accepted-cookies"
      dismissOnScroll={false}
      styles={{
        banner: { backgroundColor: '#086599', position: 'fixed', bottom: 0 },
        message: { color: '#fff' },
      }}
    />
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
