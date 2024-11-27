import React from "react";
import { Affix, Menu } from "antd";
import "./style/review.css";

import escape from "./images/escape.png";
import enigma from "./images/enigma.png";
import mystery from "./images/mystery.png";
import cook from "./images/cook.png";
import discovery from "./images/discovery.png";
import paint from "./images/paint.png";

import treasure from "./images/treasure.png";
import soccer from "./images/soccer.png";
import Icon from "@ant-design/icons";
const MenuTeamBuilding = () => {
  return (
    <>
      {" "}
      <Affix offsetTop={-26}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              textAlign: "center",
              display: "flex",
              width: "80%",
              // height: "110%",
              //varies depending on weither phone, tablet...:
              //marginLeft: "10%",
              //justifyContent: "center",
              flexDirection: "row",
            }}
          >
            {" "}
            <Menu
              mode="horizontal"
              style={{
                width: "100%",
                marginTop: "2%",
                justifyContent: "center",
                fontFamily: "Dosis",
              }}
            >
              <Menu.Item
                // key="mail"

                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={escape}
                        height={30}
                        style={{
                          marginTop: "-20px",
                          color: "hotpink",
                          //paddingTop: 10,
                          float: "center",
                        }}
                      />
                    )}
                  />
                }
              >
                {" "}
                <br />
                Escape Games
              </Menu.Item>

              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                // key="mail"
                icon={
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
                }
              >
                <br />
                Enigmes et Quizz
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
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
                }
              >
                <br />
                Enquêtes
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
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
                }
              >
                <br />
                Chasse au trésor
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
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
                }
              >
                <br />
                Sport d'équipe et Tournois
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
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
                }
              >
                <br />
                Découvertes
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
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
                }
              >
                <br />
                Actistiques
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity("");
                  //  handleSubmit(1);
                  // setMenuArt(true);
                }}
                icon={
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
                }
              >
                <br />
                Gastronomie
              </Menu.Item>
            </Menu>{" "}
          </div>
        </div>
      </Affix>
    </>
  );
};

export default MenuTeamBuilding;
