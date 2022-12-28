import React, { useState, useEffect } from "react";
import Icon from "@ant-design/icons";
import { Affix, Menu } from "antd";
import "./style/review.css";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate, withRouter, useSearchParams } from "react-router-dom";
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

const MenuActivity = (props) => {
  const [searchParams, setSearchParams] = useSearchParams({});
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
  const [activity, setActivity] = useState("");
  const [menuArt, setMenuArt] = useState(false);
  const [city, setCity] = useState("");
  const [datemax, setDatemax] = useState(null);
  const navigate = useNavigate();
  const cat = (cat) => {
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
    console.log("Activité " + dayjs(props.date_max).format("DD/MM/YYYY"));

    setActivity(props.activity);
    console.log("Activité " + props.activity);
    cat(props.activity);
    setCity(props.city);
    setDatemax(props.date_max);
  }, [props]);

  const goToPosts = () =>
    navigate({
      pathname: "/search/",
      search: `?${searchParams}`,
    });
  let query = "";
  const handleSubmit = (activi) => {
    //  console.log("Received values of form: " + activity + city);

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
  return (
    <>
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
                  handleSubmit(1);
                  setMenuArt(true);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={sculpture}
                        height={30}
                        style={{
                          marginTop: "-20px",
                          // margin: "0 7px 0 0",
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
                Arts Plastiques
              </Menu.Item>

              <Menu.Item
                onClick={() => {
                  //setActivity(9);
                  handleSubmit(9);
                }}
                // key="mail"
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={board}
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
                Jeux
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  handleSubmit(4);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={drill}
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
                Bricolage
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity(11);
                  handleSubmit(11);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={eiffel}
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
                Tours et circuits
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  //setActivity(6);
                  handleSubmit(6);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={museum}
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
                Culture
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  //setActivity(5);
                  handleSubmit(5);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={noodles}
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
                Culinaire
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  //setActivity(3);
                  handleSubmit(3);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={sewing}
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
                Loisirs Créatifs
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  //setActivity(10);
                  handleSubmit(10);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={spa}
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
                Beauté et bien-être
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  //setActivity(8);
                  handleSubmit(8);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={sport}
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
                Sports
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity(2);
                  handleSubmit(2);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={theatre}
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
                Arts de scène
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  // setActivity(2);
                  //  handleSubmit(2);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={france}
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
                Activités Terroir
              </Menu.Item>
              <Menu.Item
                onClick={() => {
                  //setActivity(7);
                  handleSubmit(7);
                }}
                icon={
                  <Icon
                    component={() => (
                      <img
                        src={translation}
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
                Linguistiques
              </Menu.Item>
            </Menu>{" "}
          </div>
        </div>
      </Affix>
    </>
  );
};

export default MenuActivity;
