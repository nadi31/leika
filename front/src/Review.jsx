import React from "react";
import { Avatar, Rate } from "antd";
import "./style/review.css";
import { UserOutlined } from "@ant-design/icons";

const Review = (props) => {
  return (
    <>
      <div
        id="review"
        className="container_review"
        style={{ width: "100%", display: "flex" }}
      >
        <div className="review" style={{ width: "100%" }}>
          <Avatar
            style={{ marginRight: "1%", backgroundColor: "#ffc069" }}
            icon={<UserOutlined />}
          />

          <span style={{ marginRight: "1%" }} className="nom">
            {props.iniale}. {props.prenom}
          </span>

          <Rate
            allowHalf
            disabled
            style={{
              color: "#ffc069",
            }}
            value={props.rating}
          />

          <br />

          <span style={{}} className="statut">
            Statut: {props.statut}
          </span>

          <br />
          <span style={{}} className="title">
            {props.titre}
          </span>

          <br />
          <span className="content">{props.content}</span>
          <div
            style={{
              justifyContent: "flex-end",
              display: "flex",
              marginRight: "3%",
            }}
          >
            {" "}
            <span className="date">{props.date}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
