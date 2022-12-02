import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
//import emailjs from "@emailjs/browser";
import emailjs from "emailjs-com";
import { init } from "@emailjs/browser";
import sha256 from "crypto-js/sha256";
//Appartion du modal
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import {
  Form,
  Input,
  Checkbox,
  message,
  Alert,
  notification,
  Space,
} from "antd";
import logo from "./logo2.png";

import {
  useNavigate,
  withRouter,
  useSearchParams,
  Link,
} from "react-router-dom";
import axios from "axios";
const Connexion = (props) => {
  const [subscribe, setSubcribe] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone, setPhone] = useState("");
  const [checked, setChecked] = useState(false);
  const [cook, setCook] = useState(false);
  //const [cookies, setCookies] = useState(new Cookies());
  const [oublie, setOublie] = useState(false);
  const [emailOublie, setEmailOublie] = useState("");
  const [cookies, setCookie] = useCookies(["name"]);
  const [messageApi, contextHolder] = message.useMessage();

  const [toSend, setToSend] = useState({
    from_name: "leikka",
    to_name: "",
    message: "Please click to the followinf ling to register",
  });
  const onClose = (e) => {
    console.log(e, "I was closed.");
  };

  const onOublie = (email) => {
    //requete pour avoir le token
    console.log("On oublie");
    axios
      .post(
        `http://localhost:8000/api/user`,
        { email: email },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("ID " + res.data.id);
        axios
          .get(`http://localhost:8000/api/mdp/${res.data.id}`)
          .then((res) => {
            console.log("***RES**" + res.data.token);
            let token = res.data.token;
            // emailjs.init("YOUR_USER_ID");
            //var SHA256 = require("crypto-js/sha256");
            let pk = "YqLf9uj9IFMcnRJHA";
            init(pk);

            let templateParams = {
              //  to_name: first_name,
              to_email: email,
              URL: `http://localhost:3000/mdp/${token}`,
              //message: "Lien",
            };

            emailjs
              .send("service_6wdorea", "template_mdp", templateParams, pk)
              .then(
                (result) => {
                  console.log(result.text);
                },
                (error) => {
                  console.log("EROOR" + error.text);
                }
              );
          })

          .catch((err) => {
            console.log("FAILED...", err);
          });
      })
      .catch((e) => console.log(e));
  };

  /*const setCookie = () => {
    console.log("COOK" + cook);
    if (cook) {
      setEmail1(cookies.get("username"));
    } else {
      setCook(true);
      console.log(localStorage.getItem("ID"));
      cookies.set("username", localStorage.getItem("ID"), {
        path: "/",
      });
       
    }
  };

  const getCookie = () => {
    return cookies.get("username");
  };*/

  const onChangeCheck = () => {
    setChecked(!checked);
  };

  useEffect(() => {
    if (props.connected == false) console.log("LOG OUT");
  }, [props.connected]);
  const navigate = useNavigate();

  const authLogOut = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    //window.dispatchEvent(new Event("message"));
  };
  const authLogin = (email, password) => {
    props.setConnexion(false);
    console.log(email, password);

    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      //timeout: 5000,
      headers: {
        Authorization: "JWT " + localStorage.getItem("access_token"),
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    axiosInstance
      .post("token/obtain/", {
        email: email,
        password: password,
      })
      .then((res) => {
        const expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
        axiosInstance.defaults.headers["Authorization"] =
          "JWT " + res.data.access;
        //localStorage.setItem("access_token", res.data.access);
        const user_type = jwt_decode(res.data.access).user_type;
        const ID_user = jwt_decode(res.data.access).ID_user;
        const ID = jwt_decode(res.data.access).ID;
        const first_name = jwt_decode(res.data.access).first_name;
        //const riddle = jwt.decode(res.data.access);
        //localStorage.setItem("user_type", res.data);
        // console.log("IDDDDDDD", ID_user);
        //localStorage.setItem("refresh_token", res.data.refresh);
        localStorage.setItem("token", res.data.access);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("user_type", user_type);
        localStorage.setItem("email", email);
        localStorage.setItem("ID_user", ID_user);
        localStorage.setItem("ID", ID);
        localStorage.setItem("first_name", first_name);
        localStorage.setItem("connected", true);
        props.setConnected(true);
        //dispatch(checkAuthTimeout(expirationDate));
        //dispatch(checkAuthTimeout(expirationDate));
        window.dispatchEvent(new Event("message"));
        //setCookie();
        //console.log("cookie");

        console.log("COOKIE" + email);
        setCookie("user", ID, { path: "/" });
        console.log("COOK " + cookies["user"]);
        alert(`User cookie is ${JSON.stringify(cookies["user"])}`);

        message.success("Connexion réussie");

        setTimeout(() => {
          authLogOut();
        }, 60 * 60 * 1000);
      })
      .catch((err) => {
        message.error("L'identifiant ou le mot de passe est erroné");
        console.log("" + err);

        //    eventLogin(history);
      });
  };

  async function authRegister(email, password, phone, first_name, last_name) {
    console.log(email, password);

    await axios
      .post("http://localhost:8000/api/user/create/", {
        email: email,
        username: email,
        password: password,
        user_type1: 2,
        first_name: first_name,
        last_name: last_name,
        phone: phone,
      })
      .then(async (res) => {
        //authLogin(email, password);
        message.info(
          "Veuillez vérifier vos emails pour compléter l'inscription",
          90
        );
        message.success("Inscription réussie!");

        props.setConnexion(false);
      })
      .catch((err) => {
        if (err.response) {
          message.error("Vous vous êtes déjà inscrit!");
        } else if (err.request) {
          message.error("Problème de connexion");
        } else {
          message.error("Erreur: " + err.message);
        }
      });
  }

  return (
    <>
      <Modal
        //title="Modal 1000px width"
        footer={null}
        centered
        visible={props.connexion}
        onOk={() => props.setConnexion(false)}
        onCancel={() => props.setConnexion(false)}
        width={500}
      >
        {" "}
        <div className="border" style={{ width: "95%" }}></div>
        <div
          className="crop"
          style={{
            position: "flex",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img style={{ width: "40%" }} src={logo} alt="logo"></img>
        </div>
        {subscribe ? (
          <div
            style={{
              position: "flex",
              display: "flex",
              justifyContent: "center",
              width: "100%",
              top: "-100%",
            }}
          >
            <Form
              name="form_inscription"
              style={{}}
              onFinish={() =>
                authRegister(email1, password1, phone, first_name, last_name)
              }

              // onFinish={onFinish}
              //onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email1"
                rules={[
                  {
                    type: "email",
                    message: "Doit être un email!",
                  },
                  {
                    required: true,
                    message: "Veuillez renseigner votre email",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setEmail1(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Confirmation email"
                name="email2"
                rules={[
                  {
                    type: "email",
                    message: "Doit être un email!",
                  },
                  {
                    required: true,
                    message: "Veuillez renseigner votre email",
                  },
                  {
                    validator: (_, value) => {
                      if (email1 == email2) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Les emails doivent être identiques"
                        );
                      }
                    },
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setEmail2(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Mot de passe"
                name="password1"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre mot de passe",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Confirmation mot de passe"
                name="password2"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre mot de passe",
                  },
                  {
                    validator: (_, value) => {
                      if (password1 == password2) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(
                          "Les mots de passe doivent être identiques"
                        );
                      }
                    },
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => {
                    setPassword2(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Nom"
                name="last_name"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre nom",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setLast_name(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                label="Prénom"
                name="first_name"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre prénom",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setFirst_name(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Téléphone portable"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre téléphone",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 8,
                  span: 16,
                }}
              >
                <Checkbox checked={cook} onChange={() => setCook(!cook)}>
                  Se souvenir de moi
                </Checkbox>
              </Form.Item>
              <span
                style={{ position: "flex", width: "100%", display: "inline" }}
              >
                <Button
                  style={{
                    width: "40%",
                    borderRadius: "25px",
                  }}
                  onClick={() => {
                    //authLogin(email, password);
                    setSubcribe((current) => !current);
                  }}
                >
                  Se connecter
                </Button>
                <Button
                  style={{
                    width: "40%",
                    marginLeft: "30px",
                    borderRadius: "25px",
                  }}
                  htmlType="submit"
                  //onClick={authRegister(email, password)}
                >
                  S'inscrire
                </Button>{" "}
              </span>
            </Form>
          </div>
        ) : (
          <div style={{ position: "flex", width: "100%", top: "-100%" }}>
            <Form
              name="form_connexion"

              // onFinish={onFinish}
              //onFinishFailed={onFinishFailed}
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre email",
                  },
                ]}
              >
                <Input
                  onChange={(e) => {
                    setEmail1(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Mot de passe"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Veuillez renseigner votre mot de passe",
                  },
                ]}
              >
                <Input.Password
                  onChange={(e) => {
                    setPassword1(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                name="remember"
                valuePropName="checked"
                wrapperCol={{
                  offset: 7,
                  span: 16,
                }}
              >
                <Checkbox>Se souvenir de moi</Checkbox>
              </Form.Item>

              <Form.Item
                name="oublie"
                //valuePropName="checked"
                wrapperCol={{
                  offset: 7,
                  span: 7,
                }}
              >
                <Button
                  onClick={() => {
                    console.log("I GOT TO BE RIGHT NOW");
                    setOublie(true);
                    //modalOublie();
                  }}
                >
                  Mot de passe oublié
                </Button>
              </Form.Item>
              <div
                style={{
                  position: "flex",
                  display: "inline",
                  justifyContent: "center",
                  width: "100%",

                  marginLeft: "20%",
                }}
              >
                <Button
                  type="button"
                  style={{
                    borderRadius: "25px",
                    color: "black",
                    marginRight: "30px",
                  }}
                  htmlType="submit"
                  onClick={() => {
                    authLogin(email1, password1);
                    //setSubcribe((current) => !current);
                  }}
                >
                  Se connecter
                </Button>

                <Button
                  type="button"
                  style={{
                    backgroundColor: "white",
                    color: "black",

                    borderRadius: "25px",
                  }}
                  onClick={() => {
                    //authLogin(email, password);
                    setSubcribe((current) => !current);
                  }}
                >
                  S'inscrire
                </Button>
              </div>
            </Form>
          </div>
        )}
      </Modal>
      <Modal
        //title="Modal 1000px width"
        footer={null}
        centered
        visible={oublie}
        onOk={() => {
          onOublie(emailOublie);
          setOublie(false);
        }}
        onCancel={() => setOublie(false)}
        width={500}
      >
        {" "}
        <div className="border" style={{ width: "95%" }}></div>
        <div
          className="crop"
          style={{
            position: "flex",
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <img style={{ width: "40%" }} src={logo} alt="logo"></img>

          <Form
            name="form_oublie"

            // onFinish={onFinish}
            //onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Veuillez renseigner votre email",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setEmailOublie(e.target.value);
                }}
              />
            </Form.Item>

            <div
              style={{
                position: "flex",
                display: "inline",
                justifyContent: "center",
                width: "100%",

                marginLeft: "20%",
              }}
            >
              <Button
                type="button"
                style={{
                  borderRadius: "25px",
                  color: "black",
                  marginRight: "30px",
                }}
                htmlType="submit"
                onClick={() => {
                  onOublie(emailOublie);
                  setOublie(false);
                }}
              >
                Valider
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
      ;
    </>
  );
};

export default Connexion;
