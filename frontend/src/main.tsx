import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { ProvideAuth } from "./hooks/useAuth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ProvideAuth>
      <RouterProvider router={router} />
      <App />
    </ProvideAuth>
  </React.StrictMode>
);
