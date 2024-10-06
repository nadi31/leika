import React from "react";
import AuthProvider from "./AuthContext";
import "./style/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import { LoadScript } from "@react-google-maps/api";
import "antd/dist/reset.css";

//import DeviceEmulator from 'react-device-emulator';

// <DeviceEmulator withDeviceSwitch withRotator>
//</DeviceEmulator>

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
