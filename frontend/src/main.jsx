import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";  // Make sure this line is here
import App from "./App.jsx";  // Add .jsx extension

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);