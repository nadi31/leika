import React, { useState, useEffect, useRef } from "react";
import { Affix, Menu } from "antd";
import "./style/review.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import bday from "./bdayy.png";
import basket from "./basket.png";
import { useNavigate, withRouter, useSearchParams } from "react-router-dom";
import { Button } from "antd";
import camping from "./tent.png";
import stage from "./chef.png";
import music from "./instru.png";
import parent from "./mom.png";
import horse from "./triath.png";
import languages from "./abc.png";
import science from "./labo.png";
import Icon from "@ant-design/icons";

const MenuKids2 = (props) => {
  const [searchParams, setSearchParams] = useSearchParams({});
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const ref = useRef(null);
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const goToPosts = () =>
    navigate({
      pathname: "/search/",
      search: `?${searchParams}`,
    });

  const handleMenu = (kidsActi) => {
    switch (kidsActi) {
      case 1:
        //anniversaire + kids
        searchParams.delete(["parent"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("bday", "true");
        searchParams.set("kids", "true");

        break;
      case 2:
        //Sport
        searchParams.delete(["parent"]);
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("category", 8);
        searchParams.set("kids", "true");
        break;
      case 3:
        //campings
        searchParams.delete(["parent"]);
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.delete(["parent"]);
        searchParams.set("sub_category", "camping");
        break;
      case 4:
        //stages
        searchParams.delete(["parent"]);
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("kids", "true");
        searchParams.set("category", 13);
        break;
      case 5:
        //musique
        searchParams.delete(["parent"]);
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("kids", "true");
        searchParams.set("sub_category", "musique");
        break;
      case 6:
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["kids"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("parent", "true");

        break;
      case 7:
        searchParams.delete(["parent"]);
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("kids", "true");
        searchParams.set("category", 12);

        break;
      case 8:
        searchParams.delete(["parent"]);
        searchParams.delete(["bday"]);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.delete(["category"]);
        searchParams.delete(["sub_category"]);
        searchParams.set("kids", "true");
        searchParams.set("category", 7);
        break;
      default:
        break;
    }

    goToPosts();

    window.location.reload();
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
              // key="mail"
              style={{ display: "inline-block" }}
              onClick={() => {
                handleMenu(1);
              }}
            >
              <a
                style={{ color: "#000", textDecoration: "none" }}
                href="#Accueil"
              >
                <Icon
                  component={() => (
                    <img
                      src={bday}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Anniversaire
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
                  //style={{ paddingTop: "10px" }}
                  component={() => (
                    <img
                      src={horse}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Activités Sportives
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
                      src={camping}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Campings et Centres Aérés
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
                      src={stage}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Stages sur plusieurs jours
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
                      src={music}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Musique
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
                      src={parent}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Spécial parents et enfants
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
                      src={science}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Activités scientifiques
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
                      src={languages}
                      height={30}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        float: "center",
                        marginBottom: 0,
                      }}
                    />
                  )}
                />
                <br />
                Langues étrangères
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

export default MenuKids2;
