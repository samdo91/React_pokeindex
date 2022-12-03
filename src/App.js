import React from "react";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import Context from "./comp/userStore/context/context";

function App() {
  return (
    <div className="App">
      <Context>
        <RouterProvider router={router} />
      </Context>
    </div>
  );
}

export default App;
