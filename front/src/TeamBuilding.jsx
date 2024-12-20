import React, { useState, useLayoutEffect, useEffect } from "react";

import { Card } from "antd";
import axios from "axios";

import Footer from "./Footer";

import MenuBrowser from "./MenuBrowser";

import HomeMobile from "./HomeMobile";
const TeamBuilding = () => {
  const [courseList, setCourseList] = useState([]);
  const [results, setResults] = useState([]);
  const funcCourseList = (res) => {
    setCourseList(res.data);
    console.log(res.data);
  };

  const getList = () => {
    axios
      .get("http://localhost:8000/api-course/")
      .then((res) => funcCourseList(res))
      .catch((err) => console.log(err));
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
  const [card1, setcard1] = useState(<></>);
  const [card2, setcard2] = useState(<></>);
  const [card3, setcard3] = useState(<></>);
  useEffect(() => {
    {
      axios.get("http://localhost:8000/api-course/16").then((res) => {
        setCourseList(res.data);
        console.log(res.data);

        setcard1(
          <a href={"product/" + res.data.id}>
            <Card
              hoverable
              style={{ border: "none", width: "100%" }}
              cover={
                <img
                  alt="example"
                  width="500"
                  height="300"
                  src={res.data.img1}
                />
              }
            >
              <Meta
                id="button_giver"
                style={{ marginTop: "-2%", border: "none" }}
                title={res.data.title}
                description={res.data.price + "€"}
              />
            </Card>
          </a>
        );
      });
      axios.get("http://localhost:8000/api-course/17").then((res) => {
        setCourseList(res.data);
        console.log(res.data);

        setcard2(
          <a href={"product/" + res.data.id}>
            <Card
              hoverable
              style={{ border: "none", width: "100%" }}
              cover={
                <img
                  alt="example"
                  width="500"
                  height="300"
                  src={res.data.img1}
                />
              }
            >
              <Meta
                id="button_giver"
                style={{ marginTop: "-2%", border: "none" }}
                title={res.data.title}
                description={res.data.price + "€"}
              />
            </Card>
          </a>
        );
      });
      axios.get("http://localhost:8000/api-course/18").then((res) => {
        setCourseList(res.data);
        console.log(res.data);

        setcard3(
          <a href={"product/" + res.data.id}>
            <Card
              hoverable
              style={{ border: "none", width: "100%" }}
              cover={
                <img
                  alt="example"
                  width="500"
                  height="300"
                  src={res.data.img1}
                />
              }
            >
              <Meta
                id="button_giver"
                style={{ marginTop: "-2%", border: "none" }}
                title={res.data.title}
                description={res.data.price + "€"}
              />
            </Card>
          </a>
        );
      });
    }
  }, []);

  const { Meta } = Card;

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const options = [
    { label: "Toulouse", value: "Toulouse" },
    { label: "Muret", value: "Muret" },
  ];

  //6 activités à mettre en valeur

  if (courseList === null) {
    return <div id="root">Loading..</div>;
  }
  if (width > 700) {
    return (
      <div id="root">
        <MenuBrowser
          team={true}
          kids={false}
          setDisplay={setDisplay}
          width={width}
          setResults={setResults}
        />

        <div
          className="top"
          style={{
            fontSize: "200%",
          }}
        >
          <h3>Les plus populaires.</h3>
        </div>

        <div
          style={{
            display: "block",

            marginLeft: "4%",
            width: "95%",
          }}
        >
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginRight: "4%",
            }}
          >
            {card1}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
            }}
          >
            {card2}
          </span>
          <span
            style={{
              position: "flex",

              width: "30%",
              float: "left",
              marginLeft: "4%",
            }}
          >
            {card3}
          </span>
        </div>
        <div
          className="top"
          style={{
            width: "40%",
            fontSize: "200%",
            display: "block",
          }}
        >
          <h3>Dispos aujourd'hui.</h3>
        </div>

        <div
          style={{
            display: "block",
            marginLeft: "4%",
            width: "95%",
            float: "left",
          }}
        >
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginRight: "4%",
            }}
          >
            {card1}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
            }}
          >
            {" "}
            {card3}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginLeft: "4%",
            }}
          >
            {card2}
          </span>
        </div>

        <Footer width={width} />
      </div>
    );
  }
  if (width < 800) {
    return (
      <div id="root">
        <HomeMobile team={true} kids={false} />

        <div
          className="top"
          style={{
            fontSize: "200%",
          }}
        >
          <h3>Les plus populaires.</h3>
        </div>

        <div
          style={{
            display: "block",

            marginLeft: "4%",
            width: "95%",
          }}
        >
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginRight: "4%",
            }}
          >
            {card1}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
            }}
          >
            {card2}
          </span>
          <span
            style={{
              position: "flex",

              width: "30%",
              float: "left",
              marginLeft: "4%",
            }}
          >
            {card3}
          </span>
        </div>
        <div
          className="top"
          style={{
            width: "40%",
            fontSize: "200%",
            display: "block",
          }}
        >
          <h3>Dispos aujourd'hui.</h3>
        </div>

        <div
          style={{
            display: "block",
            marginLeft: "4%",
            width: "95%",
            float: "left",
          }}
        >
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginRight: "4%",
            }}
          >
            {card1}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
            }}
          >
            {" "}
            {card3}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginLeft: "4%",
            }}
          >
            {card2}
          </span>
        </div>

        <Footer width={width} />
      </div>
    );
  }
};

export default TeamBuilding;
