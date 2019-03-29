import React from 'react';
import ReactDOM from 'react-dom';
import 'font-awesome/css/font-awesome.min.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;  // for dev tool
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));         // compose portion is for dev tools

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);