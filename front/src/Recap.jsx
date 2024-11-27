import React from "react";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";
import RecapBeforePayment from "./RecapBeforePayment";
import { useAuth } from "./AuthContext";

const Recap = () => {
  const { userData } = useAuth();
  const items = JSON.parse(localStorage.getItem("cart")) || [];

  const userEmail = userData ? userData.email : null;

  return (
    <div>
      <MenuBrowser />
      <RecapBeforePayment items={items} userEmail={userEmail} />;
      <Footer />
    </div>
  );
};

export default Recap;
