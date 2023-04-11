/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef, useCallback } from "react";

import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate, withRouter } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";
import { GoogleMap, MarkerF, LoadScript } from "@react-google-maps/api";
import {
  CheckCircleTwoTone,
  HeartTwoTone,
  SmileTwoTone,
} from "@ant-design/icons";
import Geocode from "react-geocode";
import Map from "./Map"; // import the map here

import Maps from "./Maps"; // import the map here
import euros from "./euros.png";
import ageImage from "./age.png";
import levelImage from "./level.png";
import friends from "./friends.png";
import handi from "./handi.png";
import free from "./fre.png";
import locationImage from "./locationImage.png";
import Icon, { RocketOutlined, ExperimentOutlined } from "@ant-design/icons";
import {
  Card,
  Slider,
  Form,
  Menu,
  Tag,
  Breadcrumb,
  InputNumber,
  Cascader,
  Switch,
  Button,
  Modal,
} from "antd";
import dancee from "./star.png";
import experience from "./experience.png";
import dayjs from "dayjs";

import MenuBrowser from "./MenuBrowser";

import axios from "axios";
import Footer from "./Footer";
import queryString from "query-string";
import { filter } from "lodash";
import MenuMobile from "./MenuMobile";
import HomeMobile from "./HomeMobile";
const Results = () => {
  const [menuArt, setMenuArt] = useState(false);
  const [menuGames, setMenuGames] = useState(false);
  const [menuDrill, setMenuDrill] = useState(false);
  const [menuTour, setMenuTour] = useState(false);
  const [menuCulture, setMenuCulture] = useState(false);
  const [menuCuisine, setMenuCuisine] = useState(false);
  const [menuDIY, setMenuDIY] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [menuBeauty, setMenyBeauty] = useState(false);
  const [menuSports, setMenuSports] = useState(false);
  const [menuTheatre, setMenuTheatre] = useState(false);
  const [menuLanguage, setMenuLanguage] = useState(false);
  const level = useRef("");
  const filterAge = useRef("");
  const [results, setResults] = useState([]);
  const [req, setReq] = useState(null);
  const [range, setRange] = useState(null);
  const [resFilters, setResFilters] = useState(null);
  const [prix, setPrix] = useState(null);
  const seats = useRef(1);
  const [res, setRes] = useState([]);
  const filters = useRef(res);
  const isRemote = useRef(false);
  const prix_min = useRef(0);
  const lonCity = useRef(null);
  const latCity = useRef(0);
  const classt = useRef(0);
  const prix_max = useRef(600);
  const isFree = useRef(false);
  const [resultForm, setResultForm] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);
  const [activity, setActivity] = useState(null);
  const [city, setCity] = useState(null);
  const [datemax, setDatemax] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [resultsMap, setResultsMap] = useState([]);
  const [value, setValue] = useState(false);

  const [years, setYears] = useState("");
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isIntermediate, setIsIntermediate] = useState(false);
  const accessible = useRef(false);
  const [isBeginner, setIsBeginner] = useState(false);
  const [price, setPrice] = useState([0, 600]);
  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: "poly",
  };
  const loc = {
    address: "1600 Amphitheatre Parkway, Mountain View, california.",
    lat: 37.42216,
    lng: -122.08427,
  }; // our location object from earlier
  const handleValue = () => {
    setValue(!value);
    filters.current = res;
    console.log("FILTERS INIT " + filters);
    console.log("VALUE FINALE!!!! " + value);
    filtering();
  };
  const classement = [
    { value: 1, label: "Prix: du moins cher au plus cher" },
    { value: 2, label: "Prix: du plus cher au moins cher " },
    { value: 3, label: "Recommandés" },
  ];
  const options = [
    { value: "isBeginner", label: "Débutant" },

    { value: "isIntermediate", label: "Intermédiaire" },
    { value: "isAvanced", label: "Confirmé" },
  ];
  const age = [
    { value: "Tous les âges", label: "Tous les âges" },
    { value: "Adultes", label: "Adultes" },
    { value: "Ados", label: "Ados" },
    { value: "Enfants", label: "Enfants" },
  ];
  const { Meta } = Card;
  const location = useLocation();
  const category = (intCategory) => {
    switch (intCategory) {
      case "1":
        setMenuArt(true);
        return "Arts plastiques";

      case "2":
        setMenuTheatre(true);
        return "Arts de scène";

      case "11":
        setMenuTour(true);
        return "Tours, Circuits, Expériences";

      case "3":
        setMenuDIY(true);
        return "Loisirs creatifs";

      case "4":
        setMenuDrill(true);
        return "Professionnel";

      case "5":
        setMenuCuisine(true);
        return "Culinaire";

      case "6":
        setMenuCulture(true);
        return "Culture";

      case "7":
        setMenuLanguage(true);
        return "Linguistique";

      case "8":
        setMenuSports(true);
        return "Sport";

      case "9":
        setMenuGames(true);
        return "Jeux";

      case "10":
        setMenyBeauty(true);
        return "Beauté et Bien-être";

      default:
        return intCategory;
    }
  };
  const useQuery = () => new URLSearchParams(useLocation().search);

  const request = useQuery();
  useEffect(async () => {
    if (request.get("category") == null) {
      setActivity(request.get("sub_category"));
    } else {
      setActivity(category(request.get("category")));
    }
    //const category = searchParams.get("category");

    setCity(request.get("city"));
    setDatemax(request.get("date_max"));
    //setState(JSON.stringify(props.location.state));
    //console.log("STATE " + state);
    console.log("REQUEST1 " + request);

    //console.log("REQUEST " + JSON.stringify(values));

    await axios
      .get(`http://localhost:8000/api-course/search/?&${request}`)
      .then((res2) => {
        console.log("RESULTS REQUEST" + JSON.stringify(res2.data));
        // setResults(res.data);
        if (request.get("city")) {
          const cit = request.get("city");

          const url = `https://api.geoapify.com/v1/geocode/search?text=${
            cit + " France"
          }&apiKey=ea16b50fa61c47faa5c3cd8fc43eeb44`;

          axios.get(url).then((res) => {
            lonCity.current = res.data.features[0].properties.lon;
            latCity.current = res.data.features[0].properties.lat;
            res2.data.map(async (location) => {
              var axios = require("axios");
              console.log("213 " + latCity);
              console.log("214" + location.lng + " " + location.lat);

              var data = JSON.stringify({
                mode: "drive",
                sources: [{ location: [location.lng, location.lat] }],
                targets: [
                  {
                    location: [lonCity.current, latCity.current],
                  },
                ],
              });

              var config = {
                method: "post",
                url: "https://api.geoapify.com/v1/routematrix?apiKey=ea16b50fa61c47faa5c3cd8fc43eeb44",
                headers: {
                  "Content-Type": "application/json",
                },
                data: data,
              };

              axios(config)
                .then(function (response) {
                  console.log(response.data.sources_to_targets[0][0].distance);
                  if (response.data.sources_to_targets[0][0].distance < 20000) {
                    setResults((res) => [...res, location]);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            });
          });
        } else {
          setResults(res2.data);
        }
      })

      .catch((err) => console.log(err));
  }, []);

  console.log(results.length);

  const classer = () => {
    //
    filters.current = results;
    //setResults(filters.current);
    console.log("filters 1. " + classt.current);

    if (classt.current > 0 && classt.current <= 2) {
      classt.current === 1
        ? (filters.current = filters.current.sort((a, b) => a.price - b.price))
        : (filters.current = filters.current.sort((a, b) => b.price - a.price));
    }

    console.log("2.¨¨¨¨¨¨ " + JSON.stringify(filters.current));
    setResults([...filters.current]);

    // return filters.current;
    console.log("filter 3. " + results.length);
  };
  const filtering = () => {
    filters.current = res;

    console.log("filters 1. " + filters);

    if (prix_max.current < 600 || prix_min.current > 0) {
      filters.current = filters.current.filter((data) => {
        // console.log("WOW " + data.age);
        return data.price > prix_max.current && data.price < prix_min.current;
      });
    }
    if (seats.current > 1) {
      filters.current = filters.current.filter((data) => {
        // console.log("WOW " + data.age);
        return data.seats > seats.current;
      });
    }
    if (filterAge.current !== "") {
      filters.current = filters.current.filter((data) => {
        console.log("WOW " + data.age);
        return data.age === filterAge.current;
      });
    }
    if (isRemote.current === true) {
      //  console.log("*** VALUE" + value);

      filters.current = filters.current.filter((data) => {
        return data.isRemote === true;
      });

      console.log("filter 3. " + filters);
    }

    if (level.current !== "") {
      console.log("level 2. " + level.current);

      switch (level.current) {
        case "isBeginner":
          console.log("HERE**************** LEVEL1");
          filters.current = filters.current.filter((data) => {
            return data.isBeginner === true;
          });
          break;
        case "isIntermediate":
          filters.current = filters.current.filter((data) => {
            return data.isIntermediate === true;
          });
          break;
        case "isAvanced":
          filters.current = filters.current.filter((data) => {
            return data.isAdvanced === true;
          });
          break;
        default:
          break;
      }
    }

    //   console.log("1. FILTERS" + res);
    // let bouhou = res;
    if (accessible.current === true) {
      console.log("***CACCES" + JSON.stringify(res));

      filters.current = filters.current.filter((data) => {
        return data.accessible === true;

        //return data.accessible === true;
      });
      // filters.current = bouhou;
      console.log("TRUE" + filters.current);

      //   accessible.current = false;
      // setResults(filters.current);
      //setValue(false);
      console.log(
        "filter 2. " + results + "=>" + JSON.stringify(filters.current)
      );
    }
    if (isFree.current === true) {
      console.log("***");

      filters.current = filters.current.filter((data) => {
        return data.price === 0.0;

        //return data.accessible === true;
      });
      // filters.current = bouhou;
      console.log("TRUE" + filters.current);

      //   accessible.current = false;
      // setResults(filters.current);
      //setValue(false);
      console.log(
        "filter 2. " + results + "=>" + JSON.stringify(filters.current)
      );
    }
    setResults(filters.current);
    //setResultsMap(filters.current);
    console.log("filter 3. " + results);
  };

  if (results !== []) {
    return (
      <>
        {width > 800 ? (
          <MenuBrowser
            width={width}
            city={city}
            datemax={datemax}
            activity={activity}
            style={{ zIndex: "2" }}
          />
        ) : (
          <HomeMobile />
        )}
        <div key={activity} style={{ width: "100%", display: "inline-block" }}>
          <div style={{ display: "flex" }}>
            {" "}
            <Modal
              open={isVisible}
              onOk={() => setIsVisible(false)}
              //destroyOnClose={true}
              onCancel={() => setIsVisible(false)}
            >
              <Form style={{ width: "100%", marginTop: "3%" }}>
                <h3
                  style={{
                    color: "grey",
                    marginTop: "-1%",
                    //marginLeft: "%",
                    textDecoration: "underline",
                  }}
                >
                  Filtres
                </h3>
                <>
                  <> </>
                  <Form.Item
                    label={
                      <>
                        <Icon
                          style={{ width: "90%", height: "90%" }}
                          component={() => (
                            <img
                              style={{
                                width: "90%",
                                height: "90%",
                                marginRight: "50%",
                              }}
                              src={euros}
                            />
                          )}
                        />
                        {"  Prix  "}
                      </>
                    }
                  >
                    <Slider
                      range
                      max={600}
                      step={10}
                      //style={{ color: "black" }}
                      defaultValue={[0, 600]}
                      onChange={(prix) => {
                        prix_max.current = prix[0];
                        prix_min.current = prix[1];
                        filtering();
                      }}
                    />
                  </Form.Item>
                </>

                <Form.Item
                  name="seats"
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={friends}
                          />
                        )}
                      />
                      {"  Places  "}
                    </>
                  }
                >
                  <InputNumber
                    defaultValue={1}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      seats.current = e;
                      filtering();
                    }}
                    min={0}
                    max={1000}
                  />
                </Form.Item>

                <Form.Item
                  name="cascader_age"
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={ageImage}
                          />
                        )}
                      />
                      {"  Age  "}
                    </>
                  }
                >
                  <Cascader
                    //defaultValue={"Tous les âges"}
                    // value={this.state.input}
                    onChange={(e) => {
                      e !== undefined
                        ? (filterAge.current = e[0])
                        : (filterAge.current = "");
                      filtering();
                    }}
                    //style={{ width: 300 }}
                    options={age}
                    placeholder="Sélectionner l'âge"
                  />
                </Form.Item>
                <Form.Item
                  name="cascader_level"
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={levelImage}
                          />
                        )}
                      />
                      {"  Niveau  "}
                    </>
                  }
                >
                  <Cascader
                    defaultValue={""}
                    onChange={(e) => {
                      e !== undefined
                        ? (level.current = e[0])
                        : (level.current = "");
                      filtering();
                    }}
                    // style={{ width: 300 }}
                    options={options}
                    placeholder="Sélectionner le niveau"
                  />
                </Form.Item>
                <Form.Item
                  name="switch_remote"
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={locationImage}
                          />
                        )}
                      />
                      {"  En ligne  "}
                    </>
                  }
                >
                  <Switch
                    //defaultValue={true}
                    onClick={() => {
                      console.log("CLICK Remote");
                      isRemote.current = !isRemote.current;
                      console.log("remote   " + isRemote.current);
                      filtering();
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="switch_handi"
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={handi}
                          />
                        )}
                      />
                      {"  Handi-Accessible  "}
                    </>
                  }
                >
                  <Switch
                    //defaultValue={true}
                    onClick={() => {
                      console.log("CLICK handi accessible");
                      accessible.current = !accessible.current;
                      console.log("acces   " + accessible.current);
                      filtering();
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name="switch_free"
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={free}
                          />
                        )}
                      />
                      {"  Gratuit  "}
                    </>
                  }
                >
                  <Switch
                    //defaultValue={true}
                    onClick={() => {
                      isFree.current = !isFree.current;
                      console.log("free   " + isFree.current);
                      filtering();
                    }}
                  />
                </Form.Item>
                {/*   <div style={{ width: "10%", height: "40%" }}>
              {results.length > 0 ? (
                <LoadScript googleMapsApiKey="AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4">
                  <Maps
                    key={JSON.stringify(results.length)}
                    locations={results}
                  />
                </LoadScript>
              ) : null}
            </div>*/}
                <div style={{ width: "50%", height: "50%", zIndex: "-1" }}>
                  {results.length > 0 &&
                  latCity.current !== 0 &&
                  lonCity.current !== 0 ? (
                    <Map
                      key={JSON.stringify(results.length)}
                      locations={results}
                      centerLat={latCity.current}
                      centerLong={lonCity.current}
                      style={{ zIndex: "-1" }}
                    />
                  ) : null}
                </div>
              </Form>
            </Modal>
            <Form style={{ width: "23%", marginTop: "3%", marginLeft: "10%" }}>
              <h3
                style={{
                  color: "grey",
                  marginTop: "-1%",
                  //marginLeft: "%",
                  textDecoration: "underline",
                }}
              >
                Filtres
              </h3>
              <>
                <> </>
                <Form.Item
                  label={
                    <>
                      <Icon
                        style={{ width: "90%", height: "90%" }}
                        component={() => (
                          <img
                            style={{
                              width: "90%",
                              height: "90%",
                              marginRight: "50%",
                            }}
                            src={euros}
                          />
                        )}
                      />
                      {"  Prix  "}
                    </>
                  }
                >
                  <Slider
                    range
                    max={600}
                    step={10}
                    //style={{ color: "black" }}
                    defaultValue={[0, 600]}
                    onChange={(prix) => {
                      prix_max.current = prix[0];
                      prix_min.current = prix[1];
                      filtering();
                    }}
                  />
                </Form.Item>
              </>

              <Form.Item
                name="seats"
                label={
                  <>
                    <Icon
                      style={{ width: "90%", height: "90%" }}
                      component={() => (
                        <img
                          style={{
                            width: "90%",
                            height: "90%",
                            marginRight: "50%",
                          }}
                          src={friends}
                        />
                      )}
                    />
                    {"  Places  "}
                  </>
                }
              >
                <InputNumber
                  defaultValue={1}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    seats.current = e;
                    filtering();
                  }}
                  min={0}
                  max={1000}
                />
              </Form.Item>

              <Form.Item
                name="cascader_age"
                label={
                  <>
                    <Icon
                      style={{ width: "90%", height: "90%" }}
                      component={() => (
                        <img
                          style={{
                            width: "90%",
                            height: "90%",
                            marginRight: "50%",
                          }}
                          src={ageImage}
                        />
                      )}
                    />
                    {"  Age  "}
                  </>
                }
              >
                <Cascader
                  //defaultValue={"Tous les âges"}
                  // value={this.state.input}
                  onChange={(e) => {
                    e !== undefined
                      ? (filterAge.current = e[0])
                      : (filterAge.current = "");
                    filtering();
                  }}
                  //style={{ width: 300 }}
                  options={age}
                  placeholder="Sélectionner l'âge"
                />
              </Form.Item>
              <Form.Item
                name="cascader_level"
                label={
                  <>
                    <Icon
                      style={{ width: "90%", height: "90%" }}
                      component={() => (
                        <img
                          style={{
                            width: "90%",
                            height: "90%",
                            marginRight: "50%",
                          }}
                          src={levelImage}
                        />
                      )}
                    />
                    {"  Niveau  "}
                  </>
                }
              >
                <Cascader
                  defaultValue={""}
                  onChange={(e) => {
                    e !== undefined
                      ? (level.current = e[0])
                      : (level.current = "");
                    filtering();
                  }}
                  // style={{ width: 300 }}
                  options={options}
                  placeholder="Sélectionner le niveau"
                />
              </Form.Item>
              <Form.Item
                name="switch_remote"
                label={
                  <>
                    <Icon
                      style={{ width: "90%", height: "90%" }}
                      component={() => (
                        <img
                          style={{
                            width: "90%",
                            height: "90%",
                            marginRight: "50%",
                          }}
                          src={locationImage}
                        />
                      )}
                    />
                    {"  En ligne  "}
                  </>
                }
              >
                <Switch
                  //defaultValue={true}
                  onClick={() => {
                    console.log("CLICK Remote");
                    isRemote.current = !isRemote.current;
                    console.log("remote   " + isRemote.current);
                    filtering();
                  }}
                />
              </Form.Item>

              <Form.Item
                name="switch_handi"
                label={
                  <>
                    <Icon
                      style={{ width: "90%", height: "90%" }}
                      component={() => (
                        <img
                          style={{
                            width: "90%",
                            height: "90%",
                            marginRight: "50%",
                          }}
                          src={handi}
                        />
                      )}
                    />
                    {"  Handi-Accessible  "}
                  </>
                }
              >
                <Switch
                  //defaultValue={true}
                  onClick={() => {
                    console.log("CLICK handi accessible");
                    accessible.current = !accessible.current;
                    console.log("acces   " + accessible.current);
                    filtering();
                  }}
                />
              </Form.Item>

              <Form.Item
                name="switch_free"
                label={
                  <>
                    <Icon
                      style={{ width: "90%", height: "90%" }}
                      component={() => (
                        <img
                          style={{
                            width: "90%",
                            height: "90%",
                            marginRight: "50%",
                          }}
                          src={free}
                        />
                      )}
                    />
                    {"  Gratuit  "}
                  </>
                }
              >
                <Switch
                  //defaultValue={true}
                  onClick={() => {
                    isFree.current = !isFree.current;
                    console.log("free   " + isFree.current);
                    filtering();
                  }}
                />
              </Form.Item>
              {/*   <div style={{ width: "10%", height: "40%" }}>
              {results.length > 0 ? (
                <LoadScript googleMapsApiKey="AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4">
                  <Maps
                    key={JSON.stringify(results.length)}
                    locations={results}
                  />
                </LoadScript>
              ) : null}
            </div>*/}
              <div style={{ width: "50%", height: "50%", zIndex: "-1" }}>
                {results.length > 0 &&
                latCity.current !== 0 &&
                lonCity.current !== 0 ? (
                  <Map
                    key={JSON.stringify(results.length)}
                    locations={results}
                    centerLat={latCity.current}
                    centerLong={lonCity.current}
                    style={{ zIndex: "-1" }}
                  />
                ) : null}
              </div>
            </Form>
            <div
              className="top"
              style={{
                fontSize: "200%",
                width: "70%",
                // borderRightWidth: "thin",
              }}
            >
              <>
                <Button
                  onClick={() => {
                    setIsVisible(!isVisible);
                  }}
                >
                  TRIER
                </Button>
                <Cascader
                  defaultValue={""}
                  onChange={(e) => {
                    e !== undefined
                      ? (classt.current = e[0])
                      : (classt.current = 0);
                    classer();
                  }}
                  // style={{ width: 300 }}
                  options={classement}
                  placeholder="Trier"
                />
                <br />
                <br />
                {results.map((res, i) => {
                  return (
                    <div key={"KEY" + i}>
                      <span
                        style={{
                          position: "flex",
                          display: "inline",
                          width: "40%",
                          float: "left",
                          marginRight: "3%",
                        }}
                        key={res.id}
                      >
                        <a href={"/product/" + res.id}>
                          <Card
                            key={"HEY" + res.id}
                            hoverable
                            style={{ border: "none", width: "100%" }}
                            cover={<img alt="example" src={res.img1} />}
                          >
                            <Meta
                              id="button_giver"
                              style={{
                                marginTop: "-2%",
                                height: "160%",
                                border: "none",
                                //  width: "60%",
                              }}
                              title={res.title}
                              description={res.accroche}
                            />
                            <Meta
                              id="button_giver"
                              style={{
                                marginTop: "-2%",
                                height: "160%",
                                border: "none",
                                textDecoration: "none",
                              }}
                              title={
                                res.isDiscounted ? (
                                  <>
                                    <p
                                      style={{
                                        textDecoration: "line-through",
                                      }}
                                    >
                                      {res.price + "€"}
                                    </p>
                                    <p>{res.discount + "€"}</p>{" "}
                                  </>
                                ) : (
                                  res.price + "€"
                                )
                              }
                              // description={}
                            />
                          </Card>
                        </a>
                      </span>
                    </div>
                  );
                })}
              </>
            </div>
          </div>
        </div>
        <Footer width={width} />{" "}
      </>
    );
  } else {
    return <>Loading</>;
  }
};
export default Results;
