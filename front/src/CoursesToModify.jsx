import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";

import { BrowserView, MobileView } from "react-device-detect";
import {
  Card,
  Slider,
  DatePicker,
  Form,
  InputNumber,
  Cascader,
  Switch,
  Button,
} from "antd";

import MenuBrowser from "./MenuBrowser";
import { useAuth } from "./AuthContext";
import axios from "axios";
import Footer from "./Footer";
const CoursesToModify = (props) => {
  const [results, setResults] = useState([]);

  const [filters, setFilters] = useState(false);

  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);
  const [activity, setActivity] = useState(null);
  const [city, setCity] = useState(null);
  const [datemax, setDatemax] = useState(null);
  const [state, setState] = useState(null);
  const userData = useAuth();
  const onChangePrice = (price) => {
    console.log("LOW" + price[0]);

    console.log("HIGH" + price[1]);
    //price[0];

    setResults(
      filters.filter(
        (course) => course.price <= price[1] && course.price >= price[0]
      )
    );
  };

  const onChangeAge = (age) => {
    setResults(filters.filter((course) => course.age.includes(age)));
  };
  const onChangeLevel = (level) => {
    console.log(level[0]);
    switch (level[0]) {
      case "isBeginner":
        setResults(filters.filter((course) => course.isBeginner === true));
        break;
      case "isIntermediate":
        setResults(filters.filter((course) => course.isIntermediate === true));
        break;
      case "isAdvanced":
        setResults(filters.filter((course) => course.isAdvanced === true));
        break;
      default:
        break;
    }
  };

  const onChangeRemote = (value) => {
    console.log(value);
    setResults(filters.filter((course) => course.isRemote == value));
  };

  const onChangeSeats = (seats) => {
    setResults(filters.filter((course) => course.seats >= seats));
  };
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

  // const useQuery = () => new URLSearchParams(useLocation().search);

  //  const request = useQuery();
  useEffect(() => {
    const fetchUserData = async () => {
      console.log("USER :" + JSON.stringify(userData));
      await axios

        .get(
          `http://localhost:8000/api-course/giver/course/${userData.userData.id_obj_user}`,
          {
            headers: {
              Authorization: "Bearer " + userData.userData.access,
            },
          }
        )
        .then((res) => {
          console.log("RESULTS REQUEST" + JSON.stringify(res.data));
          setResults(res.data);
          setFilters(res.data);
        })

        .catch((err) => console.log(err));
    };
    if (userData !== null) {
      try {
        fetchUserData();
      } catch (err) {
        console.error("Error in useEffect:", err);
      }
    }
  }, [userData]);

  return userData.userData.id_obj_user !== null ||
    (userData.userData.id_obj_user !== undefined &&
      userData.access !== null &&
      userData !== null) ? (
    <BrowserView>
      <div key={activity} style={{ width: "100%", display: "inline-block" }}>
        <MenuBrowser
          width={width}
          city={city}
          datemax={datemax}
          activity={activity}
        />
        <div style={{ width: "100%", display: "flex" }}>
          <div
            className="top"
            style={{
              fontSize: "200%",
              width: "70%",
              // borderRightWidth: "thin",
            }}
          >
            Les cours modifiables
            <div
              style={{
                position: "flex",
                display: "inline",
                width: "100%",
                float: "left",
                marginRight: "10%",
              }}
            >
              {results === null ? (
                <>Veuillez vous connecter pour voir cette page</>
              ) : (
                results.map((res) => {
                  return (
                    <span
                      style={{
                        position: "flex",
                        display: "inline",
                        width: "30%",
                        float: "left",
                        marginRight: "3%",
                      }}
                      key={res.id}
                    >
                      <a href={"/update/" + res.id}>
                        <Card
                          hoverable
                          style={{ border: "none", width: "100%" }}
                          cover={
                            <img
                              alt="example"
                              src={"http://localhost:8000" + res.img1}
                            />
                          }
                        >
                          <Meta
                            id="button_giver"
                            style={{ marginTop: "-2%", border: "none" }}
                            title={res.title}
                            description={res.price + "€"}
                          />
                        </Card>
                      </a>
                    </span>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <Footer width={width} />{" "}
      </div>
    </BrowserView>
  ) : (
    <>Loading</>
  );
};
export default CoursesToModify;
