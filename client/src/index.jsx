import React from "react";
import ReactDOM from "react-dom/client";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { EthProvider } from "./contexts/EthContext";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <EthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </EthProvider>
  </React.StrictMode>
);
