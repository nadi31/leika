/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { Input, Tooltip } from "antd";
import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate, withRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import euros from "./euros.png";

import Icon, { RocketOutlined, ExperimentOutlined } from "@ant-design/icons";
import {
  Card,
  Slider,
  Form,
  Menu,
  message,
  Tag,
  Breadcrumb,
  InputNumber,
  Image,
  Switch,
  Button,
} from "antd";
import dancee from "./star.png";
import gift from "./giftCard.jpg";
import dayjs from "dayjs";

import MenuBrowser from "./MenuBrowser";

import axios from "axios";
import Footer from "./Footer";
import { filter } from "lodash";
import MenuMobile from "./MobileLayout";

const GiftCard = () => {
  const [small, setSmall] = useState("horizontal");
  const [width, setWidth] = useState(window.innerWidth);
  const [prix, setPrix] = useState(1);
  const uuid = require("uuid");

  const [key, setKey] = useState(uuid.v4());
  const [quant, setQuant] = useState(1);
  const [cart, setCart] = useState(0);
  const addTotalQuantity = (e) => {
    console.log(e);
    setCart(e);
  };

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
  const refactorizedData = (dataForBasket, initBasket) => {
    //let dataForBasket = JSON.parse(localStorage.getItem("cart") || "[]");
    //let dataForBasket = localStorage.getItem("cart")|| []

    console.log("DATA refactorized " + dataForBasket.length + dataForBasket);
    let result = [];

    for (let i = 0; i < dataForBasket.length; i++) {
      for (let y = 0; y < dataForBasket.length; y++) {
        if (
          dataForBasket[i].key == dataForBasket[y].key &&
          y != i &&
          dataForBasket[i].hourSelected.hour ==
            dataForBasket[y].hourSelected.hour &&
          dataForBasket[i].hourSelected.date ==
            dataForBasket[y].hourSelected.date
        ) {
          if (
            dataForBasket[y].maxSeats >=
            dataForBasket[y].seats + dataForBasket[i].seats
          ) {
            dataForBasket[y].seats += dataForBasket[i].seats;

            result.push(dataForBasket[y]);
            dataForBasket.splice(y, 1);
            dataForBasket.splice(i, 1);
          } else {
            message.info(
              "Il n'y a plus de place pour la date et l'heure sélectionnées"
            );
            //result.push(dataForBasket[y]);
            dataForBasket.splice(i, 1);
            dataForBasket.splice(y, 1);
            result = initBasket;
            dataForBasket = [];
          }

          //console.log(dataForBasket[i].name)
        }
      }
    }
    dataForBasket.map((itemIsole, pos) => {
      result.map((groupe) => {
        if (
          itemIsole.key == groupe.key &&
          itemIsole.hourSelected.hour == groupe.hourSelected.hour &&
          itemIsole.hourSelected.date == groupe.hourSelected.date
        ) {
          groupe.seats += itemIsole.seats;
          dataForBasket.splice(pos, 1);
        }
      });
    });
    dataForBasket.map((itemIsole) => result.push(itemIsole));

    // return console.log(arrays);
    console.log(JSON.stringify(result));
    console.log(dataForBasket);
    //console.log(dataForBasket);

    return result;
  };

  const handleOK = () => {
    let init_cart = JSON.parse(localStorage.getItem("cart") || "[]");
    let items = JSON.parse(localStorage.getItem("cart") || "[]");

    items.push({
      key: key,
      name: "gift card",
      price: prix,
      seats: quant,
      img: gift,
      maxSeats: 90,
      currency: "€",
      hourSelected: "",
    });
    let itemsOrdered = refactorizedData(items, init_cart);
    localStorage.setItem("cart", JSON.stringify(itemsOrdered));
    let tot = 0;

    // let itemsOrdered = refactorizedData();

    itemsOrdered.forEach(({ seats }) => {
      tot += seats;
    });
    localStorage.setItem("totalQuantity", JSON.stringify(tot));

    addTotalQuantity(tot);
  };
  return (
    <div style={{}}>
      <>
        {width < 800 ? (
          <div>
            <MenuMobile />
          </div>
        ) : (
          <BrowserView>
            <MenuBrowser width={width} />
          </BrowserView>
        )}{" "}
      </>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Image
          preview={false}
          style={{
            // width: "50%",
            display: "flex",
            justifyContent: "center",
          }}
          src={gift}
        />
      </div>
      <Form style={{ width: "23%", marginTop: "3%", marginLeft: "27%" }}>
        <Form.Item label={<>{"  Prix  "}</>}>
          <InputNumber
            onChange={(e) => {
              setPrix(e);
              const uuid = require("uuid");
              const id = uuid.v4();
              setKey(id);
            }}
            defaultValue={20}
            style={{ width: "100%" }}
            min={20}
            max={1000}
          />
        </Form.Item>
        <Form.Item label={<>{"  Quantité  "}</>}>
          {" "}
          <InputNumber
            onChange={(e) => {
              setQuant(e);
            }}
            defaultValue={1}
            style={{ width: "100%" }}
            min={0}
            max={1000}
          />
        </Form.Item>

        <Button onClick={handleOK}>Ajouter dans le panier </Button>
      </Form>
      <br />
      <Footer width={width} />
    </div>
  );
};

export default GiftCard;
