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
  const [seats, setSeats] = useState(null);
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

  const useQuery = () => new URLSearchParams(useLocation().search);

  const request = useQuery();
  useEffect(() => {
    request.get("category") == null
      ? setActivity(request.get("sub_category"))
      : setActivity(request.get("category"));
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
      })

      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserView>
      <div key={activity}>
        <MenuBrowser
          width={width}
          city={city}
          datemax={datemax}
          activity={activity}
        />
        <div>
          <div>
            <div style={{ width: "20%" }}>
              <Form>
                <Form.Item label="Prix">
                  {" "}
                  <Slider
                    range
                    max={600}
                    step={10}
                    defaultValue={[0, 600]}
                    onChange={(prix) => {
                      onChangePrice(prix);
                    }}
                  />
                </Form.Item>

                <Form.Item name="seats" label="Nombre de place(s)">
                  <InputNumber
                    // defaultValue={this.state.courses.seats}
                    //style={{ position: "absolute", marginLeft: 300 }}
                    onChange={(e) => {
                      onChangeSeats(e);
                    }}
                    min={0}
                    max={10000}
                  />
                </Form.Item>

                <Form.Item name="cascader_age" label="Age">
                  <Cascader
                    // value={this.state.input}
                    onChange={(e) => onChangeAge(e)}
                    style={{ width: 300 }}
                    options={age}
                    placeholder="Sélectionner l'âge"
                  />
                </Form.Item>
                <Form.Item name="cascader_level" label="Niveau">
                  <Cascader
                    //value={this.state.input}
                    onChange={(e) => onChangeLevel(e)}
                    style={{ width: 300 }}
                    options={options}
                    placeholder="Sélectionner le niveau"
                  />
                </Form.Item>
                <Form.Item name="switch_remote" label="En ligne">
                  <Switch onChange={(e) => onChangeRemote(e)} />
                </Form.Item>

                <Form.Item></Form.Item>
              </Form>
            </div>
          </div>
          <div
            className="top"
            style={{
              fontSize: "200%",
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
