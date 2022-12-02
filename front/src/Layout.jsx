import React from "react";
import { CookiesProvider } from "react-cookie";
import "./style/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
import "antd/dist/reset.css";

//import DeviceEmulator from 'react-device-emulator';

// <DeviceEmulator withDeviceSwitch withRotator>
//</DeviceEmulator>

function Layout() {
  return (
    <Router>
      <CookiesProvider>
        <BaseRouter />
      </CookiesProvider>
    </Router>
  );
}

export default Layout;
