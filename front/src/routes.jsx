import React from "react";
import { Route, Routes } from "react-router-dom";
import { Suspense } from "react";

import Home from "./Home";
import ProductDetail from "./ProductDetail";

import Results from "./Results";

import MdpOublie from "./MdpOublie";

import Kids from "./Kids";
import GiverView from "./GiverView";
import TeamBuilding from "./TeamBuilding";
import GiftCard from "./GiftCard";
import Founders from "./Founders";
import HomeMobile from "./HomeMobile";

//import BookingGiver from "./BookingGiver";
//import CourseFormGiver from "./CourseFormGiver";
//import CourseOnline from "./CourseOnline";
//import CoursesCheck from "./CoursesCheck";
//import CoursesToModify from "./CoursesToModify";
//import UpdateCourse from "./UpdateCourse";
//import GiverProfil from "./GiverProfil";
//import CoursesToVerify from "./CourseToVerify";
//import GiverForm from "./GiverForm";
//import ProfilCub from "./ProfilCub";
//import ReviewsCub from "./ReviewsCub";
import Recap from "./Recap";
import RecapOrders from "./RecapOrders";
//import InfosCub from "./InfosCub";
//import EmailVerifyGiver from "./EmailVerifyGiver";
//import EmailVerify from "./EmailVerify";
//Giver
const GiverProfil = React.lazy(() => import("./GiverProfil"));
const EmailVerifyGiver = React.lazy(() => import("./EmailVerifyGiver"));
const CourseFormGiver = React.lazy(() => import("./CourseFormGiver"));
const GiverForm = React.lazy(() => import("./GiverForm"));
const BookingGiver = React.lazy(() => import("./BookingGiver"));
const UpdateCourse = React.lazy(() => import("./UpdateCourse"));
const CoursesToModify = React.lazy(() => import("./CoursesToModify"));
const CourseOnline = React.lazy(() => import("./CourseOnline"));
//admin
const EmailVerify = React.lazy(() => import("./EmailVerify"));
//const CoursesToVerify = React.lazy(() => import("./CoursesToVerify"));
const CoursesCheck = React.lazy(() => import("./CoursesCheck"));
//cub
const ProfilCub = React.lazy(() => import("./ProfilCub"));
const InfosCub = React.lazy(() => import("./InfosCub"));
const ReviewsCub = React.lazy(() => import("./ReviewsCub"));

const BaseRouter = () => (
  <Suspense fallback={<div>Loading...</div>}>
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
      <Route exact path="/home" element={<HomeMobile />} />
      <Route exact path="/kids" element={<Kids />} />
      <Route exact path="/team" element={<TeamBuilding />} />
      <Route exact path="/profil" element={<ProfilCub />} />
      <Route exact path="/update/giver" element={<CoursesToModify />} />
      <Route exact path="/online/giver" element={<CourseOnline />} />
      <Route exact path="/profil/giver" element={<GiverProfil />} />
      <Route exact path="/create/giver" element={<GiverForm />} />

      <Route exact path="/admin/check/:courseID" element={<CoursesCheck />} />
      <Route exact path="/email-verify/:token" element={<EmailVerify />} />
      <Route exact path="/giver/:giverID" element={<GiverView />} />

      <Route exact path="/booking/giver" element={<BookingGiver />} />
      <Route exact path="/gift" element={<GiftCard />} />
      <Route exact path="/founders" element={<Founders />} />
      <Route exact path="/recap" element={<Recap />} />
      <Route exact path="/recap/orders" element={<RecapOrders />} />
      <Route exact path="/infos" element={<InfosCub />} />
      <Route exact path="/infos/reviews" element={<ReviewsCub />} />

      <Route
        exact
        path="/email-verify-giver/:token"
        element={<EmailVerifyGiver />}
      />
      <Route exact path="/mdp/:token" element={<MdpOublie />} />
    </Routes>
  </Suspense>
);
export default BaseRouter;
