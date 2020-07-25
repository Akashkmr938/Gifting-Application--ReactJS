import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import axios from "axios";
import ContextProvider from "./app/context/context";

axios.defaults.baseURL = "https://gifting-app-server.herokuapp.com";

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);
