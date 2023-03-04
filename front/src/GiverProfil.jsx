import React, { useState, useEffect } from "react";
import MenuBrowser from "./MenuBrowser";
import { Form, Input, Image, Upload, Button, message } from "antd";
import "./style/review.css";
import Geocode from "react-geocode";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Footer from "./Footer";
import { UserOutlined } from "@ant-design/icons";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const GiverProfil = (props) => {
  const handleModify = (values) => {
    console.log(values);
    let form_data = new FormData();
    form_data.append("appelation", values.input_appelation);
    form_data.append("email", localStorage.getItem("email"));
    form_data.append("description", values.input_description);
    form_data.append("phone", values.input_phone);
    form_data.append("user", localStorage.getItem("ID"));
    if (mdp) {
      form_data.append("password", values.mdp);
    }
    if (upload) {
      form_data.append(
        "img1",
        values.upload.fileList[0].originFileObj,
        values.upload.fileList[0].originFileObj.name
      );
    }

    axios
      .post(
        `http://localhost:8000/api/giver/${localStorage.getItem("ID_user")}`,
        form_data,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        message.success("Profil modifié avec succès", 10);
        console.log(changeDetected);
        if (changeDetected) {
          axios.delete(
            `http://localhost:8000/api/update/adress/${localStorage.getItem(
              "ID"
            )}`,
            form_data,
            {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          arrayAdresses.map((adress, idx) => {
            let form = new FormData();
            console.log("GIVER" + JSON.stringify(res));
            //console.log("ADRESS" + value);
            // console.log(password);
            if (adress.value) {
              Geocode.setApiKey("AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4");

              Geocode.fromAddress(adress.value.description).then((response) => {
                const { lat, lng } = response.results[0].geometry.location;

                console.log("lat : " + lat + "long " + lng);
                form.append("lat", lat);
                form.append("lng", lng);
                form.append("name", adress.value.description.split(",")[0]);
                form.append("giver", localStorage.getItem("ID"));
                form.append("city", adress.value.description.split(",")[1]);
                //form.append("apartment_number", values.input_adress_apt_number);
                form.append("country", adress.value.description.split(",")[2]);
                form.append("add_ons", arrayAdd_ons[idx]);
                //OULA
                console.log(values);
                axios
                  .post(`http://localhost:8000/api/create/adress`, form, {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  })
                  .then(() => {
                    message.success("Adresses modifiées avec succès", 10);
                  })
                  .catch((err) => {
                    message.error("Erreur Adresses non modifiées", 10);
                    console.log(err);
                  });
              });
            } else {
              console.log("ANCIENNE : " + JSON.stringify(adress));
              form.append("lat", adress.lat);
              form.append("lng", adress.lng);
              form.append("name", adress.name);
              form.append("giver", localStorage.getItem("ID"));
              form.append("city", adress.city);
              //form.append("apartment_number", values.input_adress_apt_number);
              form.append("country", adress.country);
              form.append("add_ons", adress.add_ons);
              //OULA
              console.log(values);
              axios
                .post(`http://localhost:8000/api/create/adress`, form, {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                })
                .then(() => {
                  message.success("Adresses modifiées avec succès", 10);
                })
                .catch((err) => {
                  message.error("Erreur Adresses non modifiées", 10);
                  console.log(err);
                });
            }
          });
        }
      })
      .catch((err) => {
        message.error("Erreur", 10);
        console.log(err);
      });

    /*: "FLY AWAY"
: "WE TAKE YOU TO FLY"
input_phone: "09 09 09 09 09 "
upload: */
  };
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

  const [resultsGiver, setResultsGiver] = useState(null);
  const [adress, setAdress] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [resultsAdress, setResultsAdress] = useState(null);
  const [adresses, setAdresses] = useState(0);
  const [arrayAdresses, setArrayAdresses] = useState([]);
  const [arrayAdd_ons, setArrayAdd_ons] = useState([]);
  const [mdp, setMdp] = useState(false);
  const [upload, setUpload] = useState(false);

  const [changeDetected, setChangeDetected] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("ID_user")) {
      axios
        .get(
          `http://localhost:8000/api/giver/${localStorage.getItem("ID_user")}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )

        .then((res) => {
          const idGiver = localStorage.getItem("ID");
          axios
            .get(`http://localhost:8000/api/giver/adress/${idGiver}`, {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res2) => {
              setArrayAdresses(res2.data);
              console.log("RESULTS REQUEST" + JSON.stringify(res2.data));
              //  console.log("RESULTS REQUEST" + JSON.stringify(res.data));
              setAdresses(res2.data.length);
              setResultsGiver(res.data[0]);
              //setFilters(res.data);
              console.log("ADRESS" + adresses);
              //s

              /* let array = [];
              let arrayAdd = [];
              if (res2.data.length > 0) {
                res2.data.map((adress) => {
                  //console.log(adress.name);
                  array.push(adress.name);
                });

                res2.data.map((adress) => {
                  arrayAdd.push(adress.add_ons);
                });

                setArrayAdd_ons(arrayAdd);
                console.log(arrayAdresses);
                console.log(arrayAdd_ons);
              }*/
            })

            .catch((err) => console.log(err));
        })

        .catch((err) => console.log(err));
    }
  }, []);
  return resultsGiver !== null && arrayAdresses.length > 0 && adresses > 0 ? (
    <>
      <MenuBrowser width={width} />
      <div
        className="top"
        style={{
          fontSize: "200%",
          width: "20%",
          // borderRightWidth: "thin",
        }}
      >
        Modifier votre profil{" "}
      </div>
      <div
        style={{
          width: "60%",
          // borderRightWidth: "thin",
        }}
      >
        <Form
          onFinish={handleModify}
          {...formItemLayout}
          initialValues={{
            input_appelation: resultsGiver.appelation,
            input_description: resultsGiver.description,
            input_phone: resultsGiver.phone,
          }}
        >
          <Form.Item name="input_appelation" label="Nom">
            <Input placeholder="Appelation" />
          </Form.Item>
          <Form.Item name="upload" label="Image">
            <Upload
              //{...this.props_upload}
              defaultFileList={[
                {
                  uid: "-1",
                  name: "image1.png",
                  status: "done",
                  url: resultsGiver.img1,
                  thumbUrl: resultsGiver.img1,
                },
              ]}
              maxCount={1}
              listType="picture"
              //multiple
              onChange={() => setUpload(true)}
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
          <Form.Item name="mdp" label="Mot de passe">
            <Input.Password
              onChange={() => setMdp(true)}
              placeholder="Nouveau mot de passe"
            />
          </Form.Item>
          <Form.Item name="input_adress_rue" label="Adresse ">
            {Array.from({ length: adresses }).map((val, idx) => (
              <>
                <GooglePlacesAutocomplete
                  selectProps={{
                    defaultInputValue:
                      arrayAdresses[idx] !== undefined
                        ? arrayAdresses[idx].name
                        : null, //set default value
                    onChange: (e) => {
                      console.log(JSON.stringify(e));
                      arrayAdresses[idx] = e;
                      setArrayAdresses([...arrayAdresses]);
                      console.log(JSON.stringify(arrayAdresses));
                      setChangeDetected(true);
                    },
                  }}
                  apiKey="AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4"
                />
                <Form.Item
                  name={"input_adress_add_ons" + idx}
                  label="Compléments "
                >
                  <Input
                    key={"input" + idx}
                    defaultValue={
                      arrayAdresses[idx] !== undefined
                        ? arrayAdresses[idx].add_ons
                        : null
                    }
                    onBlur={(e) => {
                      setArrayAdd_ons([...arrayAdd_ons, e.target.value]);
                      setChangeDetected(true);
                    }}
                    placeholder="Numéro d'appartement... "
                  />
                </Form.Item>
                <Button
                  style={{ width: "10%" }}
                  onClick={() => {
                    setAdresses(adresses - 1);
                    if (adresses < arrayAdresses.length) {
                      arrayAdresses.splice(idx, 1);
                      //arrayAdd_ons.pop();
                      setArrayAdresses([...arrayAdresses]);
                      console.log(JSON.stringify(arrayAdresses));
                      setChangeDetected(true);
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
                      setChangeDetected(true);
                    }}
                  >
                    +
                  </Button>
                </p>
              </>
            ))}
          </Form.Item>

          <Button type="primary" htmlType="submit">
            Modifier
          </Button>
        </Form>
        <Footer width={width} />
      </div>
    </>
  ) : (
    <>Loading</>
  );
};

export default GiverProfil;
