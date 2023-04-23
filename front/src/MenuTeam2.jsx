import React, { useState, useEffect, useRef } from "react";

import { useNavigate, withRouter, useSearchParams } from "react-router-dom";
import "./style/review.css";
import { Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import escape from "./escape.png";
import enigma from "./enigma.png";
import mystery from "./mystery.png";
import cook from "./cook.png";
import discovery from "./discovery.png";
import paint from "./paint.png";
import quiz from "./quiz.png";
import treasure from "./treasure.png";
import soccer from "./soccer.png";
import Icon from "@ant-design/icons";
const MenuTeam2 = (props) => {
  const goToPosts = () =>
    navigate({
      pathname: "/search/",
      search: `?${searchParams}`,
    });

  const handleMenu = (teamActi) => {
    switch (teamActi) {
      case 1:
        //anniversaire + kids
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("sub_category", "escape");
        searchParams.set("team", "true");
        break;
      case 2:
        //Sport

        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("sub_category", "enigme");
        searchParams.set("team", "true");
        break;
      case 3:
        //campings
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("sub_category", "enquete");
        searchParams.set("team", "true");
        break;
      case 4:
        //stages
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("sub_category", "chasse");
        searchParams.set("team", "true");
        break;
      case 5:
        //musique
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("sub_category", "equipe");
        searchParams.set("team", "true");
        break;
      case 6:
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("sub_category", "decouverte");
        searchParams.set("team", "true");
        break;
      case 7:
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("category", 1);
        searchParams.set("team", "true");

        break;
      case 8:
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("category", 5);
        searchParams.set("team", "true");

        break;
      default:
        break;
    }

    goToPosts();

    window.location.reload();
  };
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <>
      {" "}
      <div
        className="header"
        style={{
          width: "100%",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          background: "#FCEFCD",
        }}
      >
        <nav style={{ width: "100%" }}>
          {" "}
          <ul
            ref={ref}
            style={{
              display: "list-item",
              overflowX: "scroll",
              display: "inline-flex",
              width: "90%",
              textAlign: "center",
              fontFamily: "Dosis",
              listStyle: "none",

              //paddingLeft: "10%",
            }}
          >
            {width < 800 ? (
              <Button
                onClick={() => scroll(-20)}
                style={{
                  width: "8%",
                  background: "#FCEFCD",
                  position: "absolute",
                  marginTop: "5%",
                  left: 0,
                  justifyContent: "center",
                  border: "none",
                }}
              >
                <LeftOutlined />
              </Button>
            ) : null}
            <li
              onClick={() => {
                handleMenu(1);
              }}
              // key="mail"
            >
              {" "}
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={escape}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Escape Games
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(2);
              }}
              // key="mail"
            >
              {" "}
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={enigma}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Enigmes et Quizz
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(3);
              }}
            >
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={mystery}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Enquêtes
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(4);
              }}
            >
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                {" "}
                <Icon
                  component={() => (
                    <img
                      src={treasure}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Chasse au trésor
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(5);
              }}
            >
              {" "}
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={soccer}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Sport d'équipe et Tournois
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(6);
              }}
            >
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={discovery}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Découvertes
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(7);
              }}
            >
              {" "}
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={paint}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Activités Actistiques
              </a>
            </li>
            <li
              onClick={() => {
                handleMenu(8);
              }}
            >
              {" "}
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={cook}
                      height={30}
                      style={{
                        // margin: "0 7px 0 0",
                        //paddingTop: 10,
                        float: "center",
                      }}
                    />
                  )}
                />
                <br />
                Activités Gastronomiques
              </a>
            </li>{" "}
            {width < 800 ? (
              <Button
                onClick={() => scroll(20)}
                style={{
                  width: "8%",
                  background: "#FCEFCD",
                  position: "absolute",
                  marginTop: "5%",
                  right: 0,
                  justifyContent: "center",
                  border: "none",
                }}
              >
                <RightOutlined />
              </Button>
            ) : null}
          </ul>
        </nav>
      </div>
    </>
  );
};

export default MenuTeam2;
