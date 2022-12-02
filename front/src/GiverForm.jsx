import React, { useState, useEffect, useCallback } from "react";
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
import * as moment from "moment";
import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import axios from "axios";
import Footer from "./Footer";
import queryString from "query-string";
const GiverForm = (props) => {
  const [results, setResults] = useState([]);
  const [password, setPassword] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
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
    console.log(password);

    let form = new FormData();

    form.append("name", values.input_adress_rue);
    form.append("zip_code", values.input_adress_zip_code);
    form.append("city", values.input_adress_city);
    form.append("apartment_number", values.input_adress_apt_number);
    form.append("country", "France");
    form.append("add_ons", values.input_adress_add_ons);
    console.log(values);
    axios
      .post(`http://localhost:8000/api/create/adress`, form, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log("RES" + JSON.stringify(res["data"]["id"]));
        let form_data = new FormData();
        form_data.append("appelation", values.input_appelation);
        form_data.append("adress", res["data"]["id"].toString());
        console.log("ADRESS" + res["data"]["id"].toString());
        form_data.append("description", values.input_description);
        form_data.append("phone", values.input_phone);
        form_data.append("user", localStorage.getItem("ID"));
        form_data.append("username", values.input_email);
        form_data.append("password", password);
        form_data.append("siret", values.input_siret);
        form_data.append("email", values.input_email);
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
            message.success("Profil créé avec succès", 10);
          })
          .catch((err) => {
            message.error("Erreur", 10);
            console.log(err);
          });
      })
      .catch((err) => {
        message.error("Erreur", 10);
        console.log(err);
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
          <Form.Item name="input_adress_rue" label="Numéro et rue ">
            <Input placeholder="134 BD De La Paix" />
          </Form.Item>
          <Form.Item name="input_adress_zip_code" label="Code Postal ">
            <Input placeholder="31000" />
          </Form.Item>
          <Form.Item
            name="input_adress_apt_number"
            label="Numéro d'Appartement  "
          >
            <Input placeholder="967" />
          </Form.Item>
          <Form.Item name="input_adress_add_ons" label="Compléments ">
            <Input placeholder="Sonner sur Atelier de Couture " />
          </Form.Item>
          <Form.Item name="input_adress_city" label="Ville ">
            <Input placeholder="Toulouse" />
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
