import React from "react";
import { Route } from "react-router-dom";

import Home from "./Home";
import ProductDetail from "./ProductDetail";

import CourseFormGiver from "./CourseFormGiver"
import Results from "./Results";


const BaseRouter = () => (
  <div>

    <Route exact path="/" component={Home} />
    <Route exact path="/product/:courseID" component={ProductDetail} />
   
    <Route exact path="/create" component={CourseFormGiver} />
    <Route exact path="/search:request" component={Results} />
  </div>
);
export default BaseRouter;
