import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { useHistory, withRouter } from "react-router-dom";
import { browserHistory } from "react-router";
//import MediaQuery from 'react-responsive';
import { BrowserView, MobileView } from "react-device-detect";
import {
  Card,
  Menu,
  Button,
  Input,
  AutoComplete,
  Carousel,
  Image,
  Dropdown,
} from "antd";
import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  SearchOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import Connexion from "./Connexion";
import Cart from "./Cart";
import logo2 from "./leika_logo2.gif";
import para from "./para.jpg";
import couture from "./couture.jpg";
import kart from "./kart.jpg";
import loop from "./loop.mp4";
import kids from "./kids.png";
import Form from "antd/lib/form/Form";
import Results from "./Results";
//Panier shopping

const MenuBrowser = (props) => {
  const [results, setResults] = useState([]);
  const [display, setDisplay] = useState(false);
  const [cubConnect, setCubConnect] = useState(false);
  const [giverConnect, setGiverConnect] = useState(false);
  const [connected, setConnected] = useState(false);
  const [menuConnected, setMenuConnected] = useState(null);
  useEffect(() => {
    //setConnected(localStorage.getItem("connected") || false );
    
  }, []);
  const menuConnexion = () => {
    console.log("ID USERRRR "+localStorage.getItem("user_type") )
    if (JSON.parse(localStorage.getItem("connected"))) {
      if (localStorage.getItem("user_type") == 2) {
        return menuConnectedCub;
      } else if (localStorage.getItem("user_type") == 3) {
        return menuConnectedGiver;
      }
    }
  };
  const [city, setCity] = useState("");

  let history = useHistory();

  let query = "";
  const sendToPage = useCallback(
    (query) => history.push(`/search${query}`),
    [history]
  );

  const authLogOut = () => {
    localStorage.setItem("token", null);
    localStorage.setItem("expirationDate", null);
    localStorage.setItem("user_type", null);
    localStorage.setItem("ID_user", null);
    localStorage.setItem("ID", null);
    localStorage.setItem("first_name", null);
    localStorage.setItem("connected", false);
    window.dispatchEvent(new Event("message"));
  };
  const handleSubmit = () => {
    console.log("Received values of form: " + activity + city);
    //Faire en sorte, pour que ça marche, que les sub_category ne contiennent pas de mots clés similaires à category
    /*if (
      activity.includes(
        "Art" ||
          "Arts de scene" ||
          "Loisirs créatifs" ||
          "Culinaire"||
          "Pro" ||
          "Jeux" ||
          "creatifs" ||
          "Culture" ||
          "Linguistique" ||
          "Langues" ||
          "Tours" ||
          "Sport" ||
      "Beauté" 
      ))*/
    switch (activity) {
      case "Art":
        query = query + "&category=" + "1";
        break;
      case "Arts de scene":
        query = query + "&category=" + "2";
        break;
      case "Loisirs creatifs":
        query = query + "&category=" + "3";
        break;
      case "Culinaire":
        query = query + "&category=" + "5";
        break;
      case "Culture":
        query = query + "&category=" + "6";
        break;
      case "Jeux":
        query = query + "&category=" + "9";
        break;
      case "Langues":
        query = query + "&category=" + "7";
        break;
      case "Tours, Circuits, Expériences":
        query = query + "&category=" + "11";
        break;
      case "Pro":
        query = query + "&category=" + "4";
        break;
      case "Sport":
        query = query + "&category=" + "8";
        break;
      default:
        query = query + "&sub_category=" + activity;
        break;
    }

    if (city !== null) {
      query = query + "&city=" + city;
    }
    sendToPage(query);
    window.location.reload();
    //setValue(value);
    //console.log("query****", fieldsValue.activity);
    // let query = "";
    //query = query_set(fieldsValue.activity);

    //let query_city = "";
    //query_city = query_set(fieldsValue.city);
    // funtionQuery(fieldsValue);
    //console.log("QUERY***" + query_finale);

    // display.current = true;
    //console.log("DISPLAY", results.current);

    //fieldsValue.activity;
    //isVerified;
  };
  const handleMenuConnexion = (value) => {
    if (value.key == 3) {
      authLogOut();
      setConnected(false);
      
    } else {
      console.log(value.key);
    }
  };
  const menuConnectedCub = (
    <Menu onClick={handleMenuConnexion}>
      <Menu.Item key="1">Mes commandes</Menu.Item>
      <Menu.Item key="2">Mon profil</Menu.Item>
      <Menu.Item key="3">Se déconnecter</Menu.Item>
    </Menu>
  );
  const menuConnectedGiver = (
    <Menu onClick={handleMenuConnexion}>
      <Menu.Item key="1">Créer un cours</Menu.Item>
      <Menu.Item key="2">Cours créés </Menu.Item>
      <Menu.Item key="3">Se déconnecter</Menu.Item>
    </Menu>
  );
  const renderTitle = (title) => {
    return {
      value: title,
      label: (
        <div
          style={{
            position: "absolute",
            //position: "absolute",
            //marginLeft: "10%",
            //marginTop: "6%",
            top: "-20%",
            // position: "absolute",
            color: "#d6295a",
            padding: 0 + "px",
            border: 0 + "px",
            // margin:0 + "px",
            //marginTop: 0 + "px",
            // marginBottom: -30 + "px",
            //float: "left",
          }}
        >
          {title}
        </div>
      ),
    };
  };
  const renderItem = (title) => {
    return {
      value: title,
      label: (
        <div
          style={{
            //marginTop: "0%",
            position: "flex",
            width: "100%",
            //position: "absolute",
            marginLeft: "10%",
            padding: 0 + "px",
            border: 0 + "px",
            //margin: 0 + "px",
            //
            //marginBottom: "-120%",
            // marginTop: "-20%",
            //top: "-120%",
            //display: "flex",
            // display: "flex",
            //justifyContent: "space-between",
          }}
        >
          {title}
        </div>
      ),
    };
  };
  const [activity, setActivity] = useState("");
  const age = [
    { value: "Tous les âges", label: "Tous les âges" },
    { value: "Adultes", label: "Adultes" },
    { value: "Ados", label: "Ados" },
    { value: "Enfants", label: "Enfants" },
  ];
  const niveau = [
    { value: "isBeginner", label: "Débutant" },

    { value: "isIntermediate", label: "Intermédiaire" },
    { value: "isAdvanced", label: "Confirmé" },
  ];
  const options2 = [
    { value: "Toulouse" },
    { value: "Paris" },
    { value: "Genève" },
  ];
  const options = [
    {
      options: [
        renderTitle("Art"),
        renderItem("Calligraphie"),
        // { value: "Calligraphie", label: "Calligraphie" },
        renderItem("Dessin"),
        // { value: "", label: "Dessin" },
        renderItem("Peinture"),
        renderItem("Photographie"),
        renderItem("Poterie"),
        renderItem("Sculpture"),
        renderItem("Vitraux"),
      ],
    },
    {
      options: [
        renderTitle("Arts de scene"),
        renderItem("Dance"),
        renderItem("Improvisation"),
        renderItem("Musique"),
        renderItem("Scénographie"),
        renderItem("Théâtre"),
      ],
    },
    {
      options: [
        renderTitle("Loisirs creatifs"),
        renderItem("Bijoux"),
        renderItem("Composition florale"),
        renderItem("Crochet"),
        renderItem("Couture"),
        renderItem("Modélisme"),
        renderItem("Stylisme"),
        renderItem("Travail du bois"),
        renderItem("Travail du métal"),
        renderItem("Travail du verre"),
        renderItem("Tricot"),
      ],
    },
    {
      options: [
        renderTitle("Culinaire"),
        renderItem("Cours de cuisine"),
        renderItem("Dégustation"),
        renderItem("Fabrication de boisson"),
        renderItem("Pâtisserie"),
      ],
    },
    {
      options: [
        renderTitle("Culture"),
        renderItem("Cinéma"),
        renderItem("Concert"),
        renderItem("Jeux de société"),
        renderItem("Jeux vidéo"),
        renderItem("Musée"),
        renderItem("Opéra"),
        // renderItem("Philosophie"),
        //  renderItem("Spiritualité"),
      ],
    },
    {
      options: [
        renderTitle("Jeux"),
        renderItem("Accrobranche"),
        renderItem("Airsolf"),
        renderItem("Escape games"),
        renderItem("Laser games"),
        renderItem("Paintball"),
        renderItem("Philosophie"),
        renderItem("Spiritualite"),
      ],
    },
    {
      options: [
        renderTitle("Langues"),
        renderItem("Anglais"),
        renderItem("Arabe"),
        renderItem("Chinois"),
        renderItem("Espagnol"),
        renderItem("Japonais"),
        renderItem("Portuguais"),
        renderItem("Russe"),
      ],
    },
    {
      options: [
        renderTitle("Tours, Circuits, Expériences"),
        renderItem("Apiculture"),
        renderItem("Aquarium"),
        renderItem("Balade en bateau"),
        renderItem("Balade à cheval"),
        renderItem("Cirque"),
        renderItem("Fermes"),
        renderItem("Magie"),
        renderItem("Maisons hantées"),
        renderItem("Randonnées"),
        renderItem("Zoo"),
      ],
    },
    {
      options: [
        renderTitle("Pro"),
        renderItem("Beauté"),
        renderItem("Bricolage"),
        renderItem("Communication"),
        renderItem("Gestion"),
        renderItem("Jardinage"),
        renderItem("Logiciels"),
        renderItem("Management"),
        renderItem("Médecine douce"),
        renderItem("Mode"),
        renderItem("Premiers secours"),
        renderItem("Programmation"),
        renderItem("Rédaction"),
      ],
    },
    {
      options: [
        renderTitle("Sport"),
        renderItem("Aéronautique"),
        renderItem("Badmington"),
        renderItem("Basket"),
        renderItem("Boxe"),
        renderItem("Crossfit"),
        renderItem("Escalade"),
        renderItem("Fitness"),
        renderItem("Football"),
        renderItem("Golf"),
        renderItem("Handball"),
        renderItem("Karting"),
        renderItem("Montgolfiere"),
        renderItem("Moto"),
        renderItem("Natation"),
        renderItem("Parachutisme"),
        renderItem("Parapente"),
        renderItem("Pilates"),
        renderItem("Quad"),
        renderItem("Saut à l'élastique"),
        renderItem("Sport de combat"),
        renderItem("Tennis"),
        renderItem("Yoga"),
        renderItem("Mode"),
        renderItem("Zumba"),
      ],
    },
  ];

  const [connexion, setConnexion] = useState(false);
  const [cart, setCart] = useState(false);
  const handleCart = () => {
    setCart(true);
  };
  const handleClick = () => {
    setConnexion(!connexion);
  };

  return (
    <BrowserView>
      <div
        style={{
          position: "flex",
          display: "flex",
          maxHeight: props.width <= "1100" ? "150px" : "80px",
        }}
      >
        {" "}
        <a href={"/"}>
          <img
            style={{
              justifyContent: "left",
              width: props.width <= "1100" ? "50%" : "80%",
              marginLeft: "20%",
            }}
            id="img_logo_desktop"
            src={logo2}
            alt="logo"
          ></img>
        </a>
        {props.width <= 800 ? (
          <>
            <Menu
              style={{ border: "none", display: "flex", marginLeft: "50%" }}
            >
              <Menu.Item
                //onClick={() => handleClick()}
                key="dropdown"
                // icon={<UserOutlined />}
              >
                <MenuOutlined style={{ fontSize: "20px" }} />
              </Menu.Item>
            </Menu>
          </>
        ) : props.width >= 1100 ? (
          <>
            <Menu
              mode="horizontal"
              className="menu"
              name="menu_elements"
              style={{
                justifyContent: "center",
                width: "60%",
                borderBottom: "none",
                display: "flex",
                marginLeft: "20%",
                fontSize: props.width <= "1400" ? "15px" : "20px",
              }}
            >
              <Menu.Item
                id="kids"
                //onClick={() => handleClick()}
                key="kids"
                icon={
                  <Image
                    src={kids}
                    preview={false}
                    style={{ width: "20px", marginLeft: "-30%", bottom: "0" }}
                  />
                }
              >
                Kids
              </Menu.Item>

              <Menu.Item
                //onClick={() => handleClick()}
                key="parties"
                // icon={<UserOutlined />}
              >
                Soirée Privée
              </Menu.Item>

              <Menu.Item
                //onClick={() => handleClick()}
                key="gift"
                // icon={<UserOutlined />}
              >
                Carte Cadeau
              </Menu.Item>
            </Menu>{" "}
          </>
        ) : (
          <></>
        )}{" "}
        <Menu
          mode="horizontal"
          style={{
            position: "flex",
            justifyContent: "flex-end",
            marginLeft: props.width <= "1100" ? "43%" : "10%",
            width: "40%",
            borderBottom: "none",
          }}
          className="menu"
        >
          {JSON.parse(localStorage.getItem("connected")) == true ? (
            <>
              <Dropdown overlay={()=>menuConnexion()}>
                <Menu.Item
                  style={{ fontSize: "25px" }}
                  //onClick={() => handleClick()}
                  key="connexion"
                  icon={<UserOutlined style={{ fontSize: "90%" }} />}
                >
                  Hello, {localStorage.getItem("first_name")}{" "}
                </Menu.Item>
              </Dropdown>
            </>
          ) : (
            <Menu.Item
              style={{ fontSize: "25px" }}
              onClick={() => handleClick()}
              key="connexion"
              icon={<UserOutlined style={{ fontSize: "90%" }} />}
            >
              Compte
            </Menu.Item>
          )}
          <Menu.Item
            style={{ fontSize: "50px" }}
            onClick={() => handleCart()}
            key="cart"
            icon={<ShoppingCartOutlined style={{ fontSize: "50%" }} />}
          ></Menu.Item>
        </Menu>
      </div>

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
      {cart ? (
        <div>
          <Cart setCart={setCart} cart={cart} width={props.width} />
        </div>
      ) : (
        <></>
      )}

      <div
        id="autoc"
        style={{ position: "flex", display: "flex", justifyContent: "center" }}
      >
        <div
          id="color"
          style={{
            position: "flex",
            display: "flex",
            justifyContent: "center",
            borderRadius: "25px",
            padding: 0,
            width: "60%",
          }}
        >
          <AutoComplete
            className="dashboardSearch"
            onChange={(e) => {
              setActivity(e);
              console.log("ACTIVITYYYY...: " + e);
              console.log("ACTIVITYYYY2...: " + activity);
              //  handleSubmit();
            }}
            //prefix={props.width >= 650 ? "Quelle Expérience ?" : ""}
            style={{ width: "40%", borderRadius: "25px", border: 0 }}
            options={options}
            //defaultValue={"Risotto"}
            filterOption={(inputValue, option) =>
              option.value
                ? option.value
                    .toUpperCase()
                    .indexOf(inputValue.toUpperCase()) !== -1
                : null
            }
            // value={value}
            // onChange={handleSubmit}
          >
            <Input
              style={{
                borderRadius: "25px",
                width: "100%",
                height: "100%",
                border: 0,
              }}
              size="large"
              prefix={props.width >= 650 ? "Quelle Expérience ?" : ""}
              placeholder="Parachutisme, tricot..."
            />
          </AutoComplete>

          <AutoComplete
            className="dashboardSearch"
            onChange={(e) => {
              setCity(e);
              console.log("City...: " + e);
            }}
            style={{ width: "40%", border: 0 }}
            options={options2}
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          >
            <Input
              style={{
                borderRadius: "25px",
                width: "100%",
                height: "100%",
                border: 0,
              }}
              size="large"
              prefix={"Où?"}
              placeholder="Toulouse, Paris, Genève..."
            />
          </AutoComplete>

          <Button
            onClick={handleSubmit}
            htmlType="submit"
            style={{
              border: "none",
              width: "10%",
              height: "100%",
            }}
          >
            <SearchOutlined
              style={{
                fontSize: props.width <= "800" ? "15px" : "30px",
                color: "#FFB319",
              }}
            />
          </Button>
        </div>
      </div>
      <div> </div>
    </BrowserView>
  );
};

export default MenuBrowser;
