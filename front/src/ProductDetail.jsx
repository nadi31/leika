import MenuBrowser from "./MenuBrowser";
import Bloc from "./Bloc";
import * as moment from "moment";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  Rate,
  Card,
  Steps,
  Button,
  InputNumber,
  AutoComplete,
  Carousel,
  Tabs,
  Timeline,
  Image,
  Avatar,
  List,
  Breadcrumb,
  message
} from "antd";
import kart from "./kart.jpg";
import para from "./para.jpg";
import couture from "./couture.jpg";
import logo2 from "./logo2.png";
import { BrowserView, MobileView } from "react-device-detect";
import MenuMobile from "./MenuMobile";
import Review from "./Review";
import Footer from "./Footer";
import axios from "axios";
import "./style/ProductDetail.css";
import {
  HomeOutlined,
  DownCircleOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
  RocketTwoTone,
  ExperimentTwoTone,
  EnvironmentTwoTone,
  HeartOutlined,
  ThunderboltTwoTone,
  BulbOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { isArrayLiteralExpression } from "typescript";

const ProductDetail = (props) => {
  const { TabPane } = Tabs;
  const [course, setCourse] = useState(null);
  const [giver, setGiver] = useState(null);
  const [hours, setHours] = useState(null);
  const [maxSeats, setMaxSeats] = useState(null);
  const [hourSelected, setHourSelected] = useState({});
  const [valueInput, setValueInput] = useState(1);
  const [a, setA] = useState([]);
  const timeMenu = (date, hour, seats) => {
    return (
      <Timeline.Item>
        <Button
          onClick={() => {
            setCurrent(1);
            setMaxSeats(seats);
            setHourSelected({ date, hour });
          }}
          style={{ borderRadius: "25px", width: "100%" }}
        >
          Le {date} à {hour} - {seats} place(s)
        </Button>
      </Timeline.Item>
    );
  };
  /*
  const renderCourse = () => {
    axios
      .get(`http://localhost:8000/api-course/${coursesID}`)
      .then((res) => {
        setCourse(res.data);
        console.log("RES" + course);
        axios
          .get(`http://localhost:8000/api/giver/${res.data.owner}`)
          .then((res2) => {
            setGiver(res2.data);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };*/

  const myRef = useRef(null);
  const [current_tab, setCurrent] = React.useState(0);

  const steps = [
    {
      title: (
        <Button
          onClick={() => {
            setCurrent(0);
          }}
          style={{ border: "none" }}
        >
          Choisir la date et l'heure
        </Button>
      ),
      content: (
        <>
          <div
            className="div_choix"
            style={{ overflow: "auto", width: "70%", height: "100px" }}
          >
            <div ref={myRef}>
              <Timeline style={{ marginTop: "5%", marginLeft: "1%" }}>
                {hours
                  ? hours.map((h) =>
                      timeMenu(
                        moment(h.date).format("DD/MM/YYYY"),
                        h.hour.slice(0, -3),
                        h.seats
                      )
                    )
                  : null}
              </Timeline>
            </div>
          </div>{" "}
          {hours && hours.length > 2 ? (
            <Button
              style={{
                marginTop: "-50px",
                width: "58%",
                justifyContent: "center",
                border: "none",
                marginLeft: "3%",
              }}
              onClick={() => {
                console.log(myRef);
                executeScroll();
              }}
            >
              <CaretDownOutlined style={{ color: "#ffa940" }} /> Plus de dates
              <CaretDownOutlined style={{ color: "#ffa940" }} />
            </Button>
          ) : (
            <></>
          )}
        </>
      ),
    },

    {
      title: (
        <Button
          onClick={() => {
            setCurrent(1);
          }}
          style={{ border: "none" }}
        >
          Sélectionner le nombre de place(s)
        </Button>
      ),
      content: (
        <div style={{ marginTop: "20px" }}>
          Nombre de place(s){" "}
          <Button
            onClick={() => {
              if (valueInput <= 1) {
                setValueInput(1);
              } else {
                setValueInput(valueInput - 1);
              }
            }}
          >
            -
          </Button>
          <InputNumber
            style={{ height: "33%", width: "50px" }}
            value={valueInput}
            onChange={(e) => {
              if (e > maxSeats) {
                setValueInput(maxSeats);
              }
              if (e < 1) {
                setValueInput(1);
              }
            }}
          ></InputNumber>
          <Button
            onClick={() => {
              if (valueInput >= maxSeats) {
                setValueInput(maxSeats);
              } else if (valueInput < 1) {
                setValueInput(1);
              } else {
                setValueInput(valueInput + 1);
              }
            }}
          >
            +
          </Button>
          <Button
            id="button"
            style={{
              backgroundColor: "#ffd04f",
              borderRadius: "25px",
              width: "70%",
              marginTop: "34px",
              marginLeft: "5%",
            }}
            onClick={() => {
              let init_cart=  JSON.parse(localStorage.getItem("cart") || "[]");
              let items = JSON.parse(localStorage.getItem("cart") || "[]");

              items.push({
                key: courseID,
                name: course.title,
                price: course.price,
                seats: valueInput,
                img: course.img1,
                maxSeats: maxSeats,
                hourSelected: hourSelected,
              });
              let itemsOrdered = refactorizedData(items, init_cart);
              localStorage.setItem("cart", JSON.stringify(itemsOrdered));

              /*  let a = null;
              
                if (localStorage.getItem("cart")) {
                   a = localStorage.getItem("cart");
                
                console.log("A " + a);
                
                a.push(JSON.stringify({
                  key: courseID,
                  name: course.title,
                  price: course.price,
                  seats: valueInput,
                  img: course.img1,
                  maxSeats: maxSeats,
                  hourSelected: hourSelected,
                }));
                localStorage.setItem("cart", a);
              } else {
                console.log("HEY")
                let a = JSON.stringify({
                  key: courseID,
                  name: course.title,
                  price: course.price,
                  seats: valueInput,
                  img: course.img1,
                  maxSeats: maxSeats,
                  hourSelected: hourSelected,
                });

                localStorage.setItem("cart", a);
              }*/
            }}
          >
            Ajouter au panier !
            <ShoppingCartOutlined
              style={{ color: "#eb0a0c", fontSize: "bold" }}
            />
          </Button>{" "}
        </div>
      ),
    },
  ];
  const courseID = props.match.params.courseID;
  const { Step } = Steps;
  const [imagePrincipale, setImagePrincipale] = useState(kart);
  const [width, setWidth] = useState(window.innerWidth);
  const [small, setSmall] = useState("horizontal");
  const refactorizedData = (dataForBasket, initBasket) => {
    //let dataForBasket = JSON.parse(localStorage.getItem("cart") || "[]");
    //let dataForBasket = localStorage.getItem("cart")|| []

    console.log("DATA refactorized " + dataForBasket.length + dataForBasket);
    let result = [];

    for (let i = 0; i < dataForBasket.length; i++) {
      for (let y = 0; y < dataForBasket.length; y++) {
        if (
          dataForBasket[i].key == dataForBasket[y].key &&
          y != i &&
          dataForBasket[i].hourSelected.hour ==
            dataForBasket[y].hourSelected.hour &&
          dataForBasket[i].hourSelected.date ==
            dataForBasket[y].hourSelected.date
        ) {
          if (dataForBasket[y].maxSeats>=
            dataForBasket[y].seats + dataForBasket[i].seats 
             
          ) {
            dataForBasket[y].seats += dataForBasket[i].seats;

            result.push(dataForBasket[y]);
            dataForBasket.splice(y, 1);
            dataForBasket.splice(i, 1);
          } else {
            message.info('Il n\'y a plus de place pour la date et l\'heure sélectionnées');
            //result.push(dataForBasket[y]);
            dataForBasket.splice(i, 1);
            dataForBasket.splice(y, 1);
            result = initBasket;
            dataForBasket = []
          }

          //console.log(dataForBasket[i].name)
        }
      }
    }
    dataForBasket.map((itemIsole, pos) => {
      result.map((groupe) => {
        if (
          itemIsole.key == groupe.key &&
          itemIsole.hourSelected.hour == groupe.hourSelected.hour &&
          itemIsole.hourSelected.date == groupe.hourSelected.date
        ) {
          groupe.seats += itemIsole.seats;
          dataForBasket.splice(pos, 1);
        }
      });
    });
    dataForBasket.map((itemIsole) => result.push(itemIsole));

    // return console.log(arrays);
    console.log(JSON.stringify(result));
    console.log(dataForBasket);
    //console.log(dataForBasket);

    return result;
  };

  function updateSize() {
    setWidth(window.innerWidth);
  }
  const executeScroll = () => {
    myRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
  };

  /*  useEffect(() => {
    
    if(course === null)
     {
      renderCourse();
    }
    if (!(myRef.current === null)){executeScroll();update_sens();
  }}, [course, giver, myRef.current])
  
  
  if(course===null) {
  
    return null
  }
*/

  useEffect(() => {
    if (!myRef.current === null) {
      executeScroll();
      update_sens();
    }
    {
      const courseID = props.match.params.courseID;
      axios
        .get(`http://localhost:8000/api-course/${courseID}`)
        .then((res) => {
          axios
            .get(`http://localhost:8000/api/giver/${res.data.owner}`)
            .then((res2) => {
              setGiver(res2.data);
            })
            .catch((err) => console.log(err));
          axios
            .get(`http://localhost:8000/api-course/hours/${courseID}`)
            .then((res3) => {
              setHours(res3.data);
              console.log("HOURS " + hours);
              hours.map((n) => console.log(n));
            })
            .catch((err) => console.log(err));
          setCourse(res.data);
          console.log("RES" + course);
        })
        .catch((err) => console.log(err));
    }
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

  if (course === null) {
    return <div>Loading..</div>;
  } else {
    return (
      <>
        <MobileView>
          <MenuMobile />
        </MobileView>

        <BrowserView>
          <MenuBrowser width={width}/>
        </BrowserView>

        <div style={{ width: "100%" }}>
          <div style={{ display: width <= 1200 ? "" : "flex", width: "100%" }}>
            <div style={{ width: width <= 1200 ? "100%" : "40%" }}>
              {width <= 1200 ? (
                <>
                  <div
                    style={{
                      width: "80%",
                      display: "bloc",
                      margin: "20px auto",
                    }}
                  >
                    <Carousel autoplay={true}>
                      <div>
                        <Image preview={false} src={course.img1} />
                      </div>

                      <div>
                        <Image preview={false} src={course.img2} />
                      </div>
                      <div>
                        <Image preview={false} src={course.img3} />
                      </div>
                    </Carousel>
                  </div>
                </>
              ) : (
                <div
                  style={{
                    position: "sticky",
                    top: "0px",
                    width: "100%",
                    marginLeft: "5%",
                  }}
                >
                  <div style={{ width: "30%", marginTop: "15%" }}>
                    <Card
                      className="product_card"
                      onClick={() => {
                        setImagePrincipale(course.img1);
                      }}
                      hoverable
                      style={style_icone}
                      cover={<Image preview={false} src={course.img1} />}
                    />
                    <Card
                      className="product_card"
                      onClick={() => {
                        setImagePrincipale(course.img2);
                      }}
                      hoverable
                      style={style_icone}
                      cover={<Image preview={false} src={course.img2} />}
                    />
                    <Card
                      className="product_card"
                      onClick={() => {
                        setImagePrincipale(course.img3);
                      }}
                      hoverable
                      style={style_icone}
                      cover={<Image preview={false} src={course.img3} />}
                    />
                  </div>
                  <div
                    style={{
                      width: "70%",
                      marginLeft: "20%",
                      marginTop: "-38%",
                    }}
                  >
                    <Card
                      className="product_card"
                      style={{ width: "100%" }}
                      cover={
                        <Image
                          preview={false}
                          style={{ width: "100%" }}
                          src={imagePrincipale}
                        />
                      }
                    ></Card>
                  </div>
                </div>
              )}
            </div>

            <div
              style={{
                margin: width <= 1200 ? "auto" : "0 0 0 2%",
                display: width <= 1200 ? "bloc" : "",
                width: width <= 1200 ? "80%" : "40%",
                marginTop: "2%",
              }}
            >
              <Breadcrumb>
                <Breadcrumb.Item href="">
                  <HomeOutlined />
                </Breadcrumb.Item>
                <Breadcrumb.Item href="">
                  <span>
                    <ThunderboltTwoTone twoToneColor="#ffc069" />
                    Sports Extrêmes
                  </span>
                </Breadcrumb.Item>
              </Breadcrumb>
              <span className={"title_activity"}>{course.title}</span>
              <br />
              <Rate
                style={{
                  color: "#ffc069",
                }}
                allowHalf
                defaultValue={4.75}
              />{" "}
              <a
                style={{
                  color: "#02245c",
                  marginLeft: "10px",
                  textDecoration: "underline",
                }}
              >
                300 avis
              </a>
              <br />
              <span className="accroche" style={{ marginRight: "70px" }}>
                {course.price}€
              </span>
              <span>
                <EnvironmentTwoTone twoToneColor="#02245c" />
                134, Boulevard de la Paix
              </span>
              <br />
              <br />
              <span className="accroche">
                Une ascension à plus de 1000 mètres, pour les plus témérères.
              </span>
              <br />
              <br />
              <span className="description">
                {course.content}
                <a
                  style={{
                    marginLeft: "10px",
                    color: "#02245c",
                    textDecoration: "underline",
                  }}
                  href=""
                >
                  Voir plus
                </a>
              </span>
              <br />
              <br />
              <br />
              {width <= 1200 ? (
                <div style={{ width: "100%" }}>
                  {steps[0].content}
                  {steps[1].content}
                </div>
              ) : (
                <>
                  <Steps direction={"horizontal"} current={current_tab}>
                    {steps.map((item) => (
                      <Step key={item.title} title={item.title} />
                    ))}
                  </Steps>
                  <div className="steps-content" style={{ marginTop: "3%" }}>
                    {steps[current_tab].content}
                  </div>
                </>
              )}
              <br />
              <br />
            </div>
          </div>
        </div>

        <div
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div style={{ width: "80%" }}>
            <Steps direction={small} size="small" current={(1, 2, 3)}>
              <Step
                title="🐓 Choisir une entreprise Française 🇫🇷 "
                description="Nous sommes localisés dans la ville rose, Toulouse. Et nous ne comptons pas démanager. "
              />
              <Step
                title="🤝 Donner du sens à l'économie 🚀"
                description="Nous sélectionnons avec soin les meilleurs partenaires locaux pour vous satisfaire."
              />
              <Step
                title="✨Partager des moments uniques  🎁 "
                description="Nous faisons tout notre possible pour que vous passiez des moments inoubliables. "
              />
            </Steps>
          </div>
        </div>

        <div
          style={{
            display: width <= 1200 ? "block" : "flex",
            justifyContent: width <= 1200 ? "" : "center",
            margin: "20px auto",
          }}
        >
          {" "}
          <Bloc
            yellow={true}
            height={"900px"}
            content={
              "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de d"
            }
            icone={
              <ExperimentTwoTone
                twoToneColor="#ffa940"
                style={{ fontSize: "25px" }}
              />
            }
            titre={"Au menu de l'Expérience"}
            width={width <= 1200 ? "80%" : "40%"}
          />
          <Bloc
            yellow={true}
            height={"900px"}
            content={
              "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de d"
            }
            icone={
              <RocketTwoTone
                twoToneColor="#ffa940"
                style={{ fontSize: "25px" }}
              />
            }
            titre={"À propos du Giver"}
            width={width <= 1200 ? "80%" : "40%"}
          />
        </div>
        <div
          style={{
            display: width <= 1200 ? "block" : "flex",
            justifyContent: width <= 1200 ? "" : "center",
            margin: "20px auto",
          }}
        >
          <Bloc
            height={"900px"}
            content={
              "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de d"
            }
            icone={
              <BulbOutlined
                twoToneColor="#ffa940"
                style={{ fontSize: "25px" }}
              />
            }
            titre={"À savoir"}
            width={width <= 1200 ? "80%" : "40%"}
          />
          <Bloc
            height={"900px"}
            content={
              "On sait depuis longtemps que travailler avec du texte lisible et contenant du sens est source de d"
            }
            icone={
              <InfoCircleOutlined
                twoToneColor="#ffa940"
                style={{ fontSize: "25px" }}
              />
            }
            titre={"Annulation"}
            width={width <= 1200 ? "80%" : "40%"}
          />
        </div>
        <Bloc
          height={"900px"}
          content={
            <div style={{ display: "block", width: "100%" }}>
              <List style={{ width: "60%", margin: "auto" }}>
                <List.Item>
                  <Review
                    iniale={"E"}
                    prenom={"Nadia"}
                    titre={"Bof..."}
                    content={
                      "Pourrairt mieux faire mais dans l'ensemble assez bien. Nourriture incluse. Big Bonnus."
                    }
                    date={"12-03-2021"}
                    rating={"3"}
                    statut={"GOLD"}
                  />
                </List.Item>
                <List.Item>
                  <Review
                    iniale={"E"}
                    prenom={"Nadia"}
                    titre={"Bof..."}
                    date={"12-03-2021"}
                    content={
                      "Pourrairt mieux faire mais dans l'ensemble assez bien. Nourriture incluse. Big Bonnus."
                    }
                    rating={"3"}
                    statut={"GOLD"}
                  />
                </List.Item>
                <List.Item>
                  <Review
                    iniale={"E"}
                    prenom={"Nadia"}
                    titre={"Bof..."}
                    date={"12-03-2021"}
                    content={
                      "Pourrairt mieux faire mais dans l'ensemble assez bien. Nourriture incluse. Big Bonnus."
                    }
                    rating={"3"}
                    statut={"GOLD"}
                  />
                </List.Item>
              </List>
            </div>
          }
          icone={
            <HeartOutlined
              twoToneColor="#ffa940"
              style={{ fontSize: "25px" }}
            />
          }
          titre={"AVIS"}
          width={"100%"}
        />

        <Footer width={width} />
      </>
    );
  }
};

export default ProductDetail;
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
