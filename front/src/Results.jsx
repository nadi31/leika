import React, { useState,  useEffect, useLayoutEffect} from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { Card} from "antd";
import MenuBrowser from "./MenuBrowser";
import MenuMobile from "./MenuMobile";
import axios from "axios";
import Footer from "./Footer";
import queryString from 'query-string';
const Results = (props) => {

const [results, setResults] = useState(null);
const [resultForm, setResultForm] = useState(null);
const [width, setWidth] = useState(window.innerWidth);
  const [display, setDisplay]=  useState(false);
  function updateSize() {
    setWidth(window.innerWidth);
    console.log(window.innerWidth);
  }
  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

      const { Meta } = Card;
      

      useEffect(() => {
        console.log("REQUEST1 "+props.params);
        const { location: { search } } = props;
        const values = queryString.parse(search);

         
          const request = props.match.params.request;
          
          console.log("REQUEST "+JSON.stringify(values));
         // axios.get(`http://localhost:8000/api-course/search/?&sub_category=Dessin&city=`).then((res) => {
          axios.get(`http://localhost:8000/api-course/search/?${request}`).then((res) => {
          console.log("RESULTS REQUEST"+res.data);
          setResults(res.data);
          setResultForm (results.map(res => {
            return (
          
                 <span
                      style={{
                        position: "flex",
                        display: "inline",
                        width: "30%",
                        float: "left",
                        
                      }}
                    >
                     
              <a href= {'/product/'+res.id}><Card
                hoverable
                style={{ border: "none", width: "100%" }}
                cover={<img alt="example" src={res.img1} />}
                >
                <Meta
                  id="button_giver"
                  style={{ marginTop: "-2%", border: "none" }}
                  title={res.title}
                />
                </Card></a> 
                    </span>
            );
          }));





       }).catch((err) => console.log(err));}, [])
      
      

return (
<BrowserView>
      <MenuBrowser width={width} />
< div
          className="top"
          style={{
            fontSize: "200%",
          }}
        >
          Résultats de la recherche {" "}
      

        <div
          style={{
            position: "flex",
            display: "inline",
            width: "100%",
            float: "left",
            marginRight: "10%",
          }}
        >
  {results==null?(<>Loading</>):(results.map(res => {
            return (
          
                 <span
                      style={{
                        position: "flex",
                        display: "inline",
                        width: "30%",
                        float: "left",
                        marginRight: "3%",
                        
                      }}
                    >
                     
              <a href= {'/product/'+res.id}><Card
                hoverable
                style={{ border: "none", width: "100%" }}
                cover={<img alt="example" src={res.img1} />}
                >
                <Meta
                  id="button_giver"
                  style={{ marginTop: "-2%", border: "none" }}
                  title={res.title}
                />
                </Card></a> 
                    </span>
            );
          }))}
</div></div>
<Footer width={width}/>
</BrowserView>
)




        }
export default Results;