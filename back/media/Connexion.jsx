import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
//Appartion du modal
import jwt_decode from "jwt-decode";
import { Form, Input, Checkbox, message } from "antd";
import logo from "./logo2.png";
import axios from 'axios';
const Connexion = (props) => {
  const [subscribe, setSubcribe] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  useEffect( () => {
    console.log(subscribe);
}, [subscribe]);

  const authLogin = (email, password) => {
  
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
          username: email,
          password:password,
        })
        .then((res) => {
          const expirationDate = new Date(new Date().getTime() + 3600*2 );
          axiosInstance.defaults.headers["Authorization"] =
            "JWT " + res.data.access;
          //localStorage.setItem("access_token", res.data.access);
          const user_type = jwt_decode(res.data.access).user_type;
          const ID_user = jwt_decode(res.data.access).ID_user;
          const ID = jwt_decode(res.data.access).ID;
          //const riddle = jwt.decode(res.data.access);
          //localStorage.setItem("user_type", res.data);
          // console.log("IDDDDDDD", ID_user);
          //localStorage.setItem("refresh_token", res.data.refresh);
          localStorage.setItem("token", res.data.access);
          localStorage.setItem("expirationDate", expirationDate);
          localStorage.setItem("user_type", user_type);
          localStorage.setItem("ID_user", ID_user);
          localStorage.setItem("ID", ID);
  
          
          //dispatch(checkAuthTimeout(expirationDate));
          //dispatch(checkAuthTimeout(expirationDate));
          message.success("Connexion réussie");
          props.setConnexion(false)
        })
        .catch((err) => {
          
          message.error("L'identifiant ou le mot de passe est erroné");
          //    eventLogin(history);
        });
    
  };
  return (
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
      <div
        className="border"
        style={{ width: "95%" }}
      ></div>
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
          
            name="form_connexion"
            style={{ }}
            onFinish={authLogin}
            
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
              <Input />
            </Form.Item>

            <Form.Item
              label="Confirmation email"
              name="email2"
              rules={[
                {
                  required: true,
                  message: "Veuillez renseigner votre email",
                },
              ]}
            >
              <Input />
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
              <Input.Password />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Se souvenir de moi</Checkbox>
            </Form.Item>
<span style={{ position: "flex",width: "100%",display: "inline"}}>
  
              <Button
                style={{ width: "40%", marginRight: "30px",borderRadius: "25px" }}
                //htmlType="submit"
              >
                S'inscrire
              </Button>
           
              {" "}
              <Button


                style={{
                 
                  
                  width: "40%",
                  borderRadius: "25px",
                }}
                htmlType="submit"
                onClick={() => {
                  
                  
                }}
              >
                Se connecter
              </Button>
  
</span>
            
          </Form>
        </div>
      ) : (
        <div style={{  position: "flex", width: "100%", top: "-100%" }}>
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
              <Input onChange= {(e)=>{setEmail(e.target.value)}}/>
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
              <Input.Password onChange= {(e)=>{setPassword(e.target.value)}}/>
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Checkbox>Se souvenir de moi</Checkbox>
            </Form.Item>
<div style={{
                position: "flex", 
                display: "inline",
                justifyContent: "center",
                width: "100%",
               
                marginLeft: "20%"
              }}>  
              <Button
              type="button"
          
                style={{
                  borderRadius: "25px",
                  color: "black",
                  marginRight: "30px",
                }}
               onClick= {()=>{authLogin(email, password);   setSubcribe(current => !current);}}
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
              
            >
              S'inscrire
            </Button>
            </div>
             

            
          </Form>
        </div>
      )}
    </Modal>
  );
};

export default Connexion;
