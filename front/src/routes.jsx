import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import ProductDetail from "./ProductDetail";

import CourseFormGiver from "./CourseFormGiver"
import Results from "./Results";
import ProfilCub from "./ProfilCub";

const BaseRouter = () => (
  <div>

    <Route exact path="/" component={Home} />
    <Route exact path="/product/:courseID" component={ProductDetail} />
   
    <Route exact path="/create" component={CourseFormGiver} />
    <Route exact path="/search:request" component={Results} />
    <Route exact path="/profil/:pk" component={ProfilCub} />
  </div>
);
export default BaseRouter;
