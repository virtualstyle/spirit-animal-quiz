import React from 'react';
import { Route } from 'react-router-dom';

// import Dropdown from 'react-bulma-components/lib/components/dropdown';

import Home from './Home';
import Privacy from './Privacy';

import 'bulma/css/bulma.css';
import './App.scss';

import { AppContextProvider } from '../containers/AppContext';

const Loader = () => {
  return (
    <div id="preloader">
      <div id="loader" />
    </div>
  );
};

const initialState = {
  loading: false,
};

const App = () => (
  <AppContextProvider initialState={initialState}>
    <React.Suspense fallback={<Loader />}>
      <Route exact path="/" component={Home} />
      <Route path="/privacy" component={Privacy} />
    </React.Suspense>
  </AppContextProvider>
);

export default App;
