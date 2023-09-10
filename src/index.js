 import { StrictMode } from "react";
 /*
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";

 */
import ThemeProvider from './theme';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { router } from "./App";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
    <ThemeProvider>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
);

/* const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
); */
