import React from "react";
import { Route, Routes } from "react-router-dom";

import Home from "./Home";
import ProductDetail from "./ProductDetail";

import CourseFormGiver from "./CourseFormGiver";
import Results from "./Results";
import ProfilCub from "./ProfilCub";
import UpdateCourse from "./UpdateCourse";
import CoursesToModify from "./CoursesToModify";
import GiverProfil from "./GiverProfil";
import GiverForm from "./GiverForm";

const BaseRouter = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route exact path="/product/:courseID" element={<ProductDetail />} />

    <Route exact path="/update/:courseID" element={<UpdateCourse />} />
    <Route exact path="/create" element={<CourseFormGiver />} />
    <Route
      exact={false}
      path="/search/*"
      element={<Results />}
      key={window.location.pathname}
    />
    <Route exact path="/profil/:pk" element={<ProfilCub />} />
    <Route exact path="/update/giver" element={<CoursesToModify />} />
    <Route exact path="/profil/giver" element={<GiverProfil />} />
    <Route exact path="/create/giver" element={<GiverForm />} />
  </Routes>
);
export default BaseRouter;
