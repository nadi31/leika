import React, {
  useState,
  useSyncExternalStore,
  useCallback,
  useEffect,
  useRef,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

import Autocomplete, { usePlacesWidget } from "react-google-autocomplete";

import locale from "antd/es/date-picker/locale/fr_FR";

//import frFR from "antd/lib/locale-provider/fr_FR";
import Menu2 from "./Menu2";
import MenuKids2 from "./MenuKids2";
import MenuTeamBuilding from "./MenuTeam2";

import gift from "./gift.png";
import {
  RocketOutlined,
  ExperimentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useNavigate, withRouter, useSearchParams } from "react-router-dom";
import { browserHistory } from "react-router";
import Icon from "@ant-design/icons";
import { BrowserView, MobileView } from "react-device-detect";
import {
  Avatar,
  Badge,
  Space,
  Menu,
  Breadcrumb,
  Tag,
  Affix,
  Button,
  Input,
  AutoComplete,
  Carousel,
  DatePicker,
  Image,
  Dropdown,
} from "antd";
//import "antd/dist/antd.css";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  SearchOutlined,
  SmileTwoTone,
} from "@ant-design/icons";
import Connexion from "./Connexion";
import Cart from "./Cart";
import logo2 from "./maory.png";
import para from "./para.jpg";
import couture from "./couture.jpg";
import kart from "./kart.jpg";
import loop from "./loop.mp4";
import kidIcon from "./kids.png";
import separator from "./separator.png";
//import Form from "antd/lib/form/Form";
import Results from "./Results";
import { typeOf } from "react-responsive";

import dayjs from "dayjs";
import MenuMobile from "./MenuMobile";

//Panier shopping

const MenuBrowser = (props) => {
  const { userData } = useAuth();
  const { logout } = useAuth();
  const inputRef = useRef(null);
  const antInputRef = useRef(null);
  const [data, setData] = useState([]);
  const [categoryFinale, setCategoryFinale] = useState(null);
  const [kids, setKids] = useState(false);
  const [team, setTeam] = useState(false);
  const [results, setResults] = useState([]);
  const [menuSciences, setMenuSciences] = useState(false);
  const [menuStage, setMenuStage] = useState(false);
  const [menuArt, setMenuArt] = useState(false);
  const [display, setDisplay] = useState(false);
  const [cubConnect, setCubConnect] = useState(false);
  const [giverConnect, setGiverConnect] = useState(false);
  const [connected, setConnected] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [datemax, setDatemax] = useState(null);
  const [top, setTop] = useState(10);
  const [menuConnected, setMenuConnected] = useState(null);
  //const [menuArt, setMenuArt] = useState(false);
  const [menuGames, setMenuGames] = useState(false);
  const [menuDrill, setMenuDrill] = useState(false);
  const [menuTour, setMenuTour] = useState(false);
  const [menuCulture, setMenuCulture] = useState(false);
  const [menuCuisine, setMenuCuisine] = useState(false);
  const [menuDIY, setMenuDIY] = useState(false);
  const [menuBeauty, setMenyBeauty] = useState(false);
  const [menuSports, setMenuSports] = useState(false);
  const [menuTheatre, setMenuTheatre] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [city, setCity] = useState("");
  const antRef = useRef(null);

  /*const { ref: antRef } = usePlacesWidget({
    apiKey: "AIzaSyDNvRrdKaNa67E4OFRsZGsmrbpqsQLUAUM",
    defaultValue: "Paris",
    onPlaceSelected: (place) => {
      console.log(place.formatted_address);
      setCity(place.formatted_address);
    },

    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "fr" },
    },
  });*/
  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue && event.nativeEvent.inputType === "insertText") {
      console.log("Input value:", inputValue);
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log("Enter key pressed");

      setCity(event.target.value);
      handleSubmit(event.target.value, null);
    }
  };

  useEffect(() => {
    console.log("Activité " + dayjs(props.date_max).format("DD/MM/YYYY"));
    setKids(props.kids);
    setTeam(props.team);
    let acti;
    props.activity
      ? (acti =
          props.activity.charAt(0).toUpperCase() + props.activity.slice(1))
      : (acti = "");
    //  const acti =
    //
    setActivity(props.activity);
    // setActivity(activity.);
    console.log("Activité " + props.activity);
    cat(props.activity);
    setCity(props.city);
    setDatemax(props.date_max);
    setActivity(acti);
    setData(JSON.parse(localStorage.getItem("cart") || "[]"));
    setTotalQuantity(JSON.parse(localStorage.getItem("totalQuantity") || 0));
    const storageEventHandler = () => {
      let tot = 0;
      console.log("hi from storageEventHandler from the MenuBrowser");
      // let itemsOrdered = refactorizedData();
      const storedData = JSON.parse(localStorage.getItem("cart") || "[]");
      setData(storedData);
      storedData.forEach(({ seats }) => {
        tot += seats;
      });

      setTotalQuantity(tot);
      localStorage.setItem("totalQuantity", JSON.stringify(tot));
    };
    window.addEventListener("storage", storageEventHandler);
  }, [props]);

  const cat = (cat) => {
    setMenuConnected(true);

    switch (cat) {
      case "Arts plastiques" || 1:
        setMenuArt(true);
        break;
      case "Arts de scène" || 2:
        setMenuTheatre(true);
        break;
      case "Loisirs creatifs" || 3:
        setMenuDIY(true);
        break;
      case "Sport" || 8:
        setMenuSports(true);
        break;
      case "Professionnel" || 4:
        console.log("HERE");
        setMenuDrill(true);
        break;
      case "Culinaire" || 5:
        setMenuCuisine(true);
        break;
      case "Culture" || 6:
        setMenuCulture(true);
        break;
      case "Beauté et Bien-être":
        setMenyBeauty(true);
        break;
      case "Linguistique" || 7:
        setMenuLanguage(true);
        break;

      case "Jeux" || 9:
        setMenuGames(true);
        break;

      case "Tours, Circuits, Expériences" || 11:
        setMenuTour(true);
        break;

      default:
        //  setCategoryFinale(cat);
        break;
    }
  };

  useEffect(() => {
    console.log("activated");
  }, [city]);
  const handlePlaceSelected = (place) => {
    if (place && place.formatted_address) {
      console.log(place.formatted_address);
      setCity(place.formatted_address);
    }
  };

  let history = useNavigate();

  let query = "";

  const slider = useRef(null);
  const navigate = useNavigate();

  const authLogOut = () => {
    logout();

    window.dispatchEvent(new Event("Déconnexion"));
  };
  const goToPosts = () =>
    navigate({
      pathname: "/search/",
      search: `?${searchParams}`,
    });
  const handleSubmit = (city, activi) => {
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
    switch (activi) {
      case 1:
        // setMenuArt(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 1);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "1";
        break;
      case 2:
        //setMenuTheatre(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 2);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "2";
        break;
      case 3:
        //  setMenuDIY(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 3);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "3";
        break;
      case 5:
        setMenuCuisine(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 5);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "5";
        break;
      case 6:
        // setMenuCulture(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 6);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "6";
        break;
      case 9:
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 9);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "9";
        break;
      case 7:
        // setMenuLanguage(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 7);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "7";
        break;
      case 11:
        setMenuTour(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 11);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "11";
        break;
      case 4:
        // setMenuDrill(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 4);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "4";
        break;
      case 8:
        // setMenuSports(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 8);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "8";
        break;
      case 10:
        // setMenyBeauty(true);
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("category", 10);
        searchParams.delete(["sub_category"]);
        query = query + "&category=" + "10";
        break;
      case "":
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        searchParams.set("sub_category", "");
        searchParams.delete(["category"]);
        delete searchParams["category"];
        break;
      case undefined:
        searchParams.delete(["city"]);
        searchParams.delete(["date_max"]);
        query = query + "&sub_category=";
        searchParams.set("sub_category", "");
        searchParams.delete(["category"]);
        delete searchParams["category"];
        break;
      default:
        break;
    }

    if (city !== null && typeof city !== "undefined") {
      searchParams.set("city", city);
    }
    if (datemax !== null && typeof datemax !== "undefined") {
      searchParams.set("date_max", datemax);
    }
    console.log("SEARCH " + searchParams);
    //setSearchParams(searchParams);

    goToPosts();

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
    <>
      <BrowserView>
        <div
          style={{
            zIndex: "2",
            position: "flex",
            justifyContent: "space-evenly",
            display: "flex",
            width: "90%",
            maxHeight: props.width <= "1100" ? "150px" : "80px",
          }}
        >
          {" "}
          <a href={"/"}>
            <div
              style={{
                background: "white", //varies height for mobile...
                height: "192%",
                width: "130%",
              }}
            >
              <img
                style={{
                  justifyContent: "left",
                  width: "120%",
                  marginTop: "2%",
                  marginLeft: "20%",
                }}
                id="img_logo_desktop"
                src={logo2}
                alt="logo"
              ></img>
            </div>
          </a>
          <>
            <Menu
              mode="horizontal"
              className="menu"
              name="menu_elements"
              style={{
                width: "60%",
                borderBottom: "none",
                display: "flex",
                justifyContent: "center",
                color: "#070C65",
                fontSize: props.width <= "1400" ? "15px" : "27px",
              }}
            >
              <Menu.Item
                id="kids"
                style={{ color: "rgb(7, 12, 101)" }}
                onClick={() => {
                  navigate("../kids", { replace: true });

                  setKids(true);
                }}
                key="kids"
                icon={
                  <Image
                    src={kidIcon}
                    preview={false}
                    style={{ width: "20px", bottom: "0" }}
                  />
                }
              >
                Kids
              </Menu.Item>

              <Menu.Item
                style={{ color: "rgb(7, 12, 101)" }}
                key="kids"
                onClick={() => {
                  navigate("../kids", { replace: true });

                  setKids(true);
                }}
                icon={
                  <Image
                    src={separator}
                    preview={false}
                    style={{ width: "30px", bottom: "0" }}
                  />
                }
              ></Menu.Item>

              <Menu.Item
                style={{ color: "rgb(7, 12, 101)" }}
                onClick={() => {
                  navigate("../team", { replace: true });
                  setTeam(true);
                }}
                key="team"
              >
                Team Building
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  navigate("../team", { replace: true });
                  setTeam(true);
                }}
                style={{ color: "rgb(7, 12, 101)" }}
                key="team"
                icon={
                  <Image
                    src={separator}
                    preview={false}
                    style={{ width: "30px", bottom: "0" }}
                  />
                }
              ></Menu.Item>

              <Menu.Item
                style={{ color: "rgb(7, 12, 101)" }}
                onClick={() => {
                  navigate("../gift", { replace: true });
                }}
                key="gift"
              >
                Carte Cadeau
              </Menu.Item>
            </Menu>{" "}
          </>
          <Menu
            mode="horizontal"
            style={{
              borderBottom: "none",
            }}
            className="menu"
          >
            {userData ? (
              <>
                <Dropdown
                  trigger={["click"]}
                  overlay={() => (
                    <Menu>
                      {userData.user_type === 1 ? (
                        <Menu onClick={(e) => handleMenuConnexionAdmin(e)}>
                          <Menu.Item key="1">Créer un giver</Menu.Item>
                          <Menu.Item key="2">Créer une expérience</Menu.Item>
                          <Menu.Item key="3">Modifier une expérience</Menu.Item>
                          <Menu.Item key="4">Se déconnecter</Menu.Item>
                          <Menu.Item key="5">Cours à vérifier</Menu.Item>
                        </Menu>
                      ) : userData.user_type === 2 ? (
                        <Menu onClick={(e) => handleMenuConnexionCub(e)}>
                          <Menu.Item key="1">Mes commandes</Menu.Item>
                          <Menu.Item key="2">Mon profil</Menu.Item>
                          <Menu.Item key="3">Se déconnecter</Menu.Item>
                        </Menu>
                      ) : userData.user_type === 3 ? (
                        <Menu onClick={(e) => handleMenuConnexionGiver(e)}>
                          <Menu.Item key="1">Créer un cours</Menu.Item>
                          <Menu.Item key="2">Modifier un cours </Menu.Item>
                          <Menu.Item key="3">Mon Compte </Menu.Item>
                          <Menu.Item key="6">Réservations </Menu.Item>
                          <Menu.Item key="5">Se déconnecter</Menu.Item>
                        </Menu>
                      ) : null}
                    </Menu>
                  )}
                >
                  <Menu.Item
                    style={{ fontSize: "25px", color: "rgb(7, 12, 101)" }}
                    //onClick={() => handleClick()}
                    key="connexion"
                    icon={<UserOutlined style={{ fontSize: "90%" }} />}
                  >
                    Hello {userData.firstName}
                  </Menu.Item>
                </Dropdown>
              </>
            ) : (
              <Menu.Item
                style={{ fontSize: "25px", color: "rgb(7, 12, 101)" }}
                onClick={() => handleClick()}
                key="connexion"
                icon={<UserOutlined style={{ fontSize: "90%" }} />}
              >
                Compte
              </Menu.Item>
            )}
            <Menu.Item
              style={{ fontSize: "25px", color: "rgb(7, 12, 101)" }}
              onClick={() => handleCart()}
              key="cart"
              icon={
                <Badge count={totalQuantity}>
                  <ShoppingCartOutlined style={{ fontSize: "180%" }} />
                </Badge>
              }
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
          style={{
            position: "flex",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            id="color"
            style={{
              position: "flex",
              display: "flex",
              //justifyContent: "center",
              borderRadius: "25px",
              padding: 0,
              width: "60%",
              marginTop: "2%",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "70%",
                display: "flex",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  color: "#070C65",
                  position: "absolute",
                  left: "10px",
                  fontFamily: "Dosis",
                }}
              >
                Où?
              </span>
              <Autocomplete
                apiKey={"AIzaSyDNvRrdKaNa67E4OFRsZGsmrbpqsQLUAUM"}
                style={{
                  borderRadius: "25px",
                  marginLeft: "30px",
                  width: "70%",
                  height: "100%",
                  color: "#999",
                  border: 0,
                  fontFamily: "Dosis",
                  padding: "0 10px", // Adjust padding as needed
                }}
                onPlaceSelected={handlePlaceSelected}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "fr" },
                }}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
                //onKeyDown={handleKeyPress}
                // defaultValue="Paris, Toulouse..."
              />
            </div>
            {/*<AutoComplete
              className="dashboardSearch"
              onChange={(e) => {
                setActivity(e);
                console.log("ACTIVITYYYY...: " + e);
                console.log("ACTIVITYYYY2...: " + activity);
                //  handleSubmit();
              }}
              defaultValue={props.activity}
              //prefix={props.width >= 650 ? "Quelle Expérience ?" : ""}
              style={{ width: "30%", borderRadius: "25px", border: 0 }}
              options={options}
              //defaultValue={"Risotto"}
              filterOption={(inputValue, option) =>
                option.value
                  ? option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  : null
              }

              // onChange={handleSubmit}
            >
              <Input
                style={{
                  borderRadius: "25px",
                  width: "100%",
                  height: "100%",
                  border: 0,
                  fontFamily: "Dosis",
                }}
                size="large"
                // defaultValue={activity}
                prefix={props.width >= 650 ? "Quelle Expérience ?" : ""}
                placeholder="Parachutisme, tricot..."
              />
            </AutoComplete>*/}
            {/* 
            
            //google
            
            <Input
              ref={(c) => {
                antInputRef.current = c;
                if (c) antRef.current = c.input;
              }}
              style={{
                borderRadius: "25px",
                width: "70%",
                height: "100%",
                border: 0,
                fontFamily: "Dosis",
              }}
              size="large"
              prefix={"Où?"}
              placeholder="Toulouse, Paris, Genève..."
              onPressEnter={handleSubmit}
            />*/}
            {/*  <AutoComplete
              className="dashboardSearch"
              onChange={(e) => {
                setCity(e);
                console.log("City...: " + e);
              }}
              defaultValue={props.city}
              style={{ width: "50%", border: 0 }}
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
                  fontFamily: "Dosis",
                }}
                size="large"
                prefix={"Où?"}
                placeholder="Toulouse, Paris, Genève..."
              />
            </AutoComplete> */}
            <div
              style={{
                width: "10%",
                paddingTop: "1%",
                fontSize: "16px",
                color: "#070C65",
              }}
              className="dashboardSearch"
            >
              Quel jour?{" "}
            </div>
            <DatePicker
              locale={locale}
              style={{ width: "50%", paddingTop: "" }}
              // defaultValue={}
              placeholder={["Sélectionner le jour"]}
              // showTime

              defaultValue={
                props.date_max
                  ? dayjs(props.date_max, "DD/MM/YYYY").format("YYYY-MM-DD")
                  : undefined
              }
              format="DD/MM/YYYY"
              onChange={(newDate) => {
                if (newDate) {
                  // console.log(dayjs(newDate, "DD/MM/YYYY").format("YYYY-MM-DD"));
                  setDatemax(dayjs(newDate, "DD/MM/YYYY").format("YYYY-MM-DD"));
                } else setDatemax(undefined);
              }}
            ></DatePicker>
            <Button
              onClick={() => {
                handleSubmit(city, null);
              }}
              htmlType="submit"
              style={{
                border: "none",
                width: "8%",
                height: "90%",
                padding: 0,
                marginRight: "2%",
              }}
            >
              <SearchOutlined
                style={{
                  fontSize: props.width <= "800" ? "14px" : "27px",
                  color: "#FF8A65",
                  width: "50%",
                }}
              />
            </Button>
          </div>
        </div>
        <br />
        {team ? (
          <MenuTeamBuilding />
        ) : kids ? (
          <MenuKids2 activity={activity} date_max={datemax} city={city} />
        ) : (
          <Menu2 activity={activity} date_max={datemax} city={city} />
        )}
        <div style={{ marginLeft: "10%" }}>
          {searchParams.get(["date_max"]) ? (
            <Tag
              onClose={() => {
                setDatemax("");

                searchParams.delete(["date_max"]);
                goToPosts();
                window.location.reload();
              }}
              style={{
                fontSize: "18px",
                marginBottom: "1%",
                fontFamily: "Dosis",
                color: "black",
              }}
              icon=<CalendarOutlined />
              closable
              color="#f7b526"
            >
              {dayjs(searchParams.get(["date_max"])).format("DD/MM/YYYY")}
            </Tag>
          ) : (
            <></>
          )}
          {activity ? (
            <Tag
              onClose={() => {
                searchParams.delete(["category"]);
                searchParams.delete(["sub_category"]);
                goToPosts();
                window.location.reload();

                setMenuConnected(false);
              }}
              style={{
                fontSize: "18px",
                marginBottom: "1%",
                fontFamily: "Dosis",
                color: "black",
              }}
              icon={<ExperimentOutlined />}
              closable
              color="#f7b526"
            >
              {activity}
            </Tag>
          ) : null}
          {props.city ? (
            <Tag
              onClose={() => {
                searchParams.delete(["city"]);
                goToPosts();
                window.location.reload();
              }}
              style={{
                fontSize: "18px",
                marginBottom: "1%",
                fontFamily: "Dosis",
                color: "black",
              }}
              icon=<RocketOutlined />
              closable
              color="#f7b526"
            >
              {props.city}
            </Tag>
          ) : null}

          {menuBeauty && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  <a href="">Spa </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>Massage</Breadcrumb.Item>{" "}
                <Breadcrumb.Item>Cosmétique</Breadcrumb.Item>{" "}
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuArt && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Calligraphie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Calligraphie{" "}
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Dessin");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Dessin
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Photographie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Photographie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Sculpture");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Sculpture
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Peinture");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Peinture
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Poterie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Poterie
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Vitraux");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Vitraux
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuSciences && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Informatique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Informatique
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Astronomie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Astronomie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Biologie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Biologie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Nature");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Nature
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Physique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Physique
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Maths");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Maths
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuGames && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Accrobranche");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Accrobranche
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Airsoft");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Airsoft
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Escape Games");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Escape Games
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Laser Games");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Laser Games
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Paintball");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Paintball
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Jeux de société");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Jeux de société
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Jeux vidéo");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Jeux vidéo
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuSciences && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Informatique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Informatique
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Astronomie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Astronomie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Biologie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Biologie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Nature");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Nature
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Physique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Physique
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Maths");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Maths
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuSciences && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Informatique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Informatique
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Astronomie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Astronomie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Biologie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Biologie
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Nature");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Nature
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Physique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Physique
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Maths");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Maths
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}

          {menuTheatre && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Danse");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Danse
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Improvisation");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Improvisation
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Musique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Musique
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Scénographie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Scénographie
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Théatre");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Théatre
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuDIY && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Bijoux");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Bijoux
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Composition Florale");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Composition Florale
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Crochet");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Crochet
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Couture");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Couture
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Modélisme");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Modélisme
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Stylisme");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Stylisme
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Travail du bois");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Travail du bois
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Travail du métal");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Travail du métal
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Travail du verre");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Travail du verre
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Tricot");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Tricot
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuCuisine && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Cours de cuisine");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Cours de cuisine
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Dégustation");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Dégustation
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set(
                        "sub_category",
                        "Fabrication de boisson"
                      );
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Fabrication de boisson
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Pâtisserie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Pâtisserie
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuCulture && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Cinéma");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Cinéma
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Concert");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Concert
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Musée");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Musée
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Opéra");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Opéra
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Philosophie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Philosophie
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Spiritualité");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Spiritualité
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuLanguage && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Anglais");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Anglais
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Arabe");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Arabe
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Chinois");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Chinois
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Espagnol");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Espagnol
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Japonais");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Japonais
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Portuguais");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Portuguais
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>Russe</Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuTour && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Apiculture");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Apiculture
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Aquarium");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Aquarium
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Balade en bateau");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Balade en bateau
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Balade à cheval");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Balade à cheval
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Cirque");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Cirque
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Fermes");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Fermes
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Magie");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Magie
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Maison Hantées");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Maisons hantées
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Randonnées");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Randonnées
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Zoo");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Zoo
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuDrill && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Beauté");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Beauté
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Bricolage");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Bricolage
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Communication");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Communication
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Gestion");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Gestion
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Jardinage");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Jardinage
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Logiciels");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Logiciels
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Management");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Management
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Médecine douce");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Médecine douce
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Mode");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Mode
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Premiers secours");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Premiers Secours
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Programmation");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Programmation
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Rédaction");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Rédaction
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
          {menuSports && menuConnected ? (
            <>
              <Breadcrumb
                separator="|"
                style={{
                  width: "100%",
                  //  marginLeft: "17%",
                  // paddingLeft: "18%",
                  marginBottom: "3%",
                  fontFamily: "Dosis",
                  border: "none",

                  fontSize: "16px",
                  // color: "gray",
                }}
              >
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Aéronautiques");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Aéronautiques
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Badminton");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Badminton
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Basket");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Basket
                  </a>
                </Breadcrumb.Item>{" "}
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Boxe");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Boxe
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Crossfit");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Crossfit
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Escalade");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Escalade
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Fitness");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Fitness
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Football");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Football
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Golf");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Golf
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Handball");
                      searchParams.delete(["Handball"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Handball
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Karting");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Karting
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Montgolfiere");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Montgolfiere
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Moto");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Moto
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Natation");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Natation
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Parachutisme");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Parachutisme
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Parapente");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Parapente
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Pilates");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Pilates
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Saut à l'élastique");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Saut à l'élastique
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Sport de combat");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Sport de combat
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Tennis");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Tennis
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Yoga");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Yoga
                  </a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                  {" "}
                  <a
                    onClick={() => {
                      searchParams.set("sub_category", "Zumba");
                      searchParams.delete(["category"]);
                      goToPosts();
                      window.location.reload();
                    }}
                  >
                    Zumba
                  </a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </>
          ) : (
            <></>
          )}
        </div>
        <div> </div>
      </BrowserView>
    </>
  );
};

export default MenuBrowser;
