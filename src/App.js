import React from "react";
import { Router } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./config/ReactotronConfig";

//Material ui components
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

import Routes from "./routes";
import history from "./services/history";

import { store, persistor } from "./store/";

import GlobalStyle from "./styles/global";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0062ff",
    },
  },
});

const App = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

export default App;
