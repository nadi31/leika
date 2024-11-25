import React, { useState } from "react";
import { Menu, Button, Modal, InputNumber, message, Input } from "antd";
//import "antd/dist/antd.css";
import "./style/footer.css";
import axios from "axios";

import {
  MailOutlined,
  TwitterOutlined,
  InstagramOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Table, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { Grid } from "antd";

const Footer = (props) => {
  const navigate = useNavigate();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [email, setEmail] = useState("");

  const addEmail = () => {
    console.log("" + email);
    axios
      .post(
        `http://localhost:8000/api/pros/add`,

        {
          email: email,
        }
      )
      .then((res) => {
        message.success("Ajouté(e) à la mailist avec succès");
      })
      .catch((err) => {
        message.error("Erreur");
      });
  };

  return (
    <div
      className="container"
      style={{
        position: "relative",
        width: "100%",
        borderTop: "1px solid black",
        display: "flex",
        margin: "30%",

        background: "",
        margin: window.innerWidth <= 1200 ? "auto" : "",
      }}
    >
      <div
        className="content_footer"
        style={{
          position: "relative",
          display: "block",
          alignSelf: window.innerWidth <= 1200 ? "" : "flex-end",
          justifyContent: window.innerWidth <= 1200 ? "" : "center",
          //    zIndex: "-1",

          margin: "auto",
          width: "100%",
          height: "20%",
          marginBottom: "20%",
        }}
      >
        <div
          className="content"
          style={{
            display: "flex",
            justifyContent: "center",
            //  zIndex: "1",
            width: "100%",
            flexDirection: window.innerWidth < 1200 ? "column" : "",
            margin: "auto",
          }}
        >
          <div
            style={{
              width: window.innerWidth < 1200 ? "100%" : "20%",

              //  zIndex: "1",
              margin: window.innerWidth < 1200 ? "5% 8% " : "5%  7%  ",
              justifyContent: "center",
            }}
          >
            {" "}
            <h1>Restez au courant de notre actualité !</h1>
            <br />
            <Input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              style={{
                width: window.innerWidth < 1200 ? "70%" : "100%",
                height: "30%",
              }}
              placeholder=" email"
              prefix={<MailOutlined style={{ color: "#070C65" }} />}
              suffix={<Button onClick={addEmail}>OK</Button>}
            />
          </div>

          <div
            style={{
              width: window.innerWidth < 1200 ? "100%" : "20%",
              zIndex: "1",
              margin: window.innerWidth < 1200 ? "5% 7% " : "5% auto ",
              justifyContent: "center",
            }}
          >
            <Menu style={{ border: "none" }}>
              <Menu.Item
                onClick={() => {
                  navigate("../", {
                    replace: true,
                  });
                }}
              >
                {" "}
                <h1>Mentions Légales</h1>
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  navigate("../founders", {
                    replace: true,
                  });
                }}
              >
                {" "}
                <h1>Proposer un Atelier</h1>
              </Menu.Item>
            </Menu>
          </div>

          <div
            style={{
              width: window.innerWidth < 1200 ? "100%" : "20%",
              zIndex: "1",
              margin: window.innerWidth < 1200 ? "5% 12% " : "5% 1% ",
              justifyContent: "center",
            }}
          >
            <a href="">
              <h1
                style={{ fontSize: window.innerWidth < 1200 ? "30px" : "50px" }}
              >
                <TwitterOutlined />
              </h1>
            </a>

            <br />
            <a href="">
              <h1
                style={{ fontSize: window.innerWidth < 1200 ? "30px" : "50px" }}
              >
                <InstagramOutlined />
              </h1>
            </a>
          </div>
        </div>
      </div>
      <br />
      <div style={{ marginBottom: "10%" }}></div>
    </div>
  );
};

export default Footer;
