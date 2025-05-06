import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import StoreContextProvider from "./context/StoreContextProvider.jsx";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import ExchangeRates from "./pages/ExchangeRates.jsx";
import Error from "./pages/Error.jsx";
import Home from "./pages/Home.jsx";
import ErrorLayout from "./layouts/ErrorLayout.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />} />
        <Route path="/exchange_rates_live" element={<ExchangeRates />} />
      </Route>
      <Route path="/" element={<ErrorLayout />}>
        <Route path="/error_page" element={<Error />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StoreContextProvider>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </StoreContextProvider>
);
