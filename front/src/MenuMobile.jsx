import React, { useState, useEffect } from "react";
import { useNavigate, withRouter, useSearchParams } from "react-router-dom";
import { ConfigProvider, Modal } from "antd";

//import frFR from "antd/lib/locale/fr_FR";
//import MediaQuery from 'react-responsive';
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Menu, Button, Input, AutoComplete, Affix } from "antd";
import Icon from "@ant-design/icons";
import axios from "axios";
import logo2 from "./leika_logo2.png";
import Cart from "./Cart";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import board from "./board.png";
import france from "./france.png";
import drill from "./drill.png";
import eiffel from "./eiffel.png";
import gift from "./gift.png";
import team from "./team.png";
import museum from "./museum.png";
import noodles from "./noodles.png";
import sculpture from "./sculpture.png";
import sewing from "./sewing.png";
import dayjs from "dayjs";
import spa from "./spa.png";
import sport from "./sport.png";
import theatre from "./theatre.png";
import translation from "./translation.png";
import Connexion from "./Connexion";
import home from "./home.png";
import ckids from "./ckids.png";
import login from "./login.png";
import hambur from "./hamburger.png";
import { SettingOutlined, AppstoreOutlined } from "@ant-design/icons";
const { SubMenu } = Menu;
const MenuMobile = () => {
  let history = useNavigate();
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);
  const [menuHamburger, setMenuHamburger] = useState(false);
  const authLogOut = () => {
    localStorage.clear();
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem("RECHERCHE AVANCEE", "sub1", <SearchOutlined />),
    getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
      getItem("Option 5", "5"),
      getItem("Option 6", "6"),
      getItem("Submenu", "sub3", null, [
        getItem("Option 7", "7"),
        getItem("Option 8", "8"),
      ]),
    ]),
    getItem("Navigation Three", "sub4", <SettingOutlined />, [
      getItem("Option 9", "9"),
      getItem("Option 10", "10"),
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ];

  const [connected, setConnected] = useState(false);
  const handleClick = () => {
    setConnexion(!connexion);
  };
  const [connexion, setConnexion] = useState(false);
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }
  const [courseList, setCourseList] = useState([]);
  const [cart, setCart] = useState(false);
  const [results, setResults] = useState([]);
  const funcCourseList = (res) => {
    setCourseList(res.data);
    console.log(res.data);
  };
  const handleMenuConnexionCub = (value) => {
    if (value.key === "2") {
      navigate("../profil", { replace: true });
    }
    if (value.key === "3") {
      setConnected(false);
      authLogOut();

      navigate("../", { replace: true });
    } else {
      console.log(value.key);
    }
  };
  const handleMenuConnexionGiver = (value) => {
    if (value.key === "5") {
      setConnected(false);
      authLogOut();

      navigate("../", { replace: true });
    }
    if (value.key === "1") {
      //navigate("/create");
      navigate("../create", { replace: true });
    }
    if (value.key === "2") {
      // navigate("");
      navigate("../update/giver", { replace: true });
    }
    if (value.key === "3") {
      // navigate("");
      navigate("../profil/giver", { replace: true });
    }

    if (value.key === "4") {
      // navigate("");
      navigate("../online/giver", { replace: true });
    }
  };

  const handleMenuConnexionAdmin = (value) => {
    if (value.key === "4") {
      setConnected(false);
      authLogOut();

      navigate("../", { replace: true });
    }
    if (value.key === "1") {
      //navigate("/create");
      navigate("../create/giver", { replace: true });
    }
    if (value.key === "2") {
      //navigate("/create");
      navigate("../create", { replace: true });
    }

    if (value.key === "3") {
      // navigate("");
      navigate("../update/giver", { replace: true });
    }
    if (value.key === "5") {
      // navigate("");
      navigate("../admin/list/verify", { replace: true });
    }
  };

  const [display, setDisplay] = useState(false);

  const [card1, setcard1] = useState(<></>);
  const [card2, setcard2] = useState(<></>);
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    {
    }
  }, []);

  const { Meta } = Card;
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

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
  const [bottom, setBottom] = useState(830);
  const handleCart = () => {
    setCart(true);
  };
  //6 activités à mettre en valeur

  return (
    <div style={{ width: "100%" }}>
      <Menu
        mode="horizontal"
        style={{
          width: "100%",
          display: "table",
          textAlign: "center",
          fontFamily: "Dosis",
          background: "#F4F4F4",
        }}
      >
        <Menu.Item
          id="icons"
          defaultOpenKeys={["sub1"]}
          style={{
            width: "33%",
            height: "50%",
            display: "inlineBlock",
            float: "none",
            paddingBottom: "10px",
          }}
          onClick={() => setMenuHamburger(!menuHamburger)}
          icon=<img
            src={hambur}
            height={30}
            style={{
              marginTop: "-20px",
              color: "hotpink",
              //paddingTop: 10,
              float: "center",
            }}
          />
        >
          <Modal
            style={{ top: "-1%", float: "left" }}
            visible={menuHamburger}
            onCancel={() => setMenuHamburger(false)}
            width="100%"
            footer={null}
            //onAfterOpen={afterOpenModal}

            contentLabel="Example Modal"
          >
            <div
              style={{
                height: "1000px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {localStorage.getItem("connected") === "true" ? (
                <div className="connec" style={{ display: "-ms-flexbox" }}>
                  {localStorage.getItem("user_type") === "1" ? (
                    <Menu
                      onClick={(e) => handleMenuConnexionAdmin(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <Menu.Item key="1">Créer un giver</Menu.Item>
                      <Menu.Item key="2">Créer une expérience</Menu.Item>
                      <Menu.Item key="3">Modifier une expérience</Menu.Item>
                      <Menu.Item key="4">Se déconnecter</Menu.Item>
                      <Menu.Item key="5">Cours à vérifier</Menu.Item>
                    </Menu>
                  ) : localStorage.getItem("user_type") === "2" ? (
                    <Menu
                      onClick={(e) => handleMenuConnexionCub(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <Menu.Item key="1">Mes commandes</Menu.Item>
                      <Menu.Item key="2">Mon profil</Menu.Item>
                      <Menu.Item key="3">Se déconnecter</Menu.Item>
                    </Menu>
                  ) : (
                    <Menu
                      onClick={(e) => handleMenuConnexionGiver(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "black",
                      }}
                    >
                      <Menu.Item key="1">Créer un cours</Menu.Item>
                      <Menu.Item key="2">Modifier un cours </Menu.Item>
                      <Menu.Item key="3">Mon Compte </Menu.Item>
                      <Menu.Item key="5">Se déconnecter</Menu.Item>
                    </Menu>
                  )}
                </div>
              ) : (
                <>
                  {" "}
                  <div className="WORK" style={{ display: "-ms-flexbox" }}>
                    <a
                      style={{
                        padding: "18px",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        color: "black",
                      }}
                      href=""
                    >
                      BEST-SELLERS
                    </a>
                    <br />
                    <a
                      style={{
                        padding: "18px",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        color: "black",
                      }}
                      href=""
                    >
                      TENDANCES
                    </a>
                    <br />
                    <a
                      style={{
                        padding: "18px",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        color: "black",
                      }}
                      href=""
                    >
                      RECOMMANDÉES
                    </a>
                    <br />
                    <div style={{ marginTop: "10%" }}>
                      <Menu
                        style={{
                          margin: "none",
                          padding: "none",
                          fontFamily: "Dosis",
                          fontSize: "25px",
                          width: "100%",
                          color: "black",
                        }}
                        // mode="inline"
                        //inlineCollapsed={collapsed}
                      >
                        <SubMenu
                          style={{
                            width: "100%",
                          }}
                          title={"  ESPACE ENTREPRISE"}
                        >
                          <Menu.Item
                            style={{
                              width: "100%",
                            }}
                            key=""
                          >
                            Devenir Giver
                          </Menu.Item>
                          <Menu.Item
                            onClick={handleClick}
                            style={{
                              width: "100%",
                            }}
                            key=""
                          >
                            Se connecter
                          </Menu.Item>
                          <Menu.Item
                            style={{
                              width: "100%",
                            }}
                            key=""
                          >
                            Nous contacter
                          </Menu.Item>
                        </SubMenu>
                      </Menu>
                    </div>

                    <br />

                    <div
                      style={{
                        marginTop: "40%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Button
                        onClick={handleClick}
                        style={{
                          fontFamily: "Dosis",
                          fontSize: "20px",
                          borderRadius: "25px",
                          background: "#FCEFCD",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        Je m'inscris
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Modal>
        </Menu.Item>
        <Menu.Item
          id="icons"
          style={{
            width: "33%",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
          // key="mail"

          onClick={() => {
            // setActivity("");
            //  handleSubmit(1);
            // setMenuArt(true);
          }}
          icon={
            <img
              src={logo2}
              height={30}
              style={{
                marginTop: "-20px",
                color: "hotpink",
                //paddingTop: 10,
                float: "center",
              }}
            />
          }
        >
          {" "}
        </Menu.Item>
        <Menu.Item
          style={{
            width: "33%",
            justifyContent: "center",
            paddingBottom: "10px",
          }}
          id="icons"
          onClick={() => handleCart()}
          //  handleSubmit(1);
          // setMenuArt(true);

          icon={
            <Icon
              component={() => (
                <ShoppingCartOutlined style={{ fontSize: "30px" }} />
              )}
            />
          }
        ></Menu.Item>
      </Menu>

      {cart ? (
        <div>
          <Cart setCart={setCart} cart={cart} width={width} />
        </div>
      ) : (
        <></>
      )}

      <div
        style={{ position: "fixed", bottom: "0%", width: "100%", zIndex: 1 }}
      >
        <Menu
          mode="horizontal"
          style={{
            width: "100%",
            display: "table",
            textAlign: "center",
            fontFamily: "Dosis",
            background: "#F4F4F4",
          }}
        >
          <Menu.Item
            id="icons"
            // key="mail"
            style={{
              width: "33%",
              height: "50%",
              display: "inlineBlock",
              float: "none",
              paddingBottom: "10px",
            }}
            onClick={() => {
              // setActivity("");
              //  handleSubmit(1);
              // setMenuArt(true);
            }}
            icon={
              <Icon
                style={{ paddingTop: "10px" }}
                component={() => (
                  <img
                    src={gift}
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
            }
          >
            <br />
            Carte Cadeau
          </Menu.Item>
          <Menu.Item
            id="icons"
            style={{
              width: "33%",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
            // key="mail"

            onClick={() => {
              // setActivity("");
              //  handleSubmit(1);
              // setMenuArt(true);
            }}
            icon={
              <Icon
                style={{ paddingTop: "10px" }}
                component={() => (
                  <img
                    src={ckids}
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
            Enfants
          </Menu.Item>
          <Menu.Item
            style={{
              width: "33%",
              justifyContent: "center",
              paddingBottom: "10px",
            }}
            id="icons"
            //onClick={handleClick}
            icon={
              <Icon
                style={{ paddingTop: "10px" }}
                component={() => (
                  <img
                    src={team}
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
            <br />
            Team Building
          </Menu.Item>
        </Menu>
        {connexion ? (
          <div>
            <Connexion
              setConnected={setConnected}
              setConnexion={setConnexion}
              connexion={connexion}
              connected={connected}
            />
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default MenuMobile;
