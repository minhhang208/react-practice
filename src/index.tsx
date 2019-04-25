import * as React from "react";
import { render } from "react-dom";
import { Routes } from "./Routes";

import "semantic-ui-css/semantic.min.css";
import "./styles.css";
import { makeStore, StoreContext } from "./store";
function App() {
  return (
    <>
      <Routes />
    </>
  );
}

const store = makeStore();
const rootElement = document.getElementById("root");
render(
  <StoreContext.Provider value={store}>
    <App />
  </StoreContext.Provider>,
  rootElement
);
