import React, { useState, useEffect, useRef } from "react";
import { ConfigProvider } from "antd";

//import frFR from "antd/lib/locale/fr_FR";
//import MediaQuery from 'react-responsive';
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Menu, Button, Input, AutoComplete, Layout } from "antd";
import Menu2 from "./Menu2";
import { SearchOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import MenuMobile from "./MenuMobile";
import axios from "axios";
import logo2 from "./leika_logo2.png";
import Cart from "./Cart";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import board from "./board.png";
import france from "./france.png";
import drill from "./drill.png";
import eiffel from "./eiffel.png";
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
import kart from "./kart.jpg";
import loop from "./loop.mp4";
import kids from "./kids.png";
import MenuBrowser from "./MenuBrowser";
import { useNavigate, withRouter, useSearchParams } from "react-router-dom";
import Results from "./Results";
import MenuKids2 from "./MenuKids2";
import MenuTeam2 from "./MenuTeam2";
const HomeMobile = (props) => {
  const navigate = useNavigate();
  const goToPosts = () =>
    navigate({
      pathname: "/search/",
      search: `?${searchParams}`,
    });
  const options2 = [
    { value: "Toulouse" },
    { value: "Paris" },
    { value: "Genève" },
  ];
  const [menuGames, setMenuGames] = useState(false);
  const [menuDrill, setMenuDrill] = useState(false);
  const [menuTour, setMenuTour] = useState(false);
  const [menuCulture, setMenuCulture] = useState(false);
  const [menuCuisine, setMenuCuisine] = useState(false);
  const [menuDIY, setMenuDIY] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [menuBeauty, setMenyBeauty] = useState(false);
  const [menuSports, setMenuSports] = useState(false);
  const [menuTheatre, setMenuTheatre] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState(false);
  const [menuConnected, setMenuConnected] = useState(null);
  const [menuArt, setMenuArt] = useState(false);
  useEffect(() => {
    console.log("Activité " + dayjs(props.date_max).format("DD/MM/YYYY"));
    setKids(props.kids);
    setTeam(props.team);
    setActivity(props.activity);
    console.log("Activité " + props.activity);
    cat(props.activity);
    setCity(props.city);
    setDatemax(props.date_max);
  }, [props]);
  const handleSubmit = () => {
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
  };
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
  const [activity, setActivity] = useState("");
  const [datemax, setDatemax] = useState(null);
  const [city, setCity] = useState("");
  const [width, setWidth] = useState(window.innerWidth);
  const [kids, setKids] = useState(false);
  const [team, setTeam] = useState(false);
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }
  const [courseList, setCourseList] = useState([]);
  const [cart, setCart] = useState(false);
  const [results, setResults] = useState([]);
  const { Sider } = Layout;
  const ref = useRef(null);
  const { Meta } = Card;
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  const handleCart = () => {
    setCart(true);
  };
  //6 activités à mettre en valeur

  return (
    <div style={{}}>
      <MenuMobile />
      <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <div
          id="color"
          style={{
            display: "flex",

            borderRadius: "25px",
            padding: 0,
            width: "80%",
            // alignContent: "center",
          }}
        >
          <AutoComplete
            className="dashboardSearch"
            onChange={(e) => {
              setCity(e);
              console.log("City...: " + e);
            }}
            defaultValue={props.city}
            style={{ width: "100%", border: 0 }}
            options={options2}
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
          </AutoComplete>

          <Button
            onClick={handleSubmit}
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
                color: "#FFB319",
                width: "50%",
              }}
            />
          </Button>
        </div>
      </div>
      {props.team ? (
        <MenuTeam2 activity={activity} date_max={datemax} city={city} />
      ) : props.kids ? (
        <MenuKids2 activity={activity} date_max={datemax} city={city} />
      ) : (
        <Menu2 activity={activity} date_max={datemax} city={city} />
      )}
    </div>
  );
};

export default HomeMobile;
