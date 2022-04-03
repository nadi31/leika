import React from "react";


import "./style/style.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./routes";
//import DeviceEmulator from 'react-device-emulator';

// <DeviceEmulator withDeviceSwitch withRotator>
//</DeviceEmulator>

function Layout() {


  
  return (


    <Router>
          
            <BaseRouter />
     
        </Router>
    
  );
}

export default Layout;
