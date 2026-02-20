// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { AppContextProvider } from "././context/AppContext"; // make sure the path is correct
// import { BrowserRouter } from "react-router-dom";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AppContextProvider>
//       <BrowserRouter>
//         <App />
//       </BrowserRouter>
//     </AppContextProvider>
//   </React.StrictMode>
// );
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ wrap App with Router
import App from "./App";
import { AppProvider } from "./context/appContext"; // ✅ your merged context
import "./index.css";
import { Toaster } from "react-hot-toast"; // optional for toast notifications

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AppProvider>
        <App />
        <Toaster /> {/* optional, but needed if you use react-hot-toast */}
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
