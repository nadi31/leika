import React, { useState, useLayoutEffect } from "react";
import { Image, Button, Modal, InputNumber, message, Input } from "antd";
//import "antd/dist/antd.css";
import "./style/footer.css";
import axios from "axios";
import { BrowserView, MobileView } from "react-device-detect";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";
import img1 from "./france.png";
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
        console.log("SUCESS");
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
            {" "}
            <h1>Fonctionnement</h1>
            Leika. permet à nos partenaires de simplifier le circuit de
            réservation en offrant une plateforme qui les met directement en
            lien avec les clients.
            <br />
          </div>
        </div>
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
            {" "}
            <h1>Conditions</h1>
            Leika. est à destionation de professionels qui ont une réelle
            expertise dans leur domaine afuin d'offrir la meilleure expérience
            possible.
            <br />
            Ainsi, les professionnels sont soumis à un process de sélection
            rigoureux.
            <br />
          </div>{" "}
        </div>

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
            className="pres"
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
            className="pres"
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
            className="pres"
            style={{ marginTop: "3%", marginLeft: "12%", width: "50%" }}
          >
            {" "}
            <h1>Conditions</h1>
            Leika. est à destionation de professionels qui ont une réelle
            expertise dans leur domaine afuin d'offrir la meilleure expérience
            possible.
            <br />
            Ainsi, les professionnels sont soumis à un process de sélection
            rigoureux.
            <br />
          </div>{" "}
        </div>
        <div style={{ display: "flex" }}>
          <div
            className="pres"
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
