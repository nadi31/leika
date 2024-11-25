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
import CourseOnline from "./CourseOnline";
import CoursesToVerify from "./CourseToVerify";
import CoursesCheck from "./CoursesCheck";
import EmailVerify from "./EmailVerify";
import MdpOublie from "./MdpOublie";
import EmailVerifyGiver from "./EmailVerifyGiver";
import Kids from "./Kids";
import GiverView from "./GiverView";
import TeamBuilding from "./TeamBuilding";
import GiftCard from "./GiftCard";
import Founders from "./Founders";
import HomeMobile from "./HomeMobile";
import BookingGiver from "./BookingGiver";

import Recap from "./Recap";
import RecapOrders from "./RecapOrders";
import ReviewsCub from "./ReviewsCub";

import InfosCub from "./InfosCub";
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
    <Route exact path="/home" element={<HomeMobile />} />
    <Route exact path="/kids" element={<Kids />} />
    <Route exact path="/team" element={<TeamBuilding />} />
    <Route exact path="/profil" element={<ProfilCub />} />
    <Route exact path="/update/giver" element={<CoursesToModify />} />
    <Route exact path="/online/giver" element={<CourseOnline />} />
    <Route exact path="/profil/giver" element={<GiverProfil />} />
    <Route exact path="/create/giver" element={<GiverForm />} />
    <Route exact path="/admin/list/verify" element={<CoursesToVerify />} />
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
);
export default BaseRouter;
