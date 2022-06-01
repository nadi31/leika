import React, { useState, useEffect, useLayoutEffect } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Card } from "antd";
import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import axios from "axios";
import Footer from "./Footer";
import queryString from "query-string";
const Wishlist = (props) => {
  const [results, setResults] = useState([]);
  const [cubId, setCubId] = useState(null);
  const [resultForm, setResultForm] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay] = useState(false);
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }

  const { Meta } = Card;
  const request = async () => {
    const res = await axios.get(
      `http://localhost:8000/api-course/wishlist/${props.cubId}`
    );

    console.log("RESULTS REQUEST" + JSON.stringify(res.data));

    await res.data.map(async (course) => {
      console.log("COURSE" + JSON.stringify(course.course));
      const courseId = JSON.stringify(course.course);

      const courseDetails = await axios.get(
        `http://localhost:8000/api-course/${courseId}`
      );

      setResults([...results, courseDetails.data]);
    });
    console.log(results);
  };

  useEffect(() => {
    setCubId(props.cubId);
    request();

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
        {results == [] ? (
          <>Pas de favoris sauvegardés</>
        ) : (
          <>
            {results.map(function (item) {
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
