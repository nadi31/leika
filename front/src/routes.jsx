import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import ProductDetail from "./ProductDetail";

import CourseFormGiver from "./CourseFormGiver";
import Results from "./Results";
import ProfilCub from "./ProfilCub";

const BaseRouter = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/product/:courseID" element={<ProductDetail />} />

    <Route exact path="/create" element={<CourseFormGiver />} />
    <Route
      exact={false}
      path="/search/*"
      element={<Results />}
      key={window.location.pathname}
    />
    <Route exact path="/profil/:pk" element={<ProfilCub />} />
  </Routes>
);
export default BaseRouter;
