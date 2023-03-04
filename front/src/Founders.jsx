import React, { useState } from "react";
import { Image, Button, Modal, InputNumber, message, Input } from "antd";
//import "antd/dist/antd.css";
import "./style/footer.css";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";
import img1 from "./france.png";
import {
  MailOutlined,
  HeartOutlined,
  PhoneOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Table, Typography } from "antd";

//Panier shopping

const Founders = (props) => {
  const [width, setWidth] = useState(window.innerWidth);
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
    <div>
      <BrowserView>
        <MenuBrowser width={width} />
      </BrowserView>
      <div style={{ display: "flex" }}>
        <Image
          style={{
            marginLeft: "17%",
            borderRadius: "50%",
            width: "300px",
            height: "300px",
          }}
          preview={false}
          src={img1}
        />

        <div
          className="pres"
          style={{ marginTop: "3%", marginLeft: "12%", width: "50%" }}
        >
          Leikka. est une petite entreprise toulousaine créée en 2023 par deux
          soeurs: Nadia et Nouria 👯‍♀️ .
          <br />
          <br />
          Leikka a pour ambition de simplifier le travail des professionels du
          monde du loisir en proposant un système de réservation en ligne 💻.
          <br />
          <br /> Nous avons aussi comme vocation à faciliter la recherche
          d'activités et de cours pour tout un chacun! Nous avons à coeur de
          sélectionner les meilleurs professionnels pour que chaque expérience
          soit un souvenir unique 🥳.
        </div>
      </div>
      <Footer width={width} />
    </div>
  );
};

export default Founders;
