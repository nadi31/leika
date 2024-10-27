import React, { useState, useEffect } from "react";

import "./style/ProductDetail.css";

const Bloc = (props) => {
  const [content, setContent] = useState(props.content);
  const [titre, setTitre] = useState(props.titre);
  const [icone, setIcone] = useState(props.icone);
  const width = props.width;
  const height = props.height;
  const yellow = props.yellow;

  return (
    <>
      <div
        style={{
          height: height,
          display: width === "40%" ? "flex:" : "",
          justifyContent: "center",
          margin: "auto",
          marginTop: "20px",
          width: width,
        }}
      >
        <div
          className="container"
          style={{ height: "100%", marginRight: "5%" }}
        >
          <div
            className="header"
            style={{
              display: "flex",
              height: "20%",
              backgroundColor: "#FFE5D9",
              borderRadius: "40px",
              marginBottom: "10px",
              justifyContent: "center",
            }}
          >
            <div
              className="titre"
              id="nav"
              style={{
                marginTop: "4%",

                color: "#070C65",
                position: "relative",
              }}
            >
              {icone}

              {titre}
            </div>
          </div>

          <div
            style={{ color: "#070C65", lineHeight: "2" }}
            className="content"
          >
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Bloc;
