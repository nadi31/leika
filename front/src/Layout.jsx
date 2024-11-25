import React from "react";
import AuthProvider from "./AuthContext";
import "./style/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";

import "antd/dist/reset.css";

function Layout() {
  return (
    <Router>
      <AuthProvider>
        <BaseRouter />
      </AuthProvider>
    </Router>
  );
}

export default Layout;
