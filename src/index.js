import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HistoryProvider } from "./context/HistoryContext";

ReactDOM.render(
  <React.StrictMode>
    <HistoryProvider>
      <App />
    </HistoryProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
