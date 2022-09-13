import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import "./index.css";
import rootReducer from "./reducers";

import thunk from "redux-thunk";
import App from "./App";
const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
