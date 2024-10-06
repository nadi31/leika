import React, { useState, useEffect, useCallback, useRef } from "react";

import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import { BrowserView } from "react-device-detect";

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
import { APIProvider, useMapsLibrary } from "@vis.gl/react-google-maps";
import MenuBrowser from "./MenuBrowser";
import { useAuth } from "./AuthContext";
import axios from "axios";
import Footer from "./Footer";

const GiverForm = (props) => {
  const userData = useAuth();
  const [valueAdress, setValueAdress] = useState(null);
  const API_KEY = "AIzaSyDNvRrdKaNa67E4OFRsZGsmrbpqsQLUAUM";
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeAutocomplete, setPlaceAutocomplete] = useState(null);
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");
  const onPlaceSelect = (value) => {
    console.log("Adresse: " + JSON.stringify(value));
    setValueAdress(value.label);

    setArrayAdresses([...arrayAdresses, value.label]);
    tabAdress.current = [...tabAdress.current, value.label];
  };
  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
  };
  const [response, setResponse] = useState();
  const tabAdress = useRef([]);
  const [results, setResults] = useState([]);
  const [password, setPassword] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [adresses, setAdresses] = useState(0);
  const [arrayAdresses, setArrayAdresses] = useState([]);
  const [arrayAdd_ons, setArrayAdd_ons] = useState([]);
  const [city, setCity] = useState("");
  const adressA = useRef([]);
  const placeSelect = (e) => {
    console.log("LON *" + e.properties.lon);
    adressA.current = [...adressA.current, e.properties];
    //arrayAdresses[idx] = e.properties;
    //  setArrayAdresses([...arrayAdresses, e.properties]);
    console.log(adressA.current);
    //   setChangeDetected(true);
  };
  const handlePlaceSelected = (place) => {
    if (place && place.formatted_address) {
      console.log(place.formatted_address);

      setArrayAdresses([...arrayAdresses, place.formatted_address]);
      tabAdress.current = [...tabAdress.current, place.formatted_address];
      console.log(JSON.stringify(tabAdress.current));
    }
  };
  const options = {
    componentRestrictions: { country: "fr" },
    fields: ["address_components", "geometry", "icon", "name"],
    strictBounds: false,
  };

  const getResponse = (value) => {
    console.log(value);
    setResponse(value);
  };

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
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
          Authorization: "Bearer " + userData.userData.access,
        },
      })

      .then((res) => {
        console.log("TABADRESS", tabAdress);

        arrayAdresses.map(
          (adress, idx) => {
            console.log("ADREE :" + adress);
            geocodeByAddress(adress).then((results) => {
              console.log(
                "GEO RESULT :" + JSON.stringify(results[0].geometry.location)
              );
              const lat = results[0].geometry.location.lat();
              const lng = results[0].geometry.location.lng();

              const parts = tabAdress.current[idx].split(",");
              console.log("LAT :" + lat);

              form.append("lat", lat);
              form.append("lng", lng);
              const city = parts[parts.length - 2]?.trim();
              const country = parts[parts.length - 1]?.trim();

              form.append("name", tabAdress.current[idx]);
              form.append("giver", res.data[0]);
              form.append("city", city);
              //form.append("apartment_number", values.input_adress_apt_number);
              form.append("country", country);
              form.append("add_ons", arrayAdd_ons[idx]);

              console.log(values);
              axios
                .post(`http://localhost:8000/api/create/adress`, form, {
                  headers: {
                    "content-type": "multipart/form-data",
                    Authorization: "Bearer " + userData.userData.access,
                  },
                })
                .then((res) => {
                  message.success("Profil créé avec succès", 10);
                })
                .catch((err) => {
                  message.error("Erreur", 10);
                  console.log(err);
                });
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
              accept=".jpeg, .png, .jpg"
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
            <GooglePlacesAutocomplete
              apiKey={API_KEY}
              selectProps={{
                valueAdress,
                onChange: onPlaceSelect,
              }}
            />
          </Form.Item>

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
              <Form.Item name="input_adress_rue" label="Adresse ">
                <GooglePlacesAutocomplete
                  apiKey={API_KEY}
                  selectProps={{
                    valueAdress,
                    onChange: onPlaceSelect,
                  }}
                />
              </Form.Item>

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
