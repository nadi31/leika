import React, { useState, useEffect } from "react";
import MenuBrowser from "./MenuBrowser";
import "./style/review.css";
import axios from "axios";
import Footer from "./Footer";
import { useAuth } from "./AuthContext";
import { Table } from "antd";
import moment from "moment";
import { Link } from "react-router-dom";

const BookingGiver = () => {
  const { userData } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pastReservations, setPastReservations] = useState([]);
  const [futureReservations, setFutureReservations] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  // Responsive width for MenuBrowser
  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const columns = [
    {
      title: "Nombre de place(s) réservée(s)",
      dataIndex: "seats",
      key: "seats",
    },
    { title: "Course Hour", dataIndex: "courseHour", key: "courseHour" },
    {
      title: "Date de début",
      dataIndex: ["details", 0, "date"],
      key: "detailsDate",
    },
    {
      title: "Heure de début",
      dataIndex: ["details", 0, "hour"],
      key: "detailsHour",
    },
    {
      title: "Date de fin",
      dataIndex: ["details", 0, "dateFin"],
      key: "detailsDateFin",
    },
    {
      title: "Heure de fin",
      dataIndex: ["details", 0, "hourFin"],
      key: "detailsHourFin",
    },
    {
      title: "Seats Available",
      key: "detailsSeats",
      render: (record) => {
        const totalSeats = record?.details?.[0]?.seats || 0;
        const reservedSeats = record.seats || 0;
        return Math.max(totalSeats - reservedSeats, 0); // Ensure no negative values
      },
    },
    {
      title: "Lien Atelier",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => <Link to={`/product/${courses}`}>Lien atelier</Link>,
    },
  ];

  // Fetch and enrich booking details
  const fetchDetailsForBookings = async (bookings) => {
    return Promise.all(
      bookings.map(async (booking) => {
        try {
          const resHour = await axios.get(
            `http://localhost:8000/api-course/hours/${booking.courseHour}`
          );
          return { ...booking, details: resHour.data };
        } catch (err) {
          console.error(
            `Error fetching details for courseHour ${booking.courseHour}:`,
            err
          );
          return { ...booking, details: null }; // Safely handle error case
        }
      })
    );
  };

  // Fetch user data
  const fetchUserData = async () => {
    if (!userData?.id_obj_user || !userData?.access) return;

    try {
      const res = await axios.get(
        `http://localhost:8000/api-course/bookings/giver/${userData.id_obj_user}`,
        {
          headers: { Authorization: `Bearer ${userData.access}` },
        }
      );

      const bookings = res.data;

      if (Array.isArray(bookings)) {
        const enrichedBookings = await fetchDetailsForBookings(bookings);

        const now = moment();
        const past = enrichedBookings.filter((booking) =>
          booking.details && booking.details[0]?.dateFin
            ? moment(booking.details[0].dateFin).isBefore(now)
            : false
        );
        const future = enrichedBookings.filter((booking) =>
          booking.details && booking.details[0]?.dateFin
            ? moment(booking.details[0].dateFin).isSameOrAfter(now)
            : false
        );

        setPastReservations(past);
        setFutureReservations(future);
      } else {
        console.error("Unexpected data format:", bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings or details:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Run fetch on user data change
  useEffect(() => {
    if (userData?.id_obj_user && userData?.access) {
      fetchUserData();
    }
  }, [userData]);

  return !isLoading ? (
    <>
      <MenuBrowser width={width} />
      <div className="table-container">
        <h1>Réservations passées</h1>
        <Table
          dataSource={pastReservations}
          columns={columns}
          rowKey={(record) => `${record.id}-${record.courseHour}`}
        />
      </div>
      <div className="table-container">
        <h1>Réservations à venir</h1>
        <Table
          dataSource={futureReservations}
          columns={columns}
          rowKey={(record) => `${record.id}-${record.courseHour}`}
        />
      </div>
      <Footer width={width} />
    </>
  ) : (
    <div className="loading-container">Loading...</div>
  );
};

export default BookingGiver;
