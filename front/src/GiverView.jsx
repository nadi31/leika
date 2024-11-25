import MenuBrowser from "./MenuBrowser";
import Bloc from "./Bloc";

import { useParams } from "react-router-dom";
import dayjs from "dayjs";
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

import HomeMobile from "./HomeMobile";

const Giver = () => {
  const id = useParams();
  const idGiver = id["giverID"];

  const [adress, setAdress] = useState(null);
  const [giver, setGiver] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [review, setReview] = useState(null);
  const [courses, setCourses] = useState(null);
  const [small, setSmall] = useState("horizontal");
  const { Meta } = Card;
  function updateSize() {
    setWidth(window.innerWidth);
  }

  const requests = async () => {
    // console.log("COMMENTS " + key);
    try {
      const res = await axios.get(`http://localhost:8000/api/giver/${idGiver}`);

      setGiver(res.data[0]);
      console.log("GIVER " + giver);

      const res2 = await axios.get(
        `http://localhost:8000/api/giver/adress/${res.data[0].user}`
      );

      setAdress(res2.data[0]);

      console.log(adress);
      const res3 = await axios.get(
        `http://localhost:8000/api-course/review/giver/${idGiver}`
      );

      setReview(res3.data);
      const res4 = await axios.get(
        `http://localhost:8000/api-course/giver/online/course/${idGiver}`
      );

      setCourses(res4.data);

      //console.log("RES" + JSON.stringify(adress));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("ID " + idGiver);
    requests();
    console.log("COURSE " + courses);
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

  if (giver === null || adress === null) {
    return <div>Loading..</div>;
  }
  if (width > 700) {
    return (
      <div>
        <MenuBrowser width={width} />

        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Image
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            preview={false}
            src={"http://localhost:8000/" + giver.img1}
          />{" "}
          <br />
          <div>
            {" "}
            <h1>{giver.appelation}</h1> <br />
            <div>
              <p>
                {" 📍 "}
                {adress.name + "  "}
                {adress.add_ons ? adress.add_ons + "  " : "  "}
                {adress.apartment_number ? adress.apartment_number : "  "}

                {adress.city}
              </p>
            </div>
          </div>
        </div>
        <Bloc
          yellow={true}
          height={"900px"}
          content={giver.description}
          icone={
            <RocketTwoTone
              twoToneColor="#ffa940"
              style={{ fontSize: "25px" }}
            />
          }
          titre={"À propos"}
          width={width <= 1200 ? "100%" : "80%"}
        />

        <div>
          <h1>Cours en ligne</h1>
          {courses
            ? courses.map((course) => {
                return (
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
                      <a href={"http://localhost:3000/product/" + course.id}>
                        <Card
                          hoverable
                          style={{ border: "none", width: "100%" }}
                          cover={
                            <img
                              alt="couture"
                              width="500"
                              height="300"
                              src={course.img1}
                            />
                          }
                        >
                          <Meta
                            id="button_giver"
                            style={{ border: "none", marginTop: "-2%" }}
                            title={course.title}
                            description={course.price + "€"}
                          />
                        </Card>
                      </a>
                    </span>
                  </div>
                );
              })
            : null}
        </div>

        <Bloc
          height={"900px"}
          content={
            <div style={{ display: "block", width: "100%" }}>
              {review ? (
                <List style={{ width: "60%", margin: "auto" }}>
                  {review.map((comment) => {
                    return (
                      <List.Item>
                        <Review
                          iniale={comment.initiale}
                          prenom={comment.prenom}
                          titre={comment.titre}
                          content={comment.comment_cub}
                          date={dayjs(comment.dateHour).format("Do MMMM  YYYY")}
                          rating={comment.note}
                          statut={"GOLD"}
                        />
                      </List.Item>
                    );
                  })}
                </List>
              ) : null}{" "}
            </div>
          }
          icone={
            <HeartOutlined
              twoToneColor="#ffa940"
              style={{ fontSize: "25px" }}
            />
          }
          titre={"AVIS"}
          width={"100%"}
        />
        <Footer width={width} />
      </div>
    );
  } else {
    return (
      <div>
        <HomeMobile width={width} />;
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Image
            style={{ borderRadius: "50%", width: "100px", height: "100px" }}
            preview={false}
            src={giver.img1}
          />{" "}
          <br />
          <div>
            {" "}
            <h1>{giver.appelation}</h1> <br />
            <div>
              <p>
                {" 📍 "}
                {adress.name + "  "}
                {adress.add_ons ? adress.add_ons + "  " : "  "}
                {adress.apartment_number ? adress.apartment_number : "  "}

                {adress.city}
              </p>
            </div>
          </div>
        </div>
        <Bloc
          yellow={true}
          height={"900px"}
          content={giver.description}
          icone={
            <RocketTwoTone
              twoToneColor="#ffa940"
              style={{ fontSize: "25px" }}
            />
          }
          titre={"À propos"}
          width={width <= 1200 ? "100%" : "80%"}
        />
        <div>
          <h1>Cours en ligne</h1>
          {courses
            ? courses.map((course) => {
                return (
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
                      <a href={"http://localhost:3000/product/" + course.id}>
                        <Card
                          hoverable
                          style={{ border: "none", width: "100%" }}
                          cover={
                            <img
                              alt="couture"
                              width="500"
                              height="300"
                              src={course.img1}
                            />
                          }
                        >
                          <Meta
                            id="button_giver"
                            style={{ border: "none", marginTop: "-2%" }}
                            title={course.title}
                            description={course.price + "€"}
                          />
                        </Card>
                      </a>
                    </span>
                  </div>
                );
              })
            : null}
        </div>
        <Bloc
          height={"900px"}
          content={
            <div style={{ display: "block", width: "100%" }}>
              {review ? (
                <List style={{ width: "60%", margin: "auto" }}>
                  {review.map((comment) => {
                    return (
                      <List.Item>
                        <Review
                          iniale={comment.initiale}
                          prenom={comment.prenom}
                          titre={comment.titre}
                          content={comment.comment_cub}
                          date={dayjs(comment.dateHour).format("Do MMMM  YYYY")}
                          rating={comment.note}
                          statut={"GOLD"}
                        />
                      </List.Item>
                    );
                  })}
                </List>
              ) : null}{" "}
            </div>
          }
          icone={
            <HeartOutlined
              twoToneColor="#ffa940"
              style={{ fontSize: "25px" }}
            />
          }
          titre={"AVIS"}
          width={"100%"}
        />
        <Footer width={width} />
      </div>
    );
  }
};

export default Giver;
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
