import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { useNavigate, withRouter } from "react-router-dom";

import { BrowserView, MobileView } from "react-device-detect";

import { UploadOutlined } from "@ant-design/icons";
import {
  Card,
  Slider,
  DatePicker,
  Form,
  message,
  Input,
  InputNumber,
  Cascader,
  Upload,
  Switch,
  Button,
} from "antd";

import MenuBrowser from "./MenuBrowser";

import axios from "axios";
import Footer from "./Footer";

const GiverForm = (props) => {
  const [response, setResponse] = useState();
  const tabAdress = useRef([]);
  const [results, setResults] = useState([]);
  const [password, setPassword] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [adresses, setAdresses] = useState(0);
  const [arrayAdresses, setArrayAdresses] = useState([]);
  const [arrayAdd_ons, setArrayAdd_ons] = useState([]);
  const onPlaceSelect = (value) => {
    console.log(JSON.stringify(value));
    setArrayAdresses([...arrayAdresses, value]);
    tabAdress.current = [...tabAdress.current, value];
    console.log(JSON.stringify(tabAdress.current));
  };

  const getResponse = (value) => {
    console.log(value);
    setResponse(value);
  };

  const [width, setWidth] = useState(window.innerWidth);
  const [value, setValue] = useState(null);
  useEffect(() => {
    //await ().then(async () => {

    const pass =
      Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    setPassword(pass);
  }, []);
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const onFinish = (values) => {
    let form = new FormData();

    //console.log("RES" + JSON.stringify(res["data"]["id"]));
    let form_data = new FormData();
    form_data.append("appelation", values.input_appelation);
    //form_data.append("adress", res["data"]["id"].toString());
    //console.log("ADRESS" + res["data"]["id"].toString());
    form_data.append("description", values.input_description);
    form_data.append("phone", values.input_phone);
    form_data.append("user", localStorage.getItem("ID"));
    form_data.append("username", values.input_email);
    form_data.append("password", password);
    form_data.append("siret", values.input_siret);
    form_data.append("email", values.input_email);
    console.log("TABADRESS", tabAdress);
    if (values.upload) {
      form_data.append(
        "img1",
        values.upload.fileList[0].originFileObj,
        values.upload.fileList[0].originFileObj.name
      );
    }
    axios
      .post(`http://localhost:8000/api/create/giver`, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("TABADRESS", tabAdress);
        arrayAdresses.map(
          (adress, idx) => {
            console.log("ADR" + JSON.stringify(tabAdress.current[idx]));
            console.log(
              "ADRESS" +
                JSON.stringify(tabAdress.current[idx].geometry.coordinates[1])
            );
            console.log(password);
            const lat = tabAdress.current[idx].properties.lat;
            const lng = tabAdress.current[idx].properties.lon;
            console.log(
              "lat1 : " +
                tabAdress.current[idx].properties.lat +
                "long " +
                tabAdress.current[idx].properties.lon
            );

            setLat(lat);
            setLng(lng);
            //const keyGeo = "ea16b50fa61c47faa5c3cd8fc43eeb44";
            //const url = `https://api.geoapify.com/v1/geocode/search?text=1214-1224${adress}&format=json&apiKey=${keyGeo}`;
            form.append("lat", lat);
            form.append("lng", lng);
            form.append("name", tabAdress.current[idx].properties.formatted);
            form.append("giver", res.data[0]);
            form.append("city", tabAdress.current[idx].properties.city);
            //form.append("apartment_number", values.input_adress_apt_number);
            form.append("country", tabAdress.current[idx].properties.country);
            form.append("add_ons", arrayAdd_ons[idx]);
            //  Geocode.setApiKey("AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4");
            //Geocode.fromAddress(adress.value.description).then(
            //(response) => {

            console.log("lat2 : " + lat + "long " + lng);

            //OULA
            console.log(values);
            axios
              .post(`http://localhost:8000/api/create/adress`, form, {
                headers: {
                  "content-type": "multipart/form-data",
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              })
              .then((res) => {
                message.success("Profil créé avec succès", 10);
              })
              .catch((err) => {
                message.error("Erreur", 10);
                console.log(err);
              });
          },
          (error) => {
            console.error(error);
          }
        );
      });
  };

  return (
    <BrowserView>
      <div style={{ width: "100%", display: "inline-block" }}>
        <MenuBrowser width={width} />
        <div
          className="top"
          style={{
            fontSize: "200%",
            width: "20%",
            // borderRightWidth: "thin",
          }}
        >
          Créer un giver{" "}
        </div>
        <Form style={{ width: "50%" }} onFinish={onFinish} {...formItemLayout}>
          <Form.Item name="input_appelation" label="Nom">
            <Input placeholder="Appelation" />
          </Form.Item>
          <Form.Item name="upload" label="Image">
            <Upload
              //{...this.props_upload}

              maxCount={1}
              listType="picture"
              //multiple
              accept=".jpeg, .png"
              beforeUpload={() => false}
            >
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item name="input_description" label="Description">
            <Input placeholder="Description" />
          </Form.Item>
          <Form.Item name="input_phone" label="Téléphone">
            <Input placeholder="Téléphone" />
          </Form.Item>
          <Form.Item name="input_siret" label="Siret">
            <Input placeholder="Siret" />
          </Form.Item>
          <Form.Item name="input_email" label="Email">
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item name="input_adress_rue" label="Adresse ">
            <Form.Item name="input_adress_add_ons" label="Compléments ">
              <Input
                onBlur={(e) => {
                  setArrayAdd_ons([...arrayAdd_ons, e.target.value]);
                }}
                placeholder="Numéro d'appartement... "
              />
            </Form.Item>
            <p>
              Ajouter une adresse:{" "}
              <Button
                style={{ width: "10%" }}
                onClick={() => {
                  setAdresses(adresses + 1);
                }}
              >
                +
              </Button>
            </p>
            {Array.from({ length: adresses }).map((idx) => (
              <>
                <Form.Item
                  name={"input_adress_add_ons" + idx}
                  label="Compléments "
                >
                  <Input
                    onBlur={(e) => {
                      setArrayAdd_ons([...arrayAdd_ons, e.target.value]);
                    }}
                    placeholder="Numéro d'appartement... "
                  />
                </Form.Item>
                <Button
                  style={{ width: "10%" }}
                  onClick={() => {
                    setAdresses(adresses - 1);
                    if (adresses < arrayAdresses.length) {
                      arrayAdresses.pop();
                      arrayAdd_ons.pop();
                      console.log(JSON.stringify(arrayAdresses));
                    }
                  }}
                >
                  -
                </Button>
                <p>
                  Ajouter une adresse:{" "}
                  <Button
                    style={{ width: "10%" }}
                    onClick={() => {
                      setAdresses(adresses + 1);
                    }}
                  >
                    +
                  </Button>
                </p>
              </>
            ))}
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Créer
            </Button>
          </Form.Item>
        </Form>
        <Footer />
      </div>
    </BrowserView>
  );
};
export default GiverForm;
