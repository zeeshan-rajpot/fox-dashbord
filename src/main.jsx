// index.js
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ProgramsProvider } from "./pages/Program/ProgramsContext.jsx";
createRoot(document.getElementById("root")).render(
  <>
    <ProgramsProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </ProgramsProvider>
  </>
);
