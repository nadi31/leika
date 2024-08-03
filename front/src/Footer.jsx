import React, { useState } from "react";
import { Image, Button, Modal, InputNumber, message, Input } from "antd";
//import "antd/dist/antd.css";
import "./style/footer.css";
import axios from "axios";

import {
  MailOutlined,
  HeartOutlined,
  PhoneOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Table, Typography } from "antd";

//Panier shopping

const Footer = (props) => {
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
        margin: props.width <= 900 ? "auto" : "",
        opacity: "0.9",
      }}
    >
      <div
        className="content_footer"
        style={{
          position: "relative",
          display: "block",
          alignSelf: props.width <= 900 ? "" : "flex-end",
          justifyContent: props.width <= 900 ? "" : "center",
          zIndex: "-1",

          margin: "auto",
          width: "100%",
          height: "20%",
          marginBottom: "20%",
        }}
      >
        <div
          className="content"
          style={{
            display: props.width <= 1200 ? "block" : "flex",
            justifyContent: "center",
            zIndex: "1",
            width: props.width <= 900 ? "100%" : "80%",
            margin: "auto",
          }}
        >
          <div
            className="about"
            style={{
              zIndex: "1",
              margin: "auto",
              justifyContent: "center",
              width: props.width <= 900 ? "70%" : "20%",
              height: "10%",
            }}
          >
            <div>
              <h1>
                {" "}
                <HeartOutlined /> A PROPOS
              </h1>
              <br />

              <a href="http://localhost:3000/founders#process" style={{}}>
                {" "}
                Fonctionnement{" "}
              </a>
              <br />
              <br />
              <a href="http://localhost:3000/founders#founders">Fondatrices</a>
              <br />
              <br />
              <a href="">Mention Légales</a>
            </div>
          </div>

          <div
            className="assistance"
            style={{
              zIndex: "1",
              margin: "5% auto ",
              justifyContent: "center",
              width: props.width <= 900 ? "70%" : "20%",
              height: "10%",
            }}
          >
            <div>
              <h1>
                {" "}
                <PhoneOutlined />
                ASSISTANCE
              </h1>
              <br />
              <a href="">FAQ</a>
              <br />
              <br />
              <a href="http://localhost:3000/founders#contact">Contact</a>{" "}
              <br />
              <br />
              <a href="">Face à la covid</a>
            </div>
          </div>

          <div
            className="giver"
            style={{
              zIndex: "1",
              margin: "5% auto ",
              justifyContent: "center",
              width: props.width <= 900 ? "70%" : "20%",
              height: "10%",
            }}
          >
            <div>
              <h1>
                {" "}
                <RocketOutlined />
                DEVENIR UN GIVER
              </h1>
              <br />
              <a href="">Conditions</a>
              <br />
              <br />
              <a href="">Notre process de sélection</a>
              <br />
              <br />
              <a href="">Formulaire de contact</a>
            </div>
          </div>
        </div>
        <div
          className="news_letter"
          style={{
            zIndex: "1",
            margin: "5% auto ",
            justifyContent: "center",
            width: props.width <= 900 ? "70%" : "30%",
            height: "10%",
            opacity: "1",
          }}
        >
          <h1>Restez au courant de notre actualité !</h1>
          <br />
          <Input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            style={{ height: "30%" }}
            placeholder="e-mail"
            prefix={<MailOutlined />}
            suffix={<Button onClick={addEmail}>OK</Button>}
          />
        </div>
      </div>
      <br />
      <div style={{ marginBottom: "10%" }}></div>
    </div>
  );
};

export default Footer;
