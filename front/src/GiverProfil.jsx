import React, { useState, useEffect, useRef } from "react";
import MenuBrowser from "./MenuBrowser";
import { Form, Input, Image, Upload, Button, message } from "antd";
import "./style/review.css";

import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import Footer from "./Footer";
import { UserOutlined } from "@ant-design/icons";

const GiverProfil = (props) => {
  const handleModify = (values) => {
    console.log(values);
    console.log(values.upload.fileList[0].originFileObj);
    console.log(values.upload.fileList[0].originFileObj.name);
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
          adressA.current.map((adress, idx) => {
            let form = new FormData();
            console.log("GIVER" + JSON.stringify(adress));
            //console.log("ADRESS" + value);
            // console.log(password);
            if (adress.value) {
              console.log("GIVER" + adress.lon);
              //console.log("ADRESS" + value);
              //console.log(password);
              const lat = adress.lat;
              const lng = adress.lon;

              //const keyGeo = "ea16b50fa61c47faa5c3cd8fc43eeb44";
              //const url = `https://api.geoapify.com/v1/geocode/search?text=1214-1224${adress}&format=json&apiKey=${keyGeo}`;
              form.append("lat", lat);
              form.append("lng", lng);
              form.append("name", adress.formatted);
              form.append("giver", res.data[0]);
              form.append("city", adress.city);
              //form.append("apartment_number", values.input_adress_apt_number);
              form.append("country", adress.country);
              form.append("add_ons", arrayAdd_ons[idx]);
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
  const adressA = useRef([]);
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
              adressA.current = res2.data;
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
  }, [adresses]);
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
                  url: "http://localhost:8000" + resultsGiver.img1,
                  thumbUrl: "http://localhost:8000" + resultsGiver.img1,
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
