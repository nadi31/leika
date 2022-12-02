import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate, withRouter } from "react-router-dom";
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
import * as moment from "moment";
import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import axios from "axios";
import Footer from "./Footer";
import queryString from "query-string";
const Results = (props) => {
  const [results, setResults] = useState([]);
  const [req, setReq] = useState(null);
  const [range, setRange] = useState(null);
  const [resFilters, setResFilters] = useState(null);
  const [prix, setPrix] = useState(null);
  const [seats, setSeats] = useState(1);
  const [filters, setFilters] = useState(false);
  const [prix_min, setPrix_min] = useState(null);
  const [prix_max, setPrix_max] = useState(null);
  const [resultForm, setResultForm] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);
  const [activity, setActivity] = useState(null);
  const [city, setCity] = useState(null);
  const [datemax, setDatemax] = useState(null);
  const [state, setState] = useState(null);
  const [res, setRes] = useState([]);
  const [value, setValue] = useState(false);
  const [years, setYears] = useState("");
  const [isAdvanced, setIsAdvanced] = useState(false);
  const [isIntermediate, setIsIntermediate] = useState(false);
  const [isBeginner, setIsBeginner] = useState(false);
  const [price, setPrice] = useState([0, 600]);
  const filtering = (e, level, age) => {
    console.log("IS BEGIN" + isBeginner, level);

    if (age != null) {
      console.log("AGE" + age);
      switch (level) {
        case "isBeginner":
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              .filter((course) => course.age.includes(age))
              .filter((course) => course.isRemote === e)

              .filter((course) => course.isBeginner === true)
          );

          console.log("IS BEGINNER");

          break;
        case "isIntermediate":
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              .filter((course) => course.age.includes(age))
              .filter((course) => course.isRemote === e)

              .filter((course) => course.isIntermediate === true)
          );
          break;
        case "isAdvanced":
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              .filter((course) => course.age.includes(age))
              .filter((course) => course.isRemote === e)
              .filter((course) => course.isIntermediate === false)
              .filter((course) => course.isBeginner === false)
              .filter((course) => course.isAdvanced === true)
          );
          break;
        default:
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              .filter((course) => course.age.includes(age))
              .filter((course) => course.isRemote === e)
            //.filter((course) => course.isAdvanced === true)
          );
          break;
      }
    } else {
      switch (level) {
        case "isBeginner":
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              //   .filter((course) => course.age.includes(years))
              .filter((course) => course.isRemote === e)

              .filter((course) => course.isBeginner === true)
          );

          console.log("IS BEGINNER");

          break;
        case "isIntermediate":
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              // .filter((course) => course.age.includes(years))
              .filter((course) => course.isRemote === e)

              .filter((course) => course.isIntermediate === true)
          );
          break;
        case "isAdvanced":
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              // .filter((course) => course.age.includes(years))
              .filter((course) => course.isRemote === e)
              .filter((course) => course.isAdvanced === true)
          );
          break;
        default:
          setResults(
            filters
              .filter(
                (course) => course.price <= price[1] && course.price >= price[0]
              )
              .filter((course) => course.seats >= seats)
              // .filter((course) => course.age.includes(years))
              .filter((course) => course.isRemote === e)
            //.filter((course) => course.isAdvanced === true)
          );
          break;
      }
    }
  };

  const onChangePrice = (price) => {
    console.log("LOW" + price[0]);

    console.log("HIGH" + price[1]);
    //price[0];

    setResults(
      filters.filter(
        (course) => course.price <= price[1] && course.price >= price[0]
      )
    );
    setRes(
      res.filter(
        (course) => course.price <= price[1] && course.price >= price[0]
      )
    );
  };

  const onChangeAge = (age) => {
    setResults(filters.filter((course) => course.age.includes(age)));
    setRes(res.filter((course) => course.age.includes(age)));
  };
  const onChangeLevel = (level) => {
    console.log(level[0]);
    switch (level[0]) {
      case "isBeginner":
        setResults(filters.filter((course) => course.isBeginner === true));
        setRes(res.filter((course) => course.isBeginner === true));
        break;
      case "isIntermediate":
        setResults(filters.filter((course) => course.isIntermediate === true));
        setRes(res.filter((course) => course.isIntermediate === true));
        break;
      case "isAdvanced":
        setResults(filters.filter((course) => course.isAdvanced === true));
        setRes(res.filter((course) => course.isAdvanced === true));
        break;
      default:
        break;
    }
  };
  const onChangeLevele = (level) => {
    console.log(level[0]);
    switch (level[0]) {
      case "isBeginner":
        setIsBeginner(true);
        console.log("hey");
        break;
      case "isIntermediate":
        setIsIntermediate(true);
        break;
      case "isAdvanced":
        setIsAdvanced(true);
        break;
      default:
        break;
    }
  };

  const onChangeRemote = (value) => {
    console.log(value);
    setResults(results.filter((course) => course.isRemote == value));
    setRes(res.filter((course) => course.isRemote == value));
  };

  const onChangeSeats = (seats) => {
    setResults(filters.filter((course) => course.seats >= seats));
    setRes(res.filter((course) => course.seats >= seats));
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
  const category = (intCategory) => {
    switch (intCategory) {
      case "1":
        return "Art";

      case "2":
        return "Arts de scene";

      case "11":
        return "Tours, Circuits, Expériences";

      case "3":
        return "Loisirs creatifs";

      case "4":
        return "Professionnel ";

      case "5":
        return "Culinaire";

      case "6":
        return "Culture";

      case "7":
        return "Linguistique";

      case "8":
        return "Sport";

      case "9":
        return "Jeux";

      case "10":
        return "Arts de scene ";

      default:
        return intCategory;
        break;
    }
  };
  const useQuery = () => new URLSearchParams(useLocation().search);

  const request = useQuery();
  useEffect(() => {
    request.get("category") == null
      ? setActivity(request.get("sub_category"))
      : setActivity(category(request.get("category")));
    //const category = searchParams.get("category");
    setCity(request.get("city"));
    setDatemax(request.get("date_max"));
    //setState(JSON.stringify(props.location.state));
    //console.log("STATE " + state);
    console.log("REQUEST1 " + request);

    //console.log("REQUEST " + JSON.stringify(values));
    // axios.get(`http://localhost:8000/api-course/search/?&sub_category=Dessin&city=`).then((res) => {

    axios
      .get(`http://localhost:8000/api-course/search/?&${request}`)
      .then((res) => {
        console.log("RESULTS REQUEST" + JSON.stringify(res.data));
        setResults(res.data);
        setFilters(res.data);
        setRes(res.data);
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserView>
      <div key={activity} style={{ width: "100%", display: "inline-block" }}>
        <MenuBrowser
          width={width}
          city={city}
          datemax={datemax}
          activity={activity}
        />
        <div style={{ width: "100%", display: "flex" }}>
          <h4 style={{ marginTop: "1%", marginLeft: "1%" }}>Filtres</h4>
          <Form style={{ width: "17%", marginTop: "3%", marginLeft: "1%" }}>
            <Form.Item label="Prix">
              {" "}
              <Slider
                range
                max={600}
                step={10}
                defaultValue={[0, 600]}
                onChange={(prix) => {
                  setPrice(prix);
                  filtering(value, "", "");
                }}
              />
            </Form.Item>

            <Form.Item name="seats" label="Nombre de place(s)">
              <InputNumber
                defaultValue={1}
                //style={{ position: "absolute", marginLeft: 300 }}
                onChange={(e) => {
                  setSeats(e);
                  filtering(value, "", "");
                }}
                min={0}
                max={10000}
              />
            </Form.Item>

            <Form.Item name="cascader_age" label="Age">
              <Cascader
                //defaultValue={"Tous les âges"}
                // value={this.state.input}
                onChange={(e) => {
                  setYears(e);
                  filtering(value, "", e[0]);
                }}
                style={{ width: 300 }}
                options={age}
                placeholder="Sélectionner l'âge"
              />
            </Form.Item>
            <Form.Item name="cascader_level" label="Niveau">
              <Cascader
                defaultValue={""}
                onChange={(e) => {
                  filtering(value, e[0], "");
                }}
                style={{ width: 300 }}
                options={options}
                placeholder="Sélectionner le niveau"
              />
            </Form.Item>
            <Form.Item name="switch_remote" label="En ligne">
              <Switch
                //defaultValue={true}
                onChange={(e) => {
                  console.log("value" + e);
                  setValue(e);
                  console.log("value" + value);
                  filtering(e, "", "");
                }}
              />
            </Form.Item>
          </Form>
          <div
            className="top"
            style={{
              fontSize: "200%",
              width: "70%",
              // borderRightWidth: "thin",
            }}
          >
            Résultats de la recherche{" "}
            <div
              style={{
                position: "flex",
                display: "inline",
                width: "100%",
                float: "left",
                marginRight: "10%",
              }}
            >
              {results === [] ? (
                <>Loading</>
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
                      <a href={"/product/" + res.id}>
                        <Card
                          hoverable
                          style={{ border: "none", width: "100%" }}
                          cover={<img alt="example" src={res.img1} />}
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
  );
};
export default Results;
