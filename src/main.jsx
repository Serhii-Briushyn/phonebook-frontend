import App from "./App.jsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { persistor, store } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./index.css";
import "modern-normalize";

const routerFutureConfig = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter future={routerFutureConfig}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  </StrictMode>
);
