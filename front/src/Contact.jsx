import React, { useState, useLayoutEffect } from "react";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";

const Contact = () => {
  <>
    <MenuBrowser />
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginRight: "20%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h1>Un problème ? Appelez-nous !</h1>
      </div>
    </div>
    <Footer />
  </>;
};
export default Contact;
