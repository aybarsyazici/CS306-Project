import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserStore, StoreProvider } from "./stores/userStore";

const store = new UserStore();

ReactDOM.render(
  <StoreProvider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </StoreProvider>,
  document.getElementById("root")
);
