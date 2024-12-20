import MenuBrowser from "./MenuBrowser";
import Bloc from "./Bloc";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { Grid } from "antd";
import MobileLayout from "./MobileLayout";

import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import {
  Rate,
  Card,
  Steps,
  Button,
  InputNumber,
  Carousel,
  Tabs,
  Timeline,
  Image,
  List,
  message,
} from "antd";

import Review from "./Review";
import Footer from "./Footer";
import axios from "axios";
import "./style/ProductDetail.css";
import {
  AlertTwoTone,
  ShoppingCartOutlined,
  CaretDownOutlined,
  HeartFilled,
  InfoCircleTwoTone,
  RocketTwoTone,
  ExperimentTwoTone,
  EnvironmentTwoTone,
  HeartOutlined,
  TrophyTwoTone,
} from "@ant-design/icons";
import { useAuth } from "./AuthContext";
const ProductDetail = (props) => {
  const userData = useAuth();
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();
  const [width, setWidth] = useState(undefined);
  const { TabPane } = Tabs;
  const [course, setCourse] = useState(null);
  const [giver, setGiver] = useState(null);
  const [hours, setHours] = useState(null);
  const [maxSeats, setMaxSeats] = useState(null);
  const [hourSelected, setHourSelected] = useState({});
  const [valueInput, setValueInput] = useState(1);
  const [adress, setAdress] = useState(null);
  const [price, setPrice] = useState(null);
  const [ratings, setRatings] = useState(null);
  const [comments, setComments] = useState([]);
  const course_id = useParams();
  const courseID = course_id["courseID"];
  const [disabled, setDisabled] = useState(false);
  const [nombreRating, setNombreRating] = useState(null);
  const [giverDescription, setGiverDescription] = useState(null);
  const [a, setA] = useState(false);
  const [kids, setKids] = useState(false);
  const [wLID, setWLID] = useState(null);
  const [offers, setOffers] = useState(null);
  const [cart, setCart] = useState(0);
  const addTotalQuantity = (e) => {
    console.log(e);
    setCart(e);
  };

  const deletedToWishlist = () => {
    if (localStorage.getItem("ID") !== "null" && a) {
      axios
        .delete(
          `http://localhost:8000/api-course/wishlist/${wLID}`,

          {
            id: wLID,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          message.success("Supprimé des Favoris");
          setA(false);
        })
        .catch((err) => {
          message.error("Déjà supprimé des favoris");
        });
    }
  };
  const addedToWishlist = () => {
    if (localStorage.getItem("ID") !== "null") {
      axios
        .post(
          `http://localhost:8000/api-course/wishlist/${userData.userData.id_user}`,

          {
            cub: localStorage.getItem("ID_user"),
            course: courseID,
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((res) => {
          message.success("Ajouté Aux Favoris");
          setA(true);
        })
        .catch((err) => {
          message.error("Déjà ajouté aux favoris");
        });
    } else {
      message.error("Veuillez vous connecter");
    }
  };
  const timeMenu = (date, hour, seats, dateFin, hourFin, id) => {
    return (
      <Timeline.Item>
        <Button
          onClick={() => {
            setCurrent(1);
            setMaxSeats(seats);
            setHourSelected({ date, hour, dateFin, hourFin, id });
          }}
          style={{ borderRadius: "25px", width: "100%" }}
        >
          Le {date} à {hour} - {seats} place(s) disponible(s)
        </Button>
      </Timeline.Item>
    );
  };
  /*
  const renderCourse = () => {
    axios
      .get()
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
            style={{
              overflow: "auto",
              width: "90%",
              height: "100px",
            }}
          >
            <div ref={myRef}>
              <Timeline
                style={{
                  marginTop: "5%",
                  marginLeft: screens.xs ? "1%" : "5%",
                }}
              >
                {hours
                  ? hours.map((h) =>
                      timeMenu(
                        dayjs(h.date).format("DD/MM/YYYY"),
                        h.hour.slice(0, -3),
                        h.seats,
                        h.dateFin,
                        h.hourFin,
                        h.id
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
        <>
          <div
            style={{
              width: "100%",

              alignItems: "center",
            }}
          >
            Nombre de place(s){" "}
            <Button
              style={{
                width: "50px",
              }}
              onClick={() => {
                if (offers !== null) {
                  offers.map((offer, index) => {
                    valueInput - 1 >= offer.seatsFirst &&
                    valueInput <= offer.seatsLast
                      ? setPrice(offer.price)
                      : setPrice(course.price);
                  });
                }
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
              style={{ width: "75px" }}
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
              style={{ display: " inline-block" }}
              onClick={() => {
                if (offers !== null) {
                  offers.map((offer, index) => {
                    valueInput + 1 >= offer.seatsFirst &&
                    valueInput <= offer.seatsLast
                      ? setPrice(offer.price)
                      : setPrice(course.price);
                  });
                }

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
            {price ? (
              price !== course.price ? (
                <>
                  <span>pour</span>
                  <p
                    style={{
                      textDecoration: "line-through",
                      margin: 0,
                      width: "20%", // Adjust width as needed
                    }}
                  >
                    {course.price}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      width: "20%", // Adjust width as needed
                    }}
                  >
                    {price}€
                  </p>
                </>
              ) : (
                <p
                  style={{
                    margin: 0,
                    width: "20%", // Increased width
                  }}
                >
                  pour {price}€
                </p>
              )
            ) : null}
            <div />
            <br />
            <div style={{ display: "flex", width: "100%" }}>
              <Button
                id="button"
                style={{
                  backgroundColor: "#ffd04f",
                  borderRadius: "25px",
                  width: "100%",
                  marginTop: "34px",
                  //marginLeft: "5%",
                }}
                onClick={() => {
                  let init_cart = JSON.parse(
                    localStorage.getItem("cart") || "[]"
                  );
                  let items = JSON.parse(localStorage.getItem("cart") || "[]");

                  items.push({
                    key: courseID,
                    name: course.title,
                    price: course.price,
                    seats: valueInput,
                    img: course.img1,
                    maxSeats: maxSeats,
                    hourSelected: hourSelected,
                    emailGiver: giver.email_giver,
                    currency: "€",
                    owner: course.owner,
                    giver: giver.appelation,
                    adress: adress[0].name + ", " + adress[0].city,

                    contactGiver: giver.phone,
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
          </div>
        </>
      ),
    },
  ];
  const { Step } = Steps;
  const [imagePrincipale, setImagePrincipale] = useState(null);

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
          if (
            dataForBasket[y].maxSeats >=
            dataForBasket[y].seats + dataForBasket[i].seats
          ) {
            dataForBasket[y].seats += dataForBasket[i].seats;

            result.push(dataForBasket[y]);
            dataForBasket.splice(y, 1);
            dataForBasket.splice(i, 1);
          } else {
            message.info(
              "Il n'y a plus de place pour la date et l'heure sélectionnées"
            );
            //result.push(dataForBasket[y]);
            dataForBasket.splice(i, 1);
            dataForBasket.splice(y, 1);
            result = initBasket;
            dataForBasket = [];
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

    let tot = 0;

    // let itemsOrdered = refactorizedData();

    result.forEach(({ seats }) => {
      tot += seats;
    });
    localStorage.setItem("totalQuantity", JSON.stringify(tot));

    addTotalQuantity(tot);

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
  const category = (intCategory) => {
    switch (intCategory) {
      case 1:
        return "Arts Plastiques";

      case 2:
        return "Arts de scène ";

      case 11:
        return "Tours/Circuits ";

      case 3:
        return "Loisirs créatifs ";

      case 4:
        return "Professionnel ";

      case 5:
        return "Culinaire";

      case 6:
        return "Culture";

      case 7:
        return "Linguistique ";

      case 8:
        return "Sport ";

      case 9:
        return "Jeux ";

      case 10:
        return "Arts de scène ";

      default:
        break;
    }
  };
  const requests = async () => {
    setComments([]);

    try {
      const res4 = await axios.get(
        `http://localhost:8000/api-course/review/course/${courseID}`
      );

      console.log(res4.data.length);
      setNombreRating(res4.data.length);
      let sumRatings = 0;
      const first_function = async () => {
        console.log("RES 4" + JSON.stringify(res4.data));
        res4.data.forEach((single) => {
          console.log("NOTE**" + JSON.stringify(single));
          sumRatings += single.note;
          comments.push(single);
        });
        setComments(comments);

        console.log("COMMENTS" + JSON.stringify(comments));
        let division = sumRatings / nombreRating;
        setRatings(division);
        console.log(
          "SUM " + sumRatings + "nombre " + nombreRating + " == " + division
        );
      };
      await first_function().then(async () => {
        console.log("COMMENTS" + JSON.stringify(comments));

        const res3 = await axios.get(
          `http://localhost:8000/api-course/hours/${courseID}`
        );

        console.log("RES 3   " + JSON.stringify(course));
        setHours(res3.data);
        console.log("HOURS " + hours);
        if (hours != null) {
          hours.map((n) => console.log(n));
        }
        const res = await axios.get(
          `http://localhost:8000/api-course/${courseID}`
        );
        setCourse(res.data);
        setImagePrincipale(res.data.img1);

        setPrice(res.data.price);

        const res2 = await axios.get(
          `http://localhost:8000/api/giver/${res.data.owner}`
        );

        setGiver(res2.data[0]);
        setGiverDescription(res2.data[0].description);
        console.log("GIVER " + JSON.stringify(res2.data[0].description));
        console.log("FK " + res2.data[0].adress);
        const res5 = await axios.get(
          `http://localhost:8000/api/adress/${res.data.lieu}`
        );

        setAdress(res5.data);

        console.log("RES" + JSON.stringify(res5.data));

        /*   const res4 = await axios.get(
          `http://localhost:8000/api-course/create/offers/${courseID}`
        );

        setOffers(res4.data);
        offers.map((offer, index) => console.log("liste1", index, offer.id)); */

        const res6 = await axios.get(
          ` http://localhost:8000/api-course/wishlist/${userData.userData.id_user}`,
          {
            headers: {
              Authorization: "Bearer " + userData.userData.access,
            },
          }
        );
        res6.data.map((single) => {
          console.log("DEJA " + single.course + " " + courseID);
          if (JSON.stringify(single.course) === courseID) {
            setA(true);
            setWLID(single.id);
            console.log("DEJA******");
          }
        });

        setAdress(res5.data);
      });

      //setRatings(ratings );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setWidth(window.innerWidth);
    console.log("ID " + course_id["courseID"]);
    if (!myRef.current === null) {
      executeScroll();
      update_sens();
    }

    requests();
  }, [userData]);

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

  if (course === null || giverDescription === null) {
    return <div>Loading..</div>;
  } else {
    return (
      <>
        {" "}
        {screens.xs ? (
          <>
            {" "}
            <MobileLayout />
          </>
        ) : (
          <>
            <MenuBrowser />
          </>
        )}
        <>
          <div style={{ width: "100%" }}>
            <div
              id="wrap"
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  width: screens.xs ? "100%" : "40%",
                }}
              >
                <div
                  style={{
                    // position: "sticky",
                    display: "flex",
                    marginTop: "2%",
                    width: "100%",
                    marginLeft: "5%",
                  }}
                >
                  {screens.xs ? (
                    <div
                      style={{
                        width: "100%",
                        height: "25vh",
                        overflow: "hidden",
                      }}
                    >
                      <Carousel autoplay arrows infinite={true}>
                        <div>
                          <img
                            style={{
                              height: "25vh",
                              width: "100%",
                            }}
                            src={course.img1}
                            alt="Image 1"
                          />
                        </div>
                        <div>
                          <img
                            style={{
                              height: "25vh",
                              width: "100%",
                            }}
                            src={course.img2}
                            alt="Image 2"
                          />
                        </div>
                        <div>
                          <img
                            style={{
                              height: "25vh", // Fix height
                              width: "100%", // Maintain aspect ratio
                            }}
                            src={course.img3}
                            alt="Image 3"
                          />
                        </div>
                      </Carousel>
                    </div>
                  ) : (
                    <>
                      <div
                        style={{ marginTop: "2%", top: "10%", width: "20%" }}
                      >
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
                      </div>{" "}
                      <div
                        style={{
                          width: "70%",
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
                    </>
                  )}
                </div>
              </div>

              <div
                style={{
                  color: "#070C65",
                  margin: screens.xs ? "0% 0% 0% 9%" : "0 0 0 2%",
                  display: width <= 1200 ? "bloc" : "",
                  width: width <= 1200 ? "100%" : "50%",
                }}
              >
                <span
                  style={{
                    fontFamily: "Dosis",
                    fontWeight: "500",
                  }}
                  className={"title_activity"}
                >
                  {course.title}
                </span>
                <br />
                <Rate
                  style={{
                    color: "#ffc069",
                    marginTop: "2%",
                    marginBottom: "2%",
                  }}
                  disabled
                  allowHalf
                  value={ratings}
                />{" "}
                <a
                  style={{
                    color: "#02245c",
                    marginLeft: "10px",
                    textDecoration: "underline",
                  }}
                >
                  {nombreRating} avis
                </a>{" "}
                {a ? (
                  <HeartFilled
                    style={{ color: "#ffc069" }}
                    onClick={deletedToWishlist}
                  />
                ) : (
                  <HeartOutlined
                    style={{ color: "#ffc069" }}
                    onClick={addedToWishlist}
                  />
                )}
                <br /> <br />
                <span>
                  <EnvironmentTwoTone twoToneColor="#FF8A65" />
                  {adress
                    ? adress[0].name + ", " + adress[0].city
                    : "chargement"}
                </span>
                <br />
                <br />
                <span className="accroche">{course.accroche}</span>
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
                    href="#descr"
                  >
                    Voir plus
                  </a>
                </span>
                <br /> <br />
                <span className="accroche" style={{ marginRight: "70px" }}>
                  {course.price} € par place
                </span>
                <br /> <br />
                {/* <span>
                {offers !== null ? (
                  <>
                    <ThunderboltTwoTone twoToneColor="ffa940 " />
                    Offre spéciale
                    <ThunderboltTwoTone twoToneColor="ffa940 " />
                    <br />
                    <br />
                    {offers.map((offer, index) => (
                      <span>
                        <ThunderboltTwoTone twoToneColor="ffa940 " />
                        {"À partir de  " +
                          offer.seatsFirst +
                          " jusqu'à " +
                          offer.seatsLast +
                          " places: " +
                          offer.price +
                          " €"}{" "}
                      </span>
                    ))}
                  </>
                ) : null}
              </span> */}
                <>
                  <Steps
                    style={{ color: "#070C65" }}
                    direction={"horizontal"}
                    current={current_tab}
                  >
                    {steps.map((item) => (
                      <Step
                        style={{ color: "#070C65" }}
                        key={item.title}
                        title={item.title}
                      />
                    ))}
                  </Steps>
                  <div className="steps-content" style={{ marginTop: "3%" }}>
                    {steps[current_tab].content}
                  </div>
                </>
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
            id="descr"
            style={{
              display: width <= 1200 ? "block" : "flex",
              justifyContent: width <= 1200 ? "" : "center",
              margin: "20px auto",
            }}
          >
            {" "}
            <Bloc
              yellow={true}
              height={"400px"}
              content={course.content}
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
              height={"400px"}
              content={
                <div style={{ justifyContent: "center" }}>
                  <a href={"http://localhost:3000/giver/" + giver.id}>
                    <Image
                      style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                      }}
                      preview={false}
                      src={"http://localhost:8000/" + giver.img1}
                    />{" "}
                  </a>
                  <a href={"http://localhost:3000/giver/" + giver.id}>
                    {" "}
                    <h2> {giver.appelation}</h2>
                  </a>
                  <p>{giver.description}</p>
                </div>
              }
              icone={
                <RocketTwoTone
                  twoToneColor="#ffd166"
                  style={{ fontSize: "25px" }}
                />
              }
              titre={"Proposé par"}
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
              yellow={true}
              height={"400px"}
              content={course.aSavoir}
              icone={
                <AlertTwoTone
                  twoToneColor="#ffd166"
                  style={{ fontSize: "25px" }}
                />
              }
              titre={"À savoir"}
              width={width <= 1200 ? "80%" : "40%"}
            />
            <Bloc
              yellow={true}
              height={"400px"}
              content={course.annulation}
              icone={
                <InfoCircleTwoTone
                  twoToneColor="#ffd166"
                  style={{ fontSize: "25px" }}
                />
              }
              titre={"Annulation"}
              width={width <= 1200 ? "80%" : "40%"}
            />
          </div>
          <Bloc
            height={"400px"}
            content={
              <div style={{ display: "block", width: "100%" }}>
                <List style={{ width: "60%", margin: "auto" }}>
                  {comments.map((comment) => {
                    return (
                      <List.Item>
                        <Review
                          iniale={comment.initiale}
                          prenom={comment.prenom}
                          titre={comment.titre}
                          content={comment.comment_cub}
                          date={comment.dateHour.date}
                          rating={comment.note}
                        />
                      </List.Item>
                    );
                  })}
                </List>
              </div>
            }
            icone={
              <TrophyTwoTone
                twoToneColor="#ffd166"
                style={{ fontSize: "25px" }}
              />
            }
            titre={"AVIS"}
            width={"50%"}
          />

          <Footer width={width} />
        </>
      </>
    );
  }
};

export default ProductDetail;
