import React, { useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
import { Table, Modal, Form, Input, Button, Rate } from "antd";
import MenuBrowser from "./MenuBrowser";
import Footer from "./Footer";

const ReviewsCub = () => {
  const userData = useAuth();
  const [review, setReview] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);
  const [form] = Form.useForm();

  // Fetch Reviews
  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api-course/review/cub/${userData.userData.id_user}`,
        {
          headers: {
            Authorization: "Bearer " + userData.userData.access,
          },
        }
      );
      setReview(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    if (userData.userData) {
      fetchReviews();
    }
  }, [userData]);

  // Show Modal for Editing Review
  const showModal = (review) => {
    setCurrentReview(review);
    form.setFieldsValue({
      titre: review.titre,
      rating: review.note,
      commentaire: review.comment_cub,
    });
    setIsModalVisible(true);
  };

  // Handle Modal Submission
  const onFinishReview = async (values) => {
    try {
      await axios.post(
        `http://localhost:8000/api-course/review/cub/${userData.userData.id_user}`,
        {
          review_id: currentReview.id,
          note: values.rating,
          comment_cub: values.commentaire,
          titre: values.titre,
        },
        {
          headers: {
            Authorization: "Bearer " + userData.userData.access,
          },
        }
      );
      setIsModalVisible(false);
      fetchReviews(); // Refresh reviews after update
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Table Columns in French
  const columns = [
    {
      title: "Titre",
      dataIndex: "titre",
      key: "titre",
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note",
      render: (note) => <Rate disabled value={note} />,
    },
    {
      title: "Commentaire",
      dataIndex: "comment_cub",
      key: "comment_cub",
    },
    {
      title: "Date",
      dataIndex: "dateHour",
      key: "dateHour",
      render: (date) => new Date(date).toLocaleDateString("fr-FR"),
    },
    {
      title: "Lien vers le cours",
      dataIndex: "course",
      key: "course",
      render: (course) => (
        <a
          href={`http://localhost:3000/product/${course}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Voir le cours
        </a>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Button onClick={() => showModal(record)}>Modifier</Button>
      ),
    },
  ];

  return (
    <>
      <MenuBrowser />
      <Table dataSource={review} columns={columns} rowKey="id" />

      {/* Modal for Editing Reviews */}
      <Modal
        title="Votre avis"
        open={isModalVisible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form form={form} name="rating" onFinish={onFinishReview}>
          <Form.Item name="titre" label="Titre">
            <Input />
          </Form.Item>
          <Form.Item name="rating" label="Note">
            <Rate allowHalf />
          </Form.Item>
          <Form.Item name="commentaire" label="Commentaire">
            <Input.TextArea />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Soumettre
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Footer />
    </>
  );
};

export default ReviewsCub;
