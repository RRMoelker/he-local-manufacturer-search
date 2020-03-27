import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import * as serviceWorker from './serviceWorker';
import { Auth0Provider } from "./react-auth0-spa";
import history from "./utils/history.js";

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
  domain={'localhost:3000'}
  client_id={'LT1w4ffmi2pkmvkdvdoS1yuQwtmmrvYu'}
  redirect_uri={window.location.origin}
  onRedirectCallback={onRedirectCallback}
>
  <App />
</Auth0Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
