import React, { useState, useEffect } from "react";

import { Card } from "antd";

const Wishlist = (props) => {
  const [results, setResults] = useState([]);

  const { Meta } = Card;

  useEffect(() => {
    setResults(props.results);

    //console.log("REQUEST " + JSON.stringify(values));
    // axios.get(`http://localhost:8000/api-course/search/?&sub_category=Dessin&city=`).then((res) => {
  }, []);

  return (
    <div
      className="top"
      style={{
        fontSize: "200%",
      }}
    >
      <div
        style={{
          position: "flex",
          display: "inline",
          width: "100%",
          float: "left",
          marginRight: "10%",
        }}
      >
        {results.length < 1 ? (
          <>Pas de favoris sauvegardés</>
        ) : (
          <>
            {props.results.map((item) => {
              return (
                <>
                  <span
                    style={{
                      position: "flex",
                      display: "inline",
                      width: "30%",
                      float: "left",
                    }}
                  >
                    <a href={"/product/" + item.id}>
                      <Card
                        hoverable
                        style={{ border: "none", width: "100%" }}
                        cover={<img alt="example" src={item.img1} />}
                      >
                        <Meta
                          id="button_giver"
                          style={{ marginTop: "-2%", border: "none" }}
                          title={item.title}
                        />
                      </Card>
                    </a>
                  </span>
                </>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};
export default Wishlist;
