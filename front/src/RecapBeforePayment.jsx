import React, { useState, useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Button,
  Divider,
  Typography,
  Modal,
  message,
  Form,
  Input,
} from "antd";
import "antd/dist/reset.css";
import Connexion from "./Connexion";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

const RecapBeforePayment = ({ items }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Assume a way to determine if user is authenticated
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [id_user, setId_user] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const { userData } = useAuth();
  const navigate = useNavigate();

  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.seats,
    0
  );
  useEffect(() => {
    if (userData !== null) {
      setIsAuthenticated(true);
      setUserEmail(userData.email);
      setId_user(userData.id_obj_user);
    } else {
      setIsAuthenticated(false);
    }
  }, [userData]);

  const handlePayment = async () => {
    if (!isAuthenticated) {
      setIsModalVisible(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api-course/bookings/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items,
            id_user: id_user,
            totalAmount,
            userEmail,
            emailsGiver: items.map((item) => item.emailGiver), // Emails of responsible people for the courses
          }),
        }
      );

      if (response.ok) {
        console.log("Emails sent successfully");
      } else {
        console.error("Failed to send emails");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogin = () => {
    login(email, password);
    setIsAuthenticated(true);
    setIsModalVisible(false);
    message.success("Connexion réussie");
  };

  return (
    <div
      style={{
        padding: "30px",
        fontFamily: "Dosis, sans-serif",
      }}
    >
      <Title level={2} style={{ textAlign: "center", color: "#333333" }}>
        Récapitulatif de Paiement
      </Title>
      {items.map((item) => (
        <Card
          key={item.key}
          bordered={false}
          style={{ margin: "20px 0", padding: "20px", borderRadius: "10px" }}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <img
                alt={item.name}
                src={item.img}
                style={{ width: "70%", height: "auto", borderRadius: "10px" }}
              />
            </Col>
            <Col xs={24} md={16}>
              <Title level={4}>{item.name}</Title>
              <Text strong>Donneur :</Text> {item.giver}
              <br />
              <Text strong>Adresse :</Text> {item.adress}
              <br />
              <Text strong>Contact :</Text> {item.contactGiver}
              <br />
              <Text strong>Date :</Text> {item.hourSelected.date} -{" "}
              {item.hourSelected.hour}
              <br />
              <Text strong>Prix :</Text> {item.price} {item.currency}
              <br />
              <Text strong>Places :</Text> {item.seats}
              <br />
              <Text strong>Total pour cet article :</Text>{" "}
              {item.price * item.seats} {item.currency}
            </Col>
          </Row>
        </Card>
      ))}
      <Divider />
      <Title
        level={3}
        style={{ textAlign: "center", marginTop: "20px", color: "#333333" }}
      >
        Montant Total : {totalAmount} €
      </Title>
      <Row justify="center">
        <Button
          type="primary"
          size="large"
          style={{
            marginTop: "20px",
            backgroundColor: "#a3b09a",
            borderColor: "#a3b09a",
          }}
          onClick={handlePayment}
        >
          Procéder au Paiement
        </Button>
      </Row>
      <Modal
        title="Connexion Requise"
        footer={null}
        centered
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={500}
      >
        <Form name="form_connexion" onFinish={handleLogin}>
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
                setEmail(e.target.value);
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
                setPassword(e.target.value);
              }}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              borderRadius: "25px",
              backgroundColor: "#a3b09a",
              borderColor: "#a3b09a",
            }}
          >
            Se connecter
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default RecapBeforePayment;
