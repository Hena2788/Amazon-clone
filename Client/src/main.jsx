import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { reducer, initialState } from "./utils/reducer";
import DataProvider from "./Component/DataProvider/DataProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <React.StrictMode>

      <BrowserRouter>
      <DataProvider initialState={initialState} reducer={reducer}>
        <App />
      </DataProvider>
   
      </BrowserRouter>
   
  </React.StrictMode>
);
