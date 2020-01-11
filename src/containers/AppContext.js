import * as React from 'react';
import PropTypes from 'prop-types';

const AppContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'set-item':
      return { ...state, [action.item]: action.payload };
    case 'toggle-item':
      return { ...state, [action.item]: !state[action.item] };
    case 'reset':
    default:
      return { ...state };
  }
};

function AppContextProvider(props) {
  const { initialState, children } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = { state, dispatch };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

const AppContextConsumer = AppContext.Consumer;

AppContextProvider.propTypes = {
  children: PropTypes.node,
  initialState: PropTypes.shape({}),
};

AppContextProvider.defaultProps = {
  children: null,
  initialState: null,
};

export default AppContext;
export { AppContextProvider, AppContextConsumer };
