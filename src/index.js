import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import "./reset.css";
import App from './App';
import { moralis } from './keys';
import Parse from "parse";

Parse.initialize(moralis.ID, moralis.URL);

ReactDOM.render(
  <MoralisProvider appId={moralis.ID} serverUrl={moralis.URL}>
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
