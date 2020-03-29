import React from "react";
import { createClient, Provider } from 'urql';

import DataPage from "../DataPage";
import "./App.scss";
import {GRAPHQL_ENDPOINT} from "../../config";
import {useAuth0} from "../../react-auth0-spa";
import NavBar from "../../components/NavBar";

const AUTH_LOADING_LABEL = 'Waiting for authentication/authorization';

const client = createClient({
  url: GRAPHQL_ENDPOINT,
});

function App() {
  const { authLoading, isAuthenicated } = useAuth0();
  return (
    <Provider value={client}>
      <header>
        <NavBar />
        { authLoading && <div>{AUTH_LOADING_LABEL}</div> }
        <div>is authenticated: {isAuthenicated ? 'true' : 'false'}</div>
      </header>
      <DataPage />
    </Provider>
  );
};

export default App;
