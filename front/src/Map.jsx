import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import dancee from "./star.png";
import React, { useState, useEffect, useRef, useCallback } from "react";
import "leaflet/dist/leaflet.css";
import { Card } from "antd";
import L from "leaflet";

const Map = (props) => {
  const [selected, setSelected] = useState({});
  const [isClicked, setIsClicked] = useState(false);
  const coords = useRef([props.centerLat, props.centerLong]);
  const { Meta } = Card;
  const onSelect = (item) => {
    setSelected(item);
  };
  const ResizeMap = () => {
    let map = useMap();

    if (coords !== null) {
      map.setView([props.centerLat, props.centerLong], map.getZoom());
    }

    return null;
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
  function MapView() {
    let map = useMap();
    if (coords !== null) {
    }

    //Sets geographical center and zoom for the view of the map
    return null;
  }

  //ter and zoom for the view of the map

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
  }, [props]);

  const customIcon = new L.Icon({
    //creating a custom icon to use in Marker
    iconUrl: icon,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  return (
    <MapContainer
      classsName="map"
      center={[props.centerLat, props.centerLong]}
      zoom={13}
      style={{ height: "400px", width: "400px", zIndex: "-1" }}
      scrollWheelZoom={false}
    >
      {locs.map((location) => (
        <Marker icon={customIcon} position={[location.lat, location.lng]}>
          <Popup>
            <a href={`/product/${location.id}`}>
              <img
                width="210px"
                height="150px"
                alt="example"
                src={location.img1}
              />{" "}
              <div
                style={{
                  textDecoration: "none",
                  width: "90%",
                }}
              >
                {" "}
                <p> {location.price + "€"}</p>
                <p
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {location.accroche}
                </p>
                <p
                  style={{
                    textDecoration: "none",
                  }}
                >
                  {location.content.substring(0, 35) + "..."}
                </p>
              </div>
            </a>
          </Popup>
        </Marker>
      ))}
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> 
        contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ResizeMap />
    </MapContainer>
  );
};
export default Map;
