import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import {
  Input,
  Rate,
  Form,
  Table,
  Modal,
  Typography,
  Button,
  message,
} from "antd";
import axios from "axios";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";
import jwt_code from "jwt-decode";
import { SmileOutlined } from "@ant-design/icons";

const RecapOrders = (props) => {
  const userData = useAuth();
  const [unique, setUnique] = useState([]);
  const [resFavoris, setResFavoris] = useState([]);
  const [results, setResults] = useState(null);
  const [phone, setPhone] = useState(null);
  const [pk, setPk] = useState(null);
  const [review, setReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [singleDetails, setSingleDetails] = useState([]);
  const [courseRating, setCourseRating] = useState(null);
  const [resComplete, setResComplete] = useState(undefined);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [bookingRating, setBookingRating] = useState(null);
  const [rating, setRating] = useState(null);
  const [res, setRes] = useState(null);

  const { Title, Text } = Typography;
  const columns = [
    {
      title: "Référence",
      dataIndex: "ref",
      key: "ref",
      render: (_, record) => <b>{record.booking.ref}</b>,
    },
    {
      title: "Cours",
      key: "course",
      render: (_, record) => (
        <>
          <a
            href={"http://localhost:3000/product/" + record.course.id}
            level={5}
          >
            <h3> {record.course.title}</h3>
          </a>
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
      title: "Avis",
      key: "actions",
      render: (_, record) => (
        <>
          {record.single.isCommented ? (
            <>{record.single.note}</>
          ) : (
            <Button
              onClick={() => {
                setBookingRating(record.single.id);
                setCourseRating(record.course.id);
                setIsModalVisible(true);
              }}
              style={{ color: "#FF8A65", fontFamily: "Playwrite GB S" }}
            >
              Donner votre avis
            </Button>
          )}
        </>
      ),
    },
  ];
  const handleOk = () => {
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const dataSource = singleDetails.map((bookingComplete, idx) => ({
    key: idx,
    ref: bookingComplete.ref,
    course: bookingComplete.course,
    single: bookingComplete.single,
  }));
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

  const fetchData = async (userData) => {
    try {
      const [userResponse, phoneResponse] = await Promise.all([
        axios.get(`http://localhost:8000/api/cub/${userData.id_user}`, {
          headers: { Authorization: "Bearer " + userData.access },
        }),
        axios.get(`http://localhost:8000/api/cub/phone/${userData.id_user}`, {
          headers: { Authorization: "Bearer " + userData.access },
        }),
      ]);

      setResults(userResponse.data[0]);
      setPhone(phoneResponse.data[0].phone);
    } catch (error) {
      console.error("Error fetching user data:", error);
      message.error("Failed to load user data.");
    }
  };

  const fetchBookings = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api-course/cubBookings/${userData.id_user}`,
        { headers: { Authorization: "Bearer " + userData.access } }
      );

      const bookingDetails = await Promise.all(
        response.data.map(async (booking) => {
          const singleBookings = await axios.get(
            `http://localhost:8000/api-course/cubSingleBookings/${booking.id}`,
            { headers: { Authorization: "Bearer " + userData.access } }
          );

          const courses = await Promise.all(
            singleBookings.data.map(async (single) => {
              const courseDetails = await axios.get(
                `http://localhost:8000/api-course/${single.courses}`
              );
              return {
                booking,
                single,
                course: courseDetails.data,
              };
            })
          );

          return courses;
        })
      );

      setSingleDetails(bookingDetails.flat());
      setIsLoading(false);
      console.log("couses " + JSON.stringify(bookingDetails));
      //setRes(bookingDetails);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      message.error("Failed to load bookings.");
    }
  };

  useEffect(() => {
    if (userData.userData) {
      // fetchData(userData.userData);
      fetchBookings(userData.userData);
    }
  }, [userData]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : singleDetails.length > 0 ? (
        <div>
          <Modal
            title="Votre avis"
            open={isModalVisible}
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
          <MenuBrowser width={window.innerWidth} />
          <Table
            dataSource={singleDetails}
            columns={columns}
            bordered
            pagination={{ pageSize: 5 }}
            rowKey={(record) => record.ref}
          />
          <Footer />
        </div>
      ) : (
        <>Pas de commande ! </>
      )}
    </>
  );
};

export default RecapOrders;
