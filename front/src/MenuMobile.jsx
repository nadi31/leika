import React from "react";
//import MediaQuery from 'react-responsive';
import { MobileView } from "react-device-detect";
import { Button, Input, AutoComplete, Carousel, Image } from "antd";
//import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";

import logo2 from "./logo2.png";

const MenuMobile = () => {
  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const options = [
    { label: "Parapente", value: "Parapente" },
    { label: "Kart", value: "Kart" },
  ];

  //6 activités à mettre en valeur

  return (
    // différentes versions du site selon la largueur de l'appareil source
    <div>
      <div style={{ backgroundColor: "white" }}>
        <img
          id="img"
          src={logo2}
          style={{ position: "absolute", left: "35%" }}
          alt="logo"
        ></img>
        <Button style={{ border: "none" }}>
          <MenuOutlined style={{ fontSize: "23px" }} />
        </Button>
        <Button style={{ border: "none", left: "70%", marginTop: "3%" }}>
          <ShoppingCartOutlined style={{ fontSize: "23px" }} />
        </Button>

        <Button style={{ border: "none", left: "40%", marginTop: "3%" }}>
          <UserOutlined style={{ fontSize: "23px" }} />
        </Button>

        <div
          className="dashboardSearch"
          style={{
            display: "block",
            width: "100%",
          }}
        >
          <AutoComplete
            dropdownMatchSelectWidth={100}
            style={{ display: "block", width: "80%", margin: "20px auto" }}
            options={options}
          >
            <Input
              style={{ borderRadius: "25px" }}
              size="large"
              prefix={<SearchOutlined />}
              placeholder="Equitation"
            />
          </AutoComplete>
        </div>
      </div>
    </div>
  );
};

export default MenuMobile;
