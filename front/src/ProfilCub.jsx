import React, { useState, useEffect, useLayoutEffect } from "react";

import { useAuth } from "./AuthContext";
import {
  Card,
  Menu,
  Image,
  Space,
  Input,
  Form,
  Modal,
  Button,
  Tooltip,
  Rate,
  Table,
  Typography,
  message,
} from "antd";
import MenuBrowser from "./MenuBrowser";
import jwt_code from "jwt-decode";
import {
  MailOutlined,
  DownOutlined,
  SmileOutlined,
  LikeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  HeartOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  EditOutlined,
  ContainerOutlined,
} from "@ant-design/icons";

import axios from "axios";
import Wishlist from "./Wishlist";
import Footer from "./Footer";
import imgCub from "./cub_menu3.gif";
import HomeMobile from "./HomeMobile";
//import MenuItem from "antd/lib/menu/MenuItem";

const ProfilCub = (props) => {
  const userData = useAuth();
  const [unique, setUnique] = useState([]);
  const { Meta } = Card;
  const [resFavoris, setResFavoris] = useState([]);
  const baseURL = "http://localhost:8000";
  const [results, setResults] = useState(null);
  const [phone, setPhone] = useState(null);
  const [pk, setPk] = useState(null);
  const [review, setReview] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [singleBookings, setSingleBookings] = useState([]);
  const [singleDetails, setSingleDetails] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [changeLast_name, setChangeLast_name] = useState(true);
  const [changeFirst_Name, setChangeFirst_name] = useState(true);
  const [changeEmail, setChangeEmail] = useState(true);
  const [changePhone, setChangePhone] = useState(true);
  const [menuKey, setMenuKey] = useState(null);
  const [rating, setRating] = useState(null);
  const [id, setId] = useState(null);
  const [bookingRating, setBookingRating] = useState(null);
  const [courseRating, setCourseRating] = useState(null);
  const [single, setSingle] = useState(null);
  const [id_user, setId_user] = useState(null);
  const [id_obj_user, setId_obj_user] = useState(null);
  const { Title, Text } = Typography;

  // Columns definition for the Ant Design Table
  const columns = [
    {
      title: "Référence",
      dataIndex: "ref",
      key: "ref",
      render: (text) => <b>Réservation référence : {text}</b>,
    },
    {
      title: "Cours",
      key: "course",
      render: (_, record) => (
        <>
          <Title level={5}>{record.course.title}</Title>
          <Text>{"Commande effectuée le : "}</Text>
          <br />
          <Text strong>Date: </Text>
          {record.course.date}
          <br />
          <Text strong>Heure: </Text>
          {record.course.hour}
          <br />
          <Text strong>Nombre de place(s) réservée(s): </Text>
          {record.single.seats}
        </>
      ),
    },
    {
      title: "Atelier réservé ",
      key: "images",
      render: (_, record) => (
        <div
          style={{
            width: "70%",
          }}
        >
          <span
            style={
              {
                //float: "left",
              }
            }
            key={record.course.id}
          >
            <a href={"/product/" + record.course.id}>
              <Card
                key={"HEY" + record.course.id}
                hoverable
                style={{ border: "none", width: "100%" }}
                cover={<img alt="course" src={`${record.course.img1}`} />}
              >
                <Meta
                  id="button_giver"
                  style={{
                    marginTop: "-2%",
                    height: "160%",
                    border: "none",
                    //  width: "60%",
                  }}
                  title={record.course.title}
                />
                <Meta
                  id="button_giver"
                  style={{
                    marginTop: "-2%",
                    height: "160%",
                    border: "none",
                    textDecoration: "none",
                  }}
                  title={
                    record.course.isDiscounted ? (
                      <>
                        <p
                          style={{
                            textDecoration: "line-through",
                          }}
                        >
                          {record.course.price + "€"}
                        </p>
                        <p>{record.course.discount + "€"}</p>{" "}
                      </>
                    ) : (
                      record.course.price + "€"
                    )
                  }
                  // description={}
                />
              </Card>
            </a>
          </span>
        </div>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          {record.single.isCommented ? (
            <Text>Vous avez déjà donné votre avis.</Text>
          ) : (
            <Button
              onClick={() => {
                setBookingRating(record.single.id);
                setCourseRating(record.course.id);
                setIsModalVisible(true);
              }}
              type="primary"
            >
              Donner votre avis
            </Button>
          )}
        </>
      ),
    },
  ];

  // Data transformation to match the table format
  const dataSource = singleDetails.map((bookingComplete, idx) => ({
    key: idx,
    ref: bookingComplete.ref,
    course: bookingComplete.course,
    single: bookingComplete.single,
  }));

  const updateSize = () => {
    setWidth(window.innerWidth);
  };
  const [isLoading, setIsLoading] = useState(true);

  const showModal = (e) => {
    // console.log("TARGET " + e.target.value);
    setIsModalVisible(true);
    setBookingRating(singleDetails[e].booking);
    setCourseRating(singleDetails[e].booking.course.id);
    console.log("BOOKING ID " + bookingRating + "COURSE ID" + courseRating);
  };
  const onFinishReview = (values) => {
    console.log(values.commentaire);
    console.log(rating);

    axios
      .post(
        "http://localhost:8000/api-course/review/",
        {
          note: rating,
          commentOn: true,
          comment_cub: values.commentaire,
          cub: userData.userData.id_user,
          booking: bookingRating,
          course: courseRating,
          titre: values.titre,
        },

        {
          headers: {
            Authorization: "Bearer " + userData.userData.access,
          },
        }
      )
      .then((res) => {
        console.log("REGISTRATION LOG: " + JSON.stringify(res.data));
        setIsModalVisible(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log("ERROR" + err);
      });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const modalReview = () => {};
  const onFinishMpd = (values) => {
    const axiosInstance = axios.create({
      baseURL: "http://127.0.0.1:8000/api/",
      //timeout: 5000,
      headers: {
        Authorization: "Bearer " + userData.userData.access,
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });
    axiosInstance
      .post("token/obtain/", {
        email: userData.userData.email,
        password: values.password,
      })
      .then((res) => {
        axios
          .post(
            `http://localhost:8000/api/cub/mdp/${id_user}`,
            {
              username: userData.userData.email,

              password: values.new_password,
            },
            {
              headers: {
                Authorization: "Bearer " + userData.userData.access,
              },
            }
          )
          .then((res) => {
            setId(id_user);
          });
      })
      .catch((err) => {
        message.error("Le mot de passe est erroné");
        //    eventLogin(history);
      });
    console.log("CRETA:" + userData.userData.email + " " + values.new_password);
  };

  const onFinish = (values) => {
    console.log(values);
    let form_data = new FormData();
    form_data.append("last_name", values.last_name);
    form_data.append("first_name", values.first_name);
    form_data.append("email", values.email);
    form_data.append("username", values.email);
    form_data.append("phone", values.phone);
    // console.log("***isAdvanced", convert(isAdvanced));
    axios
      .post(`http://localhost:8000/api/cub/${id_user}`, form_data, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + userData.userData.access,
        },
      })
      .then((res) => {
        console.log("cours_ID", res.data.id);
      });
  };
  /*
  const request = async (pk_key) => {
    try {
      const singleDetail = [];
      const firstResponse = await axios.get(
        `http://localhost:8000/api-course/cubBookings/${pk_key}`
      );

      firstResponse.data.map(async (book, idx) => {
        const booking = JSON.stringify(book.id);

        const secondResponse = await axios.get(
          `http://localhost:8000/api-course/cubSingleBookings/${booking}`
        );

        Object.keys(secondResponse.data).map(async (single) => {
          let course = JSON.stringify(secondResponse.data[single].courses);

          const thirdResponse = await axios.get(
            `http://localhost:8000/api-course/${course}`
          );

          singleDetail.push(
            JSON.stringify({
              booking: booking,
              single: JSON.stringify(secondResponse.data[single]),
              course: JSON.stringify(thirdResponse.data),
            })
          );
        });
      });
      console.log("SINGLEDETAILS " + JSON.stringify(singleDetail));
      return singleDetail;
    } catch (error) {
      console.log(error);
    }
  };
*/

  const request = async (userData) => {
    console.log("REQUEST *** userData" + JSON.stringify(userData.userData));
    try {
      let singleDetail = [];
      const firstResponse = await axios.get(
        `http://localhost:8000/api-course/cubBookings/${userData.userData.id_user}`,
        {
          headers: {
            Authorization: "Bearer " + userData.userData.access,
          },
        }
      );
      await Promise.all(
        firstResponse.data.map(async (book) => {
          const booking = book.id;
          const ref = book.ref;
          const dateHour = book.dateHour;
          console.log("REF" + JSON.stringify(book));
          const secondResponse = await axios.get(
            `http://localhost:8000/api-course/cubSingleBookings/${booking}`,
            {
              headers: {
                Authorization: "Bearer " + userData.userData.access,
              },
            }
          );

          await Promise.all(
            Object.keys(secondResponse.data).map(async (single) => {
              let course = JSON.stringify(secondResponse.data[single].courses);

              const thirdResponse = await axios.get(
                `http://localhost:8000/api-course/${course}`
              );

              singleDetail.push({
                booking: booking,
                single: secondResponse.data[single],
                course: thirdResponse.data,
                ref: ref,
                date: dateHour,
              });
            })
          );
        })
      );
      console.log("SINGLEDETAILS " + JSON.stringify(singleDetail));
      setSingleDetails(singleDetail);

      async function first_function() {
        console.log("COMPLETE***" + singleDetail.length);
        singleDetail.map(function (book) {
          if (unique.includes(book.ref) == false) {
            unique.push(book.ref);
          }
        });
        return 1;
      }

      await first_function().then(console.log("COMPLETE***" + unique));

      const reviews = await axios.get(
        `http://localhost:8000/api-course/review/cub/${userData.userData.id_user}`,
        {
          headers: {
            Authorization: "Bearer " + userData.userData.access,
          },
        }
      );
      setReview(reviews.data);

      console.log("REVIEWS " + JSON.stringify(reviews.data));
      const res = await axios.get(
        `http://localhost:8000/api-course/wishlist/${userData.userData.id_user}`,
        {
          headers: {
            Authorization: "Bearer " + userData.userData.access,
          },
        }
      );

      console.log("RESULTS REQUEST" + JSON.stringify(res.data));

      await Promise.all(
        res.data.map(async (course) => {
          console.log("COURSE" + JSON.stringify(course.course));
          const courseId = JSON.stringify(course.course);

          const courseDetails = await axios.get(
            `http://localhost:8000/api-course/${courseId}`,
            {
              headers: {
                Authorization: "Bearer " + userData.userData.access,
              },
            }
          );
          console.log(courseDetails.data);
          resFavoris.push(courseDetails.data);

          console.log("RESULTS " + JSON.stringify(resFavoris));
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (e) => {
    setMenuKey(e.key);
    console.log("click", e.key);

    if (e.key === "2") {
      request(userData);
    }
    //console.log("length" + JSON.stringify(singleDetails));
  };
  const fetchData = async (userData) => {
    const res = await axios.get(
      `http://localhost:8000/api/cub/${userData.id_user}`,
      {
        headers: {
          Authorization: "Bearer " + userData.access,
        },
      }
    );

    const resPhone = await axios.get(
      `http://localhost:8000/api/cub/phone/${userData.id_user}`,
      {
        headers: {
          Authorization: "Bearer " + userData.access,
        },
      }
    );

    setPhone(resPhone.data[0].phone);
    console.log("PHONE" + JSON.stringify(phone));

    console.log("RESULTS REQUEST" + JSON.stringify(res.data));
    setResults(res.data[0]);

    console.log("RESULTS REQUEST" + results);
    setIsLoading(false);
  };

  useEffect(() => {
    console.log("USER :" + JSON.stringify(userData));
    if (userData.token !== null && userData.userData !== null) {
      setId_user(userData.userData.id_user);
      setId_obj_user(userData.userData.id_obj_user);

      fetchData(userData.userData);
    }
  }, [userData]);

  if (!isLoading && userData.userData !== undefined) {
    if (width > 700) {
      return (
        <div>
          <MenuBrowser width={width} />

          <Modal
            title="Votre avis"
            visible={isModalVisible}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
            <Form name="rating" onFinish={onFinishReview}>
              <Form.Item
                name={["titre"]}
                label="Titre"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={["rating"]} label="Note">
                {" "}
                <Rate
                  onChange={(value) => {
                    setRating(value);
                  }}
                  allowHalf
                  defaultValue={0}
                />
              </Form.Item>

              <Form.Item
                name={["commentaire"]}
                label="Commentaire"
                rules={[{ required: false }]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <div style={{ width: "100%", marginTop: "3%", display: "flex" }}>
            <Menu
              onClick={handleClick}
              style={{
                border: "none",
                width: "20%",
                display: "inline-block",
                marginTop: "0%",
              }}
              mode="vertical"
            >
              <Menu.Item key="1" icon={<ShoppingCartOutlined />} title="">
                Mes offres
              </Menu.Item>
              <Menu.Item key="2" icon={<ShoppingOutlined />} title="">
                Mes achats
              </Menu.Item>
              <Menu.Item key="3" icon={<HeartOutlined />} title="">
                Mes favoris
              </Menu.Item>
              <Menu.Item key="4" icon={<ContainerOutlined />} title="">
                Mes informations
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />} title="">
                Mot de passe
              </Menu.Item>
              <Menu.Item key="6" icon={<LikeOutlined />} title="">
                Mes Avis
              </Menu.Item>
            </Menu>
            {menuKey == "3" && localStorage.getItem("ID") != null ? (
              <>
                <Wishlist results={resFavoris} />
              </>
            ) : (
              <></>
            )}

            {menuKey === "2" ? (
              <div>
                <Table
                  dataSource={dataSource}
                  columns={columns}
                  bordered
                  pagination={{ pageSize: 5 }}
                  rowKey={(record) => record.ref}
                />
              </div>
            ) : (
              <></>
            )}
            {menuKey == "6" ? (
              <>
                <table className="table">
                  <tbody>
                    {review.map(function (review) {
                      return (
                        <tr key={review.id}>
                          <tr>
                            <td>
                              <a href={`/product/${review.course}`}>
                                Expérience
                              </a>
                              <b>{review.note}</b>
                              {review.comment_cub}
                            </td>
                          </tr>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            {menuKey === "4" ? (
              <div
                style={{
                  display: "inline-flex",
                  width: "80%",
                  marginTop: "1%",
                }}
              >
                <Form
                  name="edit_data_form"
                  initialValues={{
                    last_name: results.last_name,
                    first_name: results.first_name,
                    email: results.email,
                    phone: phone,
                  }}
                  onFinish={onFinish}
                  style={{ width: "30%" }}
                >
                  <Form.Item label="Nom" name="last_name">
                    <Input
                      style={{ width: "85%" }}
                      disabled={changeLast_name}
                      suffix={
                        <Tooltip title={"Changer votre nom"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangeLast_name(false);
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Prénom" name="first_name">
                    <Input
                      style={{ width: "85%" }}
                      disabled={changeFirst_Name}
                      suffix={
                        <Tooltip title={"Changer votre prénom"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangeFirst_name(false);
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input
                      style={{ width: "85%" }}
                      suffix={
                        <Tooltip title={"Changer votre email"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangeEmail(false);
                            }}
                          />
                        </Tooltip>
                      }
                      disabled={changeEmail}
                    />
                  </Form.Item>
                  <Form.Item label="Téléphone" name="phone">
                    <Input
                      style={{ width: "85%" }}
                      suffix={
                        <Tooltip title={"Changer votre numéro"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangePhone(false);
                            }}
                          />
                        </Tooltip>
                      }
                      disabled={changePhone}
                    />
                  </Form.Item>
                  {!changeEmail ||
                  !changeFirst_Name ||
                  !changePhone ||
                  !changeLast_name ? (
                    <Button htmlType="submit">Modifier</Button>
                  ) : (
                    <></>
                  )}
                  <Form.Item></Form.Item>
                </Form>
              </div>
            ) : (
              <></>
            )}

            {menuKey == "5" ? (
              <div style={{ width: "100%", marginTop: "1%" }}>
                <Form
                  name="edit_data_form"
                  initialValues={{
                    last_name: results.last_name,
                    first_name: results.first_name,
                    email: results.email,
                    phone: phone,
                  }}
                  onFinish={onFinishMpd}
                  style={{ width: "30%" }}
                >
                  <Form.Item label="Mot de passe actuel" name="password">
                    <Input.Password
                      style={{ width: "85%" }}
                      //disabled={changeLast_name}
                    />
                  </Form.Item>
                  <Form.Item label="Nouveau mot de passe " name="new_password">
                    <Input.Password
                      style={{ width: "85%" }}
                      //disabled={changeLast_name}
                    />
                  </Form.Item>
                  <Form.Item>
                    {" "}
                    <Button htmlType="submit">Modifier</Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <HomeMobile width={width} />
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              background: "#f1e6d0",
            }}
          >
            <img src={imgCub}></img>
          </div>
          <br />
          <Modal
            title="Votre avis"
            visible={isModalVisible}
            onOk={handleOk}
            footer={null}
            onCancel={handleCancel}
          >
            <Form name="rating" onFinish={onFinishReview}>
              <Form.Item
                name={["titre"]}
                label="Titre"
                rules={[{ required: false }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name={["rating"]} label="Note">
                {" "}
                <Rate
                  onChange={(value) => {
                    setRating(value);
                  }}
                  allowHalf
                  defaultValue={0}
                />
              </Form.Item>

              <Form.Item
                name={["commentaire"]}
                label="Commentaire"
                rules={[{ required: false }]}
              >
                <Input.TextArea />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Modal>
          <div style={{ width: "100%", display: "flex" }}>
            <Menu
              onClick={handleClick}
              style={{
                border: "none",
                // width: "100%",
                //display: "inline-block",
                // marginTop: "0%",
              }}
              mode="vertical"
            >
              <Menu.Item key="1" icon={<ShoppingCartOutlined />} title="">
                Mes offres
              </Menu.Item>
              <Menu.Item key="2" icon={<ShoppingOutlined />} title="">
                Mes achats
              </Menu.Item>
              <Menu.Item key="3" icon={<HeartOutlined />} title="">
                Mes favoris
              </Menu.Item>
              <Menu.Item key="4" icon={<ContainerOutlined />} title="">
                Mes informations
              </Menu.Item>
              <Menu.Item key="5" icon={<SettingOutlined />} title="">
                Mot de passe
              </Menu.Item>
              <Menu.Item key="6" icon={<LikeOutlined />} title="">
                Mes Avis
              </Menu.Item>
            </Menu>
            {menuKey === "3" && userData.userData != null ? (
              <>
                <Wishlist results={resFavoris} />
              </>
            ) : (
              <></>
            )}

            {menuKey === "2" ? (
              <div>
                <table className="table">
                  <tbody>
                    {unique.map((bookingRef) => {
                      return (
                        <tr key={bookingRef}>
                          <tr>
                            <td>
                              <b>Réservation référence : {bookingRef}</b>
                            </td>
                          </tr>
                          {singleDetails.map((bookingComplete, idx) => {
                            if (bookingRef === bookingComplete.ref) {
                              return (
                                <tr key={idx}>
                                  <td>
                                    {bookingComplete.course.id}
                                    {bookingComplete.course.title}
                                    {bookingComplete.single.isCommented ? (
                                      <></>
                                    ) : (
                                      <Button
                                        value={idx}
                                        onClick={() => {
                                          console.log(
                                            "BOOKING " +
                                              bookingComplete.ref +
                                              "COURSE " +
                                              bookingComplete.course.id +
                                              "booking " +
                                              bookingComplete.single.id
                                          );
                                          setBookingRating(
                                            bookingComplete.single.id
                                          );
                                          setCourseRating(
                                            bookingComplete.course.id
                                          );
                                          setIsModalVisible(true);
                                        }}
                                        style={{ border: "none" }}
                                      >
                                        Donner votre avis
                                      </Button>
                                    )}
                                  </td>
                                </tr>
                              );
                            }
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <></>
            )}
            {menuKey === "6" ? (
              <>
                <table className="table">
                  <tbody>
                    {review.map(function (review) {
                      return (
                        <tr key={review.id}>
                          <tr>
                            <td>
                              <a href={`/product/${review.course}`}>
                                Expérience
                              </a>
                              <b>{review.note}</b>
                              {review.comment_cub}
                            </td>
                          </tr>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            ) : (
              <></>
            )}
            {menuKey == "4" ? (
              <div style={{ display: "flex" }}>
                <Form
                  name="edit_data_form"
                  initialValues={{
                    last_name: results.last_name,
                    first_name: results.first_name,
                    email: results.email,
                    phone: phone,
                  }}
                  onFinish={onFinish}
                  style={{ width: "100%" }}
                >
                  <Form.Item label="Nom" name="last_name">
                    <Input
                      style={{ width: "85%" }}
                      disabled={changeLast_name}
                      suffix={
                        <Tooltip title={"Changer votre nom"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangeLast_name(false);
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Prénom" name="first_name">
                    <Input
                      style={{ width: "85%" }}
                      disabled={changeFirst_Name}
                      suffix={
                        <Tooltip title={"Changer votre prénom"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangeFirst_name(false);
                            }}
                          />
                        </Tooltip>
                      }
                    />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input
                      style={{ width: "85%" }}
                      suffix={
                        <Tooltip title={"Changer votre email"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangeEmail(false);
                            }}
                          />
                        </Tooltip>
                      }
                      disabled={changeEmail}
                    />
                  </Form.Item>
                  <Form.Item label="Téléphone" name="phone">
                    <Input
                      style={{ width: "85%" }}
                      suffix={
                        <Tooltip title={"Changer votre numéro"}>
                          <Button
                            style={{ border: "none" }}
                            icon={<EditOutlined />}
                            onClick={() => {
                              setChangePhone(false);
                            }}
                          />
                        </Tooltip>
                      }
                      disabled={changePhone}
                    />
                  </Form.Item>
                  {!changeEmail ||
                  !changeFirst_Name ||
                  !changePhone ||
                  !changeLast_name ? (
                    <Button htmlType="submit">Modifier</Button>
                  ) : (
                    <></>
                  )}
                  <Form.Item></Form.Item>
                </Form>
              </div>
            ) : (
              <></>
            )}

            {menuKey == "5" ? (
              <div style={{ width: "100%", marginTop: "1%" }}>
                <Form
                  name="edit_data_form"
                  initialValues={{
                    last_name: results.last_name,
                    first_name: results.first_name,
                    email: results.email,
                    phone: phone,
                  }}
                  onFinish={onFinishMpd}
                  style={{ width: "100%" }}
                >
                  <Form.Item label="Mot de passe actuel" name="password">
                    <Input.Password
                      style={{ width: "85%" }}
                      //disabled={changeLast_name}
                    />
                  </Form.Item>
                  <Form.Item label="Nouveau mot de passe " name="new_password">
                    <Input.Password
                      style={{ width: "85%" }}
                      //disabled={changeLast_name}
                    />
                  </Form.Item>
                  <Form.Item>
                    {" "}
                    <Button htmlType="submit">Modifier</Button>
                  </Form.Item>
                </Form>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      );
    }
  } else <>Loading</>;

  //here
};
export default ProfilCub;
