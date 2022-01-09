import React from "react";
import ReactDOM from "react-dom";
import { MoralisProvider } from "react-moralis";
import "./reset.css"
import App from './App';
import { moralis } from './keys'
import Parse from "parse";
Parse.initialize(moralis.id, moralis.url);

ReactDOM.render(
  <MoralisProvider appId={moralis.id} serverUrl={moralis.url}>
    <App />
  </MoralisProvider>,
  document.getElementById("root"),
);
