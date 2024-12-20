import MenuBrowser from "./MenuBrowser";

import { useParams } from "react-router-dom";

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import { Input, Button, Form } from "antd";

import { BrowserView, MobileView } from "react-device-detect";

import Footer from "./Footer";
import axios from "axios";
import "./style/ProductDetail.css";

const MdpOublie = (props) => {
  const [course, setCourse] = useState(null);

  const token = useParams();
  const key = token["token"];
  const [width, setWidth] = useState(window.innerWidth);
  const [small, setSmall] = useState("horizontal");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const passwordModify = (password) => {
    axios
      .post(
        `http://localhost:8000/api/mdp`,

        { token: token, password: password },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        console.log("SUCESS");
      })
      .catch((err) => {
        console.log("ERROR1", err.response);
      });
  };
  function updateSize() {
    setWidth(window.innerWidth);
  }

  const requests = async () => {
    console.log("COMMENTS " + key);
    try {
      const res = axios
        .get(`http://localhost:8000/api/token/${key}`)
        .then((res1) => {
          console.log("COMMENTS" + res1.data[0].email);
          axios
            .post(
              "http://localhost:8000/api/token",

              {
                email: res1.data[0].email,
              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
              }
            )

            .then((response) => {
              if (response.status == "success") {
                this.setState({ valid: 1 });
                localStorage.setItem("nana@gmail.com", 1);
              } else if (response.status == "failed") {
                this.setState({ valid: 2 });
              }
            });
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log("ID " + key);
  }, []);

  const update_sens = () => {
    window.innerWidth <= 1000 ? setSmall("vertical") : setSmall("horizontal");
  };
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    window.addEventListener("resize", update_sens);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const style_icone = {
    border: "none",
    width: width <= 1200 ? "90%" : "40%",
    marginBottom: "5px",
    marginLeft: width <= 1200 ? "2%" : "",
  };

  if (key === null) {
    return <div>Loading..</div>;
  } else {
    return (
      <>
        <BrowserView>
          <MenuBrowser width={width} />
        </BrowserView>

        <div style={{ width: "100%" }}></div>
        <Form
          name="form_oublie"

          // onFinish={onFinish}
          //onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email1"
            rules={[
              {
                required: true,
                message: "Veuillez renseigner votre email",
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setPassword1(e.target.value);
                console.log(password1);
              }}
            />
          </Form.Item>

          <Form.Item
            label="Confirmation mot de passe"
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez renseigner votre email",
              },
              {
                validator: (_, value) => {
                  if (password1 == password2) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject("Les emails doivent être identiques");
                  }
                },
              },
            ]}
          >
            <Input
              onChange={(e) => {
                setPassword2(e.target.value);
              }}
            />
          </Form.Item>

          <Button
            type="button"
            style={{
              borderRadius: "25px",
              color: "black",
              marginRight: "30px",
            }}
            htmlType="submit"
            onClick={() => {
              passwordModify(password1);
              //setSubcribe((current) => !current);
            }}
          >
            Se connecter
          </Button>
        </Form>
        <Footer width={width} />
      </>
    );
  }
};

export default MdpOublie;
/*<br />

 <br />
           */
/*RocketTwoTone,
  ExperimentTwoTone,
  EnvironmentTwoTone,
  SmileTwoTone,
  ThunderboltTwoTone,
  BulbOutlined,
  InfoCircleOutlined, */
