import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@ant-design/icons";
import { Menu, Modal, Button } from "antd";
import hambur from "./hamburger.png";
import search from "./searchIcon.png";
import Cart from "./Cart";
import kids from "./kids2.png";
import logo2 from "./maory.png";
import team from "./team2.png";
import { useAuth } from "./AuthContext";
import Connexion from "./Connexion";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";

const MobileLayout = () => {
  const userData = useAuth();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const { SubMenu } = Menu;
  const [menuHamburger, setMenuHamburger] = useState(false);
  const [connexion, setConnexion] = useState(false);
  const [cart, setCart] = useState(false);
  const [connected, setConnected] = useState(userData ? true : false);
  const handleCart = () => {
    setCart(true);
  };
  const handleClick = () => {
    setConnexion(!connexion);
  };
  const handleMenuConnexionCub = (value) => {
    if (value.key === "1") {
      navigate("../recap/orders", { replace: true });
    }
    if (value.key === "2") {
      navigate("../profil", { replace: true });
    }
    if (value.key === "4") {
      navigate("../infos", { replace: true });
    }
    if (value.key === "3") {
      logout();

      navigate("../", { replace: true });
    }
    if (value.key === "5") {
      navigate("../infos/reviews", { replace: true });
    }
  };
  const handleMenuConnexionGiver = (value) => {
    if (value.key === "5") {
      logout();

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
    if (value.key === "6") {
      // navigate("");
      navigate("../booking/giver", { replace: true });
    }
    if (value.key === "4") {
      // navigate("");
      navigate("../online/giver", { replace: true });
    }
  };

  const handleMenuConnexionAdmin = (value) => {
    if (value.key === "4") {
      logout();

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
  const handleMenuNotConnected = (value) => {
    if (value.key === "1") {
      setConnexion(true);
    }
    if (value.key === "2") {
      //populaires
      navigate("../", { replace: true });
    }
    if (value.key === "3") {
      //proches de chez vous
      navigate("../", { replace: true });
    }
    if (value.key === "4") {
      setConnexion(true);
    }
  };
  return (
    <>
      <Menu
        mode="horizontal"
        style={{
          width: "100%",
          display: "table",
          textAlign: "center",
          fontFamily: "Dosis",
          background: "#FFF4F0",
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
          icon={
            <Icon
              component={() => (
                <MenuOutlined style={{ color: "#070C65", fontSize: "30px" }} />
              )}
            />
          }
        >
          {connexion ? (
            <div>
              <Connexion
                setConnected={setConnected}
                setConnexion={setConnexion}
                connexion={connexion}
                connected={userData ? true : false}
              />
            </div>
          ) : (
            <></>
          )}
          <Modal
            style={{ top: "-1%", float: "left" }}
            open={menuHamburger}
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
              {userData ? (
                <div
                  className="mobile"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <img
                    src={logo2}
                    style={{ width: "50%", marginLeft: "10%" }}
                  />

                  {userData.user_type === "1" ? (
                    <Menu
                      onClick={(e) => handleMenuConnexionAdmin(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "#070C65",
                        border: "None",
                      }}
                    >
                      <Menu.Item key="1">Créer un giver</Menu.Item>
                      <Menu.Item key="2 ">Créer une expérience</Menu.Item>
                      <Menu.Item key="3">Modifier une expérience</Menu.Item>
                      <Menu.Item key="4">Se déconnecter</Menu.Item>
                      <Menu.Item key="5">Cours à vérifier</Menu.Item>
                    </Menu>
                  ) : userData.user_type === "2" ? (
                    <Menu
                      onClick={(e) => handleMenuConnexionCub(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "#070C65",
                        border: "None",
                      }}
                    >
                      <Menu.Item key="1">Mes commandes</Menu.Item>

                      <Menu.Item key="4">Mes informations</Menu.Item>
                      <Menu.Item key="5">Mes avis</Menu.Item>
                      <Menu.Item key="3">Se déconnecter</Menu.Item>
                    </Menu>
                  ) : userData.user_type === "3" ? (
                    <Menu
                      onClick={(e) => handleMenuConnexionGiver(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "#070C65",
                        border: "None",
                      }}
                    >
                      <Menu.Item key="1">Créer un cours</Menu.Item>
                      <Menu.Item key="2">Modifier un cours </Menu.Item>
                      <Menu.Item key="3">Mon Compte </Menu.Item>
                      <Menu.Item key="6">Réservations </Menu.Item>
                      <Menu.Item key="5">Se déconnecter</Menu.Item>
                    </Menu>
                  ) : (
                    <Menu
                      onClick={(e) => handleMenuNotConnected(e)}
                      style={{
                        margin: "none",
                        padding: "none",
                        fontFamily: "Dosis",
                        fontSize: "25px",
                        width: "100%",
                        color: "#070C65",
                        border: "None",
                      }}
                    >
                      <Menu.Item key="1">Inscription</Menu.Item>
                      <Menu.Item key="2">Ateliers populaires</Menu.Item>
                      <Menu.Item key="3">
                        Ateliers proches de chez vous
                      </Menu.Item>
                      <Menu.Item key="4">Se connecter</Menu.Item>
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
            //   paddingBottom: "10px",
          }}
          // key="mail"

          onClick={() => {
            navigate("../");
          }}
          icon={
            <img
              src={logo2}
              height={40}
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
                <ShoppingCartOutlined
                  style={{ color: "#070C65", fontSize: "30px" }}
                />
              )}
            />
          }
        ></Menu.Item>
      </Menu>

      {cart ? (
        <div>
          <Cart setCart={setCart} cart={cart} />
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
            textAlign: "center",
            fontFamily: "Dosis",
            fontSize: "20px",
            background: "#FFF4F0",
          }}
        >
          <Menu.Item
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#070C65",
              justifyContent: "center",
              textAlign: "center",
            }}
            id="icons"
            onClick={() => {
              navigate("../", { replace: true });
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                style={{ paddingBottom: "5px" }}
                component={() => (
                  <img
                    src={search}
                    height={40}
                    style={{
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                )}
              />
              <span>Explorer</span>
            </div>
          </Menu.Item>

          <Menu.Item
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#070C65",
              justifyContent: "center",
              textAlign: "center",
            }}
            id="icons"
            onClick={() => {
              navigate("../kids", { replace: true });
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                style={{ paddingBottom: "5px" }}
                component={() => (
                  <img
                    src={kids}
                    height={40}
                    style={{
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                )}
              />
              <span>Enfants</span>
            </div>
          </Menu.Item>

          <Menu.Item
            style={{
              width: "30%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              color: "#070C65",
              justifyContent: "center",
              textAlign: "center",
            }}
            id="icons"
            onClick={() => {
              navigate("../team", { replace: true });
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                style={{ paddingBottom: "5px" }}
                component={() => (
                  <img
                    src={team}
                    height={40}
                    style={{
                      margin: "0 auto",
                      display: "block",
                    }}
                  />
                )}
              />
              <span>Team Building</span>
            </div>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default MobileLayout;
