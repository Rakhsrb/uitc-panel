import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";
import "./index.css";
import MainSlice from "./toolkit/Slicer.jsx";
import UserSlicer from "./toolkit/UserSlicer.jsx";
const store = configureStore({
  reducer: {
    mainSlice: MainSlice,
    user: UserSlicer,
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
