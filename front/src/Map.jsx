import React, { useState, useEffect, useCallback } from "react";
import { Marker } from "@react-google-maps/api";
import { InfoBox } from "@react-google-maps/api";
import Geocode from "react-geocode";
import {
  Card,
  Slider,
  DatePicker,
  Form,
  Menu,
  Tag,
  Breadcrumb,
  InputNumber,
  Cascader,
  Switch,
  Button,
} from "antd";
import {
  GoogleMap,
  LoadScript,
  MarkerClusterer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { InfoWindow } from "@react-google-maps/api";
import dancee from "./star.png";
import mom from "./mom.png";

import { forEach } from "lodash";

const containerStyle = {
  width: "500px",
  height: "1000px",
};

const divStyle = {
  background: `white`,
  border: `1px solid #ccc`,
  padding: 15,
};
const options = { closeclick: true, enableEventPropagation: true };

const onLoad = (marker) => {
  console.log("marker: ", marker);
};
const centers = [
  {
    lat: 37.772,
    lng: -122.214,
  },
  {
    lat: 37.672,
    lng: -122.219,
  },
  {
    lat: 37.832,
    lng: -122.424,
  },
];
const { Meta } = Card;

const position = {
  lat: 37.772,
  lng: -122.214,
};

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAxRDhglWqo6ifggUxWQVDsm623tPfp_a4",
  });
  const [selected, setSelected] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const onSelect = (item) => {
    setSelected(item);
  };
  const mouseHover = () => setShow((prev) => !prev);
  var min = 0.99998;
  var max = 1.00001;
  const [map, setMap] = React.useState(null);
  const [icon, setIcon] = React.useState(dancee);
  const [locs, setLocs] = React.useState(props.locations);
  const [modified, setModified] = React.useState(props.locations);
  const [show, setShow] = useState(false);
  const [currentPosition, setCurrentPosition] = useState({});
  // const onUnmount = React.useCallback(function callback(map) {
  //  setMap(null);
  // }, []);
  useEffect(() => {
    setLocs(props.locations);
    setModified(props.locations);
    console.log(
      "1***********Tableaux : 1. LOCS " + " 2: MODIFIED " + JSON.stringify(locs)
    );
    if (locs !== null) {
      locs.map((marker1, i) => {
        // setLocs([...modified]);
        //  let list = allMarkers.slice(i, 1);
        locs.forEach((marker2, j) => {
          // let isMarker1 = marker1;
          //var isMarker2 = marker2;
          let positionMarker1 = marker2.lat;
          var positionMarker2 = marker1.lat;
          if (positionMarker1 === positionMarker2) {
            //update the position of the coincident marker by applying a small multipler to its coordinates
            console.log("CE QUI EST FAIT" + i, j);
            let nLat =
              parseFloat(positionMarker2) * (Math.random() * (max - min) + min);
            let nLng =
              parseFloat(marker2.lng) * (Math.random() * (max - min) + min);
            let newLat =
              parseFloat(marker1.lat) * (Math.random() * (max - min) + min);
            let newLng =
              parseFloat(marker1.lng) * (Math.random() * (max - min) + min);
            console.log(nLat);
            locs[i].lat = newLat;
            locs[i].lng = newLng;
            locs[j].lat = nLat;
            locs[j].lng = nLng;
            setModified(locs);
            setLocs(locs);
          }
        });
      });
      console.log("Tableaux : 1. LOCS " + JSON.stringify(locs));
    }
  }, [props.locations]);
  if (modified) {
    return (
      <GoogleMap
        id="map"
        mapContainerStyle={containerStyle}
        center={{ lat: locs[0].lat, lng: locs[0].lng }}
        zoom={9}
        // onLoad={onLoad}
        // onUnmount={onUnmount}
      >
        <MarkerClusterer
        /*onClick={(e) => {
            let allMarkers = e.getMarkers();
            setModified(...locs);
            //setLocs([...modified]);
            //   console.log(allMarkers);

            if (allMarkers.length !== 0) {
              allMarkers.map((marker1, i) => {
                // setLocs([...modified]);
                //  let list = allMarkers.slice(i, 1);
                allMarkers.map((marker2, j) => {
                  let isMarker1 = marker1;
                  var isMarker2 = marker2;
                  let positionMarker1 = isMarker2.getPosition();
                  var positionMarker2 = isMarker1.getPosition();
                  if (
                    marker1.getPosition().lat() === marker2.getPosition().lat()
                  ) {
                    //update the position of the coincident marker by applying a small multipler to its coordinates
                    console.log("CE QUI EST FAIT" + i, j);
                    let nLat =
                      positionMarker2.lat() *
                      (Math.random() * (max - min) + min);
                    let nLng =
                      positionMarker2.lng() *
                      (Math.random() * (max - min) + min);
                    let newLat =
                      positionMarker1.lat() *
                      (Math.random() * (max - min) + min);
                    let newLng =
                      positionMarker1.lng() *
                      (Math.random() * (max - min) + min);
                    //latlng = new window.google.maps.LatLng(newLat, newLng);
                    locs[i].lat = newLat;
                    locs[i].lng = newLng;
                    locs[j].lat = nLat;
                    locs[j].lng = nLng;
                    setModified(locs);
                  }
                });
              });
            }
          }} */
        >
          {(clusterer) =>
            locs.map((location) => (
              <Marker
                icon={{
                  url: icon,
                  anchor: new window.google.maps.Point(17, 46),

                  scaledSize: new window.google.maps.Size(37, 37),
                }}
                animation={window.google.maps.Animation.DROP}
                key={location.id}
                position={{
                  lat: parseFloat(location.lat),
                  lng: parseFloat(location.lng),
                }}
                clusterer={clusterer}
                onClick={() => {
                  console.log(location);
                  onSelect(location);
                  setIsClicked(true);
                  setSelected(location);

                  //setIcon(mom);
                }}
              />
            ))
          }
        </MarkerClusterer>

        {isClicked && (
          <InfoWindow
            position={{
              lat: parseFloat(selected.lat),
              lng: parseFloat(selected.lng),
            }}
            style={{ width: "10px", height: "10px" }}
            key={selected.id}
            clickable={true}
            onCloseClick={() => {
              setIsClicked(false);
              setSelected({});
            }}
          >
            <a
              style={{
                textDecoration: "none",
              }}
              href={`/product/${selected.id}`}
            >
              <Card
                style={{ width: "330px", height: "290px", border: "none" }}
                hoverable
                //   style={{}}
                cover={
                  <>
                    <img
                      width="210px"
                      height="150px"
                      alt="example"
                      src={selected.img1}
                    />
                  </>
                }
                onMouseEnter={mouseHover}
                onMouseLeave={mouseHover}
              >
                <Meta
                  id="button_giver"
                  style={{
                    marginRight: "10%",
                    marginTop: "-2%",
                    border: "none",
                  }}
                  title={selected.title}
                  description={selected.price + "€"}
                />{" "}
                <div
                  style={{
                    textDecoration: "none",
                    width: "90%",
                  }}
                >
                  <p>{selected.accroche}</p>

                  <p
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {selected.content.substring(0, 35) + "..."}
                  </p>
                </div>
              </Card>
            </a>
          </InfoWindow>
        )}
      </GoogleMap>
    );
  } else {
    return <></>;
  }
}

export default React.memo(Map);
