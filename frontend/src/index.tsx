import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserStore, StoreProvider } from "./stores/userStore";
import { AsyncTrunk } from "mobx-sync";

const store = new UserStore();

const trunk = new AsyncTrunk(store, { storage: localStorage });
 
trunk.init().then(() => {
  // you can do any staff now, just like:
 
  // 1. render app with inited state:
  ReactDOM.render(
    <StoreProvider store={store}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </StoreProvider>,
    document.getElementById("root")
  );
  // 2. update store, the update of the store will be persisted
  // automatically:
});


