import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";

import "./styles.css";
import CountriesPage from "./components/Countries";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <ErrorBoundary>
          <CountriesPage />
        </ErrorBoundary>
      </div>
    </Provider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
