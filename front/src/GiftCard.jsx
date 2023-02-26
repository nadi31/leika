/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";

import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate, withRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import Geocode from "react-geocode";
import Map from "./Map"; // import the map here
import euros from "./euros.png";

import Icon, { RocketOutlined, ExperimentOutlined } from "@ant-design/icons";
import {
  Card,
  Slider,
  Form,
  Menu,
  Tag,
  Breadcrumb,
  InputNumber,
  Image,
  Input,
  Switch,
  Button,
} from "antd";
import dancee from "./star.png";
import gift from "./giftCard.png";
import dayjs from "dayjs";
import * as moment from "moment";
import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import axios from "axios";
import Footer from "./Footer";
import queryString from "query-string";
import { filter } from "lodash";

const GiftCard = () => {
  const [small, setSmall] = useState("horizontal");
  const [width, setWidth] = useState(window.innerWidth);

  function updateSize() {
    setWidth(window.innerWidth);
  }
  const update_sens = () => {
    window.innerWidth <= 1000 ? setSmall("vertical") : setSmall("horizontal");
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    window.addEventListener("resize", update_sens);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div>
      <>
        {" "}
        <BrowserView>
          <MenuBrowser width={width} />
        </BrowserView>
      </>
      <Card
        className="product_card"
        style={{ width: "100%", left: "12%" }}
        cover={
          <Image
            preview={false}
            style={{ width: "30%", height: "30%" }}
            src={gift}
          />
        }
      ></Card>
      <Form style={{ width: "23%", marginTop: "3%", marginLeft: "10%" }}>
        <Form.Item label={<>{"  Prix  "}</>}>
          <InputNumber
            defaultValue={1}
            style={{ width: "100%" }}
            min={0}
            max={1000}
          />
        </Form.Item>
        <Form.Item label={<>{"  Quantité  "}</>}>
          {" "}
          <InputNumber
            defaultValue={1}
            style={{ width: "100%" }}
            min={0}
            max={1000}
          />
        </Form.Item>
      </Form>
    </div>
  );
};

export default GiftCard;
