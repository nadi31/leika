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
import { EditOutlined, ContainerOutlined } from "@ant-design/icons";

import axios from "axios";

import Footer from "./Footer";
//import MenuItem from "antd/lib/menu/MenuItem";

const InfosCub = (props) => {
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

            message.success("Le mot de passe a bien été changé !");
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
        message.success("Les informations ont bien été modifiées !");
        console.log("cours_ID", res.data.id);
      })
      .catch((err) => {
        message.error("Un problème est survenu !");
      });
  };

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
    return (
      <div>
        <MenuBrowser
          team={false}
          kids={false}
          width={width}
          setResults={setResults}
        />
        <div
          style={{
            marginTop: "3%",
            width: "90%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div>
            {" "}
            <h1>Modifier les informations du compte</h1>
            <br />
            <Form
              name="edit_data_form"
              initialValues={{
                last_name: results.last_name,
                first_name: results.first_name,

                phone: phone,
              }}
              onFinish={onFinish}
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
              {!changeFirst_Name || !changePhone || !changeLast_name ? (
                <Button htmlType="submit">Modifier </Button>
              ) : (
                <></>
              )}
              <Form.Item></Form.Item>
            </Form>
            <div style={{ width: "100%", marginTop: "1%" }}>
              <h1>Modifier le mot de passe </h1>
              <Form
                name="edit_data_form"
                initialValues={{
                  last_name: results.last_name,
                  first_name: results.first_name,
                  email: results.email,
                  phone: phone,
                }}
                onFinish={onFinishMpd}
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
          </div>
        </div>
        <Footer />
      </div>
    );
  } else
    <>
      <MenuBrowser
        team={false}
        kids={false}
        width={width}
        setResults={setResults}
      />
      Loading <Footer />
    </>;

  //here
};
export default InfosCub;
