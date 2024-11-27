import MenuBrowser from "./MenuBrowser";

import { useParams } from "react-router-dom";

import React, { useState, useLayoutEffect, useEffect } from "react";
import { Button, message } from "antd";

import Footer from "./Footer";
import axios from "axios";
import "./style/ProductDetail.css";

import HomeMobile from "./HomeMobile";

const EmailVerify = (props) => {
  const token = useParams();
  const key = token["token"];
  const [width, setWidth] = useState(window.innerWidth);
  const [small, setSmall] = useState("horizontal");

  function updateSize() {
    setWidth(window.innerWidth);
  }

  const requests = async () => {
    console.log("COMMENTS " + key);
    try {
      const res = axios
        .get(`http://localhost:8000/api/token/${key}`)
        .then((res1) => {
          console.log("COMMENTS" + res1.data[0].email);
          axios
            .post(
              "http://localhost:8000/api/token",

              {
                email: res1.data[0].email,
              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )

            .then((response) => {
              if (response.status == "success") {
                message.success("Vous êtes inscrits");
                this.setState({ valid: 1 });
                localStorage.setItem("nana@gmail.com", 1);
              } else if (response.status == "failed") {
                message.error("Un problème est survenu.");
                this.setState({ valid: 2 });
              }
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("ID " + key);
  }, []);

  const update_sens = () => {
    window.innerWidth <= 1000 ? setSmall("vertical") : setSmall("horizontal");
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    window.addEventListener("resize", update_sens);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const style_icone = {
    border: "none",
    width: width <= 1200 ? "90%" : "40%",
    marginBottom: "5px",
    marginLeft: width <= 1200 ? "2%" : "",
  };

  if (key === null) {
    return <div>Loading..</div>;
  }
  if (width > 800) {
    return (
      <>
        <MenuBrowser width={width} />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Dosis",
          }}
        >
          Pour vérifier votre email, <br /> veuillez cliquer sur le bouton
          suivant:{" "}
          <Button
            style={{
              width: "40%",
              borderRadius: "25px",
              backgroundColor: "#ffd04f",
              margin: "10%",
            }}
            onClick={requests}
          >
            Verify
          </Button>
        </div>
        <Footer width={width} />
      </>
    );
  } else {
    return (
      <>
        <HomeMobile width={width} />

        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            fontFamily: "Dosis",
          }}
        >
          Pour vérifier votre email, <br /> veuillez cliquer sur le bouton
          suivant:{" "}
          <Button
            style={{
              width: "40%",
              borderRadius: "25px",
              backgroundColor: "#ffd04f",
              margin: "10%",
            }}
            onClick={requests}
          >
            Verify
          </Button>
        </div>
        <Footer width={width} />
      </>
    );
  }
};

export default EmailVerify;
/*<br />

 <br />
           */
/*RocketTwoTone,
  ExperimentTwoTone,
  EnvironmentTwoTone,
  SmileTwoTone,
  ThunderboltTwoTone,
  BulbOutlined,
  InfoCircleOutlined, */
