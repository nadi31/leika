import MenuBrowser from "./MenuBrowser";
import Bloc from "./Bloc";

import { useParams } from "react-router-dom";

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  Rate,
  Card,
  Steps,
  Button,
  InputNumber,
  AutoComplete,
  Carousel,
  Tabs,
  Timeline,
  Image,
  Avatar,
  List,
  Breadcrumb,
  message,
} from "antd";
import kart from "./kart.jpg";
import para from "./para.jpg";
import couture from "./couture.jpg";
import logo2 from "./logo2.png";
import { BrowserView, MobileView } from "react-device-detect";

import Review from "./Review";
import Footer from "./Footer";
import axios from "axios";
import "./style/ProductDetail.css";
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
import { isArrayLiteralExpression } from "typescript";

const EmailVerify = (props) => {
  const [course, setCourse] = useState(null);

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
                this.setState({ valid: 1 });
                localStorage.setItem("nana@gmail.com", 1);
              } else if (response.status == "failed") {
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
  } else {
    return (
      <>
        <BrowserView>
          <MenuBrowser width={width} />
        </BrowserView>

        <div style={{ width: "100%" }}></div>
        <Button onClick={requests}>Verify</Button>
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
