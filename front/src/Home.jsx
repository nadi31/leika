import React, { useState, useLayoutEffect, useEffect } from "react";
//import MediaQuery from 'react-responsive';
import { BrowserView, MobileView } from "react-device-detect";
import { Card, Menu, Button, Input, AutoComplete, Carousel} from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import Footer from "./Footer";
import {
  ShoppingCartOutlined,
  MenuOutlined,
  UserOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Connexion from "./Connexion";
import Cart from "./Cart";
import logo2 from "./logo2.png";
import para from "./para.jpg";
import couture from "./couture.jpg";
import kart from "./kart.jpg";
import loop from "./loop.mp4";
import kids from "./kids.png";
import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import Results from "./Results";
const Home = () => {

  const [courseList, setCourseList] = useState(null)
  const [results, setResults] = useState([])
  const funcCourseList=(res)=>{
    setCourseList(res.data);
    console.log(res.data);

  }


  const getList = () => {
    axios
      .get("http://localhost:8000/api-course/")
      .then((res) =>funcCourseList(res ))
      .catch((err) => console.log(err));
  };
  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay]=  useState(false);
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }
  useLayoutEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  const [card1, setcard1] = useState(<></>)
  const [card2, setcard2] = useState(<></>)
  const [card3, setcard3] = useState(<></>)
  useEffect(() => {
   
   {
    axios.get("http://localhost:8000/api-course/")
    .then((res) => {
      
      setCourseList( res.data );
      console.log(res.data);
      
      
      setcard1(  <a href= {'product/'+res.data[0].id}><Card
      hoverable
      style={{ border: "none", width: "100%" }}
      cover={<img alt="example"width="500" height="300" src={res.data[0].img1} />}
      >
      <Meta
        id="button_giver"
        style={{ marginTop: "-2%", border: "none" }}
        title={res.data[0].title}
      />
      </Card></a>);
      
     setcard2(<a href= {'product/'+res.data[1].id}><Card
      hoverable
      style={{ border: "none", width: "100%" }}
      cover={<img alt="kart" width="500" height="300" src={res.data[1].img1} />}
      >
      <Meta
        id="button_giver"
        style={{ border: "none", marginTop: "-2%" }}
        title={res.data[1].title}
      />
      </Card></a>);
      
     setcard3(<a href= {'product/'+res.data[2].id}>
      <Card
      hoverable
      style={{ border: "none", width: "100%" }}
      cover={<img alt="couture" width="500" height="300" src={res.data[2].img1} />}
      >
      <Meta
        id="button_giver"
        style={{ border: "none", marginTop: "-2%" }}
        title={res.data[2].title}
      />
      </Card></a>);
      
    });
    }
   
  
  }, []);

  const { Meta } = Card;

  const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const options = [
    { label: "Toulouse", value: "Toulouse" },
    { label: "Muret", value: "Muret" },
  ];



  //6 activités à mettre en valeur

 if(courseList===null){
  return <div>Loading..</div>

} else {
 
  return (
    

    <div>

      <MobileView> <MenuMobile />

      <div
            className="top"
            style={{
              height: "50px",
              paddingTop: "22px",
              marginTop: "10px",
              fontSize: "20px",
            }}
          >
            Dispos aujourd'hui.
          </div>
         
      <Carousel autoplay="true" dotPosition="top">
            <div>
              {card1}
            </div>
            <div>
              {card2}
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <div
            className="top"
            style={{
              height: "50px",
              paddingTop: "22px",
              marginTop: "-30px",
              fontSize: "20px",
            }}
          >
            Dispos aujourd'hui.{" "}
          </div>
          <Carousel autoplay="true" dotPosition="top">
            <div>
           {card3}
            </div>
            <div>
              <h3 style={contentStyle}>2</h3>
            </div>
            <div>
              <h3 style={contentStyle}>3</h3>
            </div>
            <div>
              <h3 style={contentStyle}>4</h3>
            </div>
          </Carousel>
          <Button
            id="button_giver"
            style={{
              paddingBottom: "10%",
              color: "grey",
              fontSize: "20px",
              marginTop: "-10px",
              left: "20%",
              borderRadius: "25px",
              backgroundColor: "white",
              fontWeight: "500",
            }}
          >
            Proposer des Expériences
          </Button>
      
      
      
      
      
      </MobileView>
     
       
  
      <BrowserView>
      <MenuBrowser setDisplay={setDisplay} width={width} setResults={setResults} />

     
       <div
          className="div_video"
          style={{
            backgroundColor: "white",
            position: "flex",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {" "}
          <video style={{ width: "60%" }} autoPlay muted loop id="video">
            <source src={loop} type="video/mp4" />
          </video>
        </div>
 
        <div
          className="top"
          style={{
            fontSize: "200%",
            
          }}
        >
          <h3>Les plus recommandées.</h3>

        </div>

        <div
          style={{
            display: "block",
            
           
            marginLeft: "4%",
            width: "95%",
            
          }}
        >
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginRight: "4%",
            }}
          >
            {card1}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
            }}
          >
            {card2}
           
          </span>
          <span
            style={{
              position: "flex",
              
              width: "30%",
              float: "left",
              marginLeft: "4%",
            }}
          >
           {card3}
          </span>
        </div>
        <div className="top"
          
          style={{
            width: "40%",
            fontSize: "200%",
            display: "block",
            
          }}
        >
         <h3>Dispos aujourd'hui.</h3>
          
        </div>
        
        <div
          style={{
            display: "block",
            marginLeft: "4%",
            width: "95%",
            float: "left",
          }}
        >

          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginRight: "4%",
            }}
          >
            {card1}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
            }}
          >
            {" "}
           {card3}
          </span>
          <span
            style={{
              position: "flex",
              display: "inline",
              width: "30%",
              float: "left",
              marginLeft: "4%",
            }}
          >
            {card2}
          
          </span>
        </div>
      </BrowserView>
     
 <Footer width={width}/></div>
   
     

  );
};}

export default Home;