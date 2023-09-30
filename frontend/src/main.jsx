import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MusicProvider } from "./context/MusicContext.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MusicProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </MusicProvider>
  </React.StrictMode>
);
