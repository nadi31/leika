import React, { useState, useEffect } from "react";
import MenuBrowser from "./MenuBrowser";
import { Form, Input, Upload, Button, message } from "antd";
import "./style/review.css";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";
import { UserOutlined } from "@ant-design/icons";

const GiverProfil = (props) => {
  const handleModify = (values) => {
    console.log(values);
    let form_data = new FormData();
    form_data.append("appelation", values.input_appelation);

    form_data.append("description", values.input_description);
    form_data.append("phone", values.input_phone);
    form_data.append("user", localStorage.getItem("ID"));
    if (values.upload) {
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
          headers: { "content-type": "multipart/form-data" },
        }
      )
      .then((res) => {
        message.success("Profil modifié avec succès", 10);
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

  useEffect(() => {
    if (localStorage.getItem("ID_user")) {
      axios
        .get(
          `http://localhost:8000/api/giver/${localStorage.getItem("ID_user")}`
        )
        .then((res) => {
          console.log("RESULTS REQUEST" + JSON.stringify(res.data));
          setResultsGiver(res.data[0]);
          //setFilters(res.data);
          console.log("ADRESS" + res.data[0].adress);
          setAdress(res.data.adress);
          axios
            .get(`http://localhost:8000/api/adress/${res.data[0].adress}`)
            .then((res2) => {
              console.log("RESULTS REQUEST" + JSON.stringify(res2.data));
              setResultsAdress(res2.data[0]);
              //setFilters(res.data);
            })

            .catch((err) => console.log(err));
        })

        .catch((err) => console.log(err));
    }
  }, []);
  return resultsGiver !== null && resultsAdress !== null ? (
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

          <Button type="primary" htmlType="submit">
            Modifier
          </Button>
        </Form>
      </div>
    </>
  ) : (
    <>Loading</>
  );
};

export default GiverProfil;
