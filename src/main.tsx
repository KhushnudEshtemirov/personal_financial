import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import "./global.scss";
import AuthContext from "./context/AuthContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastContainer autoClose={3000} />
    <AuthContext>
      <Router>
        <App />
      </Router>
    </AuthContext>
  </React.StrictMode>
);
