import React, { useState, useLayoutEffect, useEffect } from "react";
import { ConfigProvider } from "antd";
import { BrowserView, MobileView } from "react-device-detect";
import { Card } from "antd";
import axios from "axios";
import HomeMobile from "./HomeMobile";
import Footer from "./Footer";

import MyMap from "./MyMap";
import ResCard from "./ResCard";
import MenuBrowser from "./MenuBrowser";

const Home = () => {
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
  const checkLocalStorageValidity = () => {
    console.log(" checkLocalStorageValidity ...");
    const minutes = 60;
    //const oneHourMs = 60 * 60 * 1000;
    const now = new Date().getTime();
    console.log("now: " + now);
    const setupTime = localStorage.getItem("setupTime");
    let variable = localStorage.getItem("variable");
    if (variable > 0) variable = variable + 1;
    console.log(" setInterval numero ..." + variable);
    localStorage.setItem("variable", variable);

    if (setupTime === null) {
      localStorage.setItem("variable", 0);
      localStorage.setItem("setupTime", now);
    } else {
      if (now - setupTime > minutes * 60 * 1000) {
        localStorage.clear();
        //  localStorage.setItem("setupTime", now);
      }
    }
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const [card1, setcard1] = useState(<></>);
  const [card2, setcard2] = useState(<></>);
  const [card3, setcard3] = useState(<></>);
  useEffect(() => {
    axios.get("http://localhost:8000/api-course/").then((res) => {
      setCourseList(res.data);
      console.log(res.data);
      //id+ width + img1 +title + price
      setcard1(<ResCard info={res.data[0]} width={width} />);

      setcard2(<ResCard info={res.data[1]} width={width} />);

      setcard3(<ResCard info={res.data[2]} width={width} />);
      checkLocalStorageValidity();

      // Set up interval to call the function every 3 minutes
      const interval = setInterval(() => {
        checkLocalStorageValidity();
      }, 1 * 60 * 1000); // 3 minutes

      // Cleanup function to clear the interval when component unmounts or when dependency changes
      return () => clearInterval(interval);
    });
  }, [width]);

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
  } else if (width < 800 && courseList !== null) {
    return (
      <div id="root">
        <HomeMobile />

        {card1}
        {card2}
        {card3}

        <Footer width={width} />
      </div>
    );
  } else if (width > 800 && courseList !== null) {
    return (
      <div id="root">
        <MenuBrowser
          team={false}
          kids={false}
          setDisplay={setDisplay}
          width={width}
          setResults={setResults}
        />
        <div
          className="div_video"
          style={{
            backgroundColor: "white",
            position: "flex",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          {/* <video style={{ width: "60%" }} autoPlay muted loop id="video">
            <source src={loop} type="video/mp4" />
          </video> */}
        </div>
        <div
          className="top"
          style={{
            fontSize: "200%",
          }}
        >
          <h3>Les plus recommandées.</h3>
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
          <div>
            {" "}
            <MyMap />
          </div>
        </div>
        <Footer width={width} />
      </div>
    );
  }
};

export default Home;
