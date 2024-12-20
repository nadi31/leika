import React from "react";
import { Affix, Menu } from "antd";
import "./style/review.css";

import bday from "./images/bdayy.png";

import camping from "./images/tent.png";
import stage from "./images/chef.png";
import music from "./images/instru.png";
import parent from "./images/mom.png";
import horse from "./images/triath.png";
import languages from "./images/abc.png";
import science from "./images/labo.png";
import Icon from "@ant-design/icons";
const MenuKids = () => {
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
                        src={bday}
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
                Anniversaires et Annimations
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
                        src={horse}
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
                Activités Sportives
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
                        src={camping}
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
                Campings et Centres Aérés
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
                        src={stage}
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
                Stages sur plusieurs jours
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
                        src={music}
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
                Musique
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
                        src={parent}
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
                Spécial parents et enfants
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
                        src={science}
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
                Activités scientifiques
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
                        src={languages}
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
                Langues étrangères
              </Menu.Item>
            </Menu>{" "}
          </div>
        </div>
      </Affix>
    </>
  );
};

export default MenuKids;
