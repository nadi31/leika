import React, { useState, useLayoutEffect } from "react";
import { Image, Button, Modal, InputNumber, message, Input } from "antd";
//import "antd/dist/antd.css";
import "./style/footer.css";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";
import img1 from "./france.png";
import Bloc from "./Bloc";
import process from "./process.jpg";
import founders from "./founders.jpg";
import {
  HomeOutlined,
  DownCircleOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
  HeartFilled,
  HeartTwoTone,
  RocketTwoTone,
  ExperimentTwoTone,
  EnvironmentTwoTone,
  HeartOutlined,
  ThunderboltTwoTone,
  BulbOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";

import processus from "./processus.jpg";
import { Form, Select, Space, Tooltip, Typography } from "antd";
import { Table } from "antd";
import HomeMobile from "./HomeMobile";

//Panier shopping

const Founders = (props) => {
  const { Option } = Select;
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    axios
      .post(
        `http://localhost:8000/api/contactForm/`,

        {
          name: values.name,
          email: values.email,
          message: values.message,
          url: values.url,
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("SUCESS1");
        axios
          .post(
            `http://localhost:8000/api/contactFormMail/`,

            {
              name: values.name,
              email: values.email,
              message: values.message,
              url: values.url,
            },
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            }
          )
          .then(() => {
            console.log("SUCESS2");
          })
          .catch((err) => {
            console.log("ERROR1", err.response);
          });
      })
      .catch((err) => {
        console.log("ERROR1", err.response);
      });
  };
  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

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
  if (width > 800) {
    return (
      <div>
        <MenuBrowser width={width} />
        <Bloc
          yellow={true}
          height={"400px"}
          content={
            " Leikka. est une petite entreprise toulousaine créée en 2023 par deux soeurs: Nadia et Nouria 👯‍♀️ .Leikka a pour ambition de simplifier le travail des professionels dumonde du loisir en proposant un système de réservation en ligne 💻.Nous avons aussi comme vocation à faciliter la recherche d activités et de cours pour tout un chacun! Nous avons à coeur de sélectionner les meilleurs professionnels pour que chaque expérience soit un souvenir unique 🥳."
          }
          icone={
            <ExperimentTwoTone
              twoToneColor="#ffa940"
              style={{ fontSize: "25px" }}
            />
          }
          titre={"Au menu de l'Expérience"}
          width={width <= 1200 ? "80%" : "40%"}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "20%",
          }}
        >
          <Image
            style={{
              marginTop: "20%",
              marginLeft: "-10%",
              borderRadius: "50%",
              width: "200px",
              height: "200px",
            }}
            preview={false}
            src={founders}
          />

          <div
            id="founders"
            className="pres"
            style={{ marginTop: "3%", width: "50%" }}
          >
            {" "}
            <h1>Fondatrices</h1>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginRight: "-16%",
          }}
        >
          <div
            id="process"
            className="pres"
            style={{
              marginTop: "7%",
              //marginLeft: "0%",
              width: "50%",
            }}
          >
            <h1>Fonctionnement</h1>
            Bienvenue à Leikka. - votre nouvelle façon de découvrir et
            d'apprendre! Leikka est bien plus qu'une simple plateforme de
            réservation d'expériences. <br /> <br />
            C'est une véritable communauté d'entreprises locales qui offre une
            expérience unique aux adultes et aux enfants. Notre concept repose
            sur l'idée de partager des moments de vie authentiques, de créer des
            liens uniques et de permettre des aventures inoubliables. <br />{" "}
            <br />
            En tant qu'aventurier, Leikka. vous propose une multitude d'options
            d'expériences, des stages de survie aux sauts de parachute, en
            passant par des activités insolites et uniques. Vous avez la
            possibilité de découvrir des activités 100% locales comme d'explorer
            de nouvelles cultures. <br /> <br />
            Pour nos partenaires, leikka. offre une opportunité exceptionnelle
            de partager leur savoirs faire avec des personnes du monde entier.
            <br />
          </div>
          <Image
            style={{
              marginTop: "90%",
              marginLeft: "3%",
              borderRadius: "50%",
              width: "200px",
              height: "200px",
            }}
            preview={false}
            src={process}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginLeft: "-9%",
          }}
        >
          <Image
            style={{
              marginTop: "30%",
              marginLeft: "-6%",

              borderRadius: "50%",
              width: "200px",
              height: "200px",
            }}
            preview={false}
            src={processus}
          />
          <div
            id="conditions"
            className="pres"
            style={{ marginTop: "7%", width: "50%" }}
          >
            {" "}
            <h1>Notre philosophie</h1>
            Leika. est à destionation de professionels qui ont une réelle
            expertise dans leur domaine afuin d'offrir la meilleure expérience
            possible.
            <br />
            Ainsi, les professionnels sont soumis à un process de sélection
            rigoureux.
            <br />
          </div>{" "}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            id="contact"
            className="pres"
            style={{ marginTop: "3%", width: "50%" }}
          >
            {" "}
            <h1>Formulaire de contact </h1>
            <Form name="complex-form" onFinish={onFinish}>
              <Form.Item
                name={"name"}
                label="Nom"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"email"}
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={"url"}
                label="URL site "
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={"message"}
                label="Message"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Valider
                </Button>
              </Form.Item>
            </Form>
          </div>
          {/* <Image
            style={{
              marginTop: "30%",
              marginLeft: "50%",
              borderRadius: "50%",
              width: "200px",
              height: "200px",
            }}
            preview={false}
            src={contact}
          /> */}
        </div>

        <Footer width={width} />
      </div>
    );
  } else {
    return (
      <div>
        <HomeMobile width={width} />
        <div style={{ display: "flex" }}>
          <div
            id="founders"
            style={{ marginTop: "3%", marginLeft: "12%", width: "50%" }}
          >
            {" "}
            <h1>Fondatrices</h1>
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
        <div style={{ display: "flex" }}>
          <div
            id="process"
            style={{ marginTop: "3%", marginLeft: "12%", width: "50%" }}
          >
            {" "}
            <h1>Fonctionnement</h1>
            Leika. permet à nos partenaires de simplifier le circuit de
            réservation en offrant une plateforme qui les met directement en
            lien avec les clients.
            <br />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            id="conditions"
            style={{ marginTop: "3%", marginLeft: "12%", width: "50%" }}
          >
            {" "}
            <h1>Conditions</h1>
            Leika. est à destination de professionels qui ont une réelle
            expertise dans leur domaine afin d'offrir la meilleure expérience
            possible.
            <br />
            Ainsi, les professionnels sont soumis à un process de sélection
            rigoureux.
            <br />
          </div>{" "}
        </div>
        <div style={{ display: "flex" }}>
          <div
            id="contact"
            style={{ marginTop: "3%", marginLeft: "12%", width: "50%" }}
          >
            {" "}
            <h1>Formulaire de contact </h1>
            <Form name="complex-form" onFinish={onFinish}>
              <Form.Item
                name={"name"}
                label="Nom"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name={"email"}
                label="Email"
                rules={[{ required: true, type: "email" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={"url"}
                label="URL site "
              >
                <Input />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                  },
                ]}
                name={"message"}
                label="Message"
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Valider
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>{" "}
        <Footer width={width} />
      </div>
    );
  }
};

export default Founders;
