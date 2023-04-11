import React from "react";

import { Card } from "antd";

const ResCard = (props) => {
  const { Meta } = Card;
  //id+ width + img1 +title + price
  return (
    <a href={"product/" + props.info.id}>
      <Card
        hoverable
        style={{ border: "none", width: "100%" }}
        cover={
          <img
            alt="Photo activité"
            width={
              props.width >= 1500
                ? "500"
                : props.width >= 1000
                ? "300"
                : props.width >= 700
                ? "200"
                : "200"
            }
            height={
              props.width >= 1500
                ? "300"
                : props.width >= 1000
                ? "200"
                : props.width >= 600
                ? "200"
                : "200"
            }
            src={props.info.img1}
          />
        }
      >
        <Meta
          id="button_giver"
          style={{ marginTop: "-2%", border: "none" }}
          title={props.info.title}
          description={props.info.price + "€"}
        />
      </Card>
    </a>
  );
};

export default ResCard;
