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
  const userData = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pastReservations, setPastReservations] = useState([]);
  const [futureReservations, setFutureReservations] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);

  const columns_changed = [
    {
      title: "Nombre de place(s) réservée(s)",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Course Hour",
      dataIndex: "courseHour",
      key: "courseHour",
    },
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
  ];
  const columns = [
    {
      title: "Nombre de place(s) réservée(s)",
      dataIndex: "seats",
      key: "seats",
    },
    {
      title: "Course Hour",
      dataIndex: "courseHour",
      key: "courseHour",
    },
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
        const availableSeats = totalSeats - reservedSeats;
        return availableSeats >= 0 ? availableSeats : 0; // Ensure no negative values
      },
    },
    {
      title: "Lien Atelier",
      dataIndex: "courses",
      key: "courses",
      render: (courses) => (
        <Link to={`/product/${courses}`}>Lien atelier </Link>
      ),
    },
  ];

  const fetchDetailsForBookings = async (bookings) => {
    return await Promise.all(
      bookings.map(async (book) => {
        try {
          const resHour = await axios.get(
            `http://localhost:8000/api-course/hours/${book.courseHour}`
          );
          // Merge details with the original booking
          return {
            ...book,
            details: resHour.data, // Assign fetched details
          };
        } catch (err) {
          console.error(
            `Error fetching details for courseHour ${book.courseHour}:`,
            err
          );
          return { ...book, details: null }; // Handle case where fetching details fails
        }
      })
    );
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api-course/bookings/giver/${userData.userData.id_obj_user}`,
        {
          headers: {
            Authorization: `Bearer ${userData.userData.access}`,
          },
        }
      );

      const bookings = res.data;

      if (Array.isArray(bookings)) {
        // Fetch and merge the course details
        const enrichedBookings = await fetchDetailsForBookings(bookings);

        // Split into past and future reservations based on dateFin
        const now = moment(); // Use moment to get current date
        const past = enrichedBookings.filter((booking) =>
          moment(booking.details[0].dateFin).isBefore(now)
        );
        const future = enrichedBookings.filter((booking) =>
          moment(booking.details[0].dateFin).isSameOrAfter(now)
        );

        setPastReservations(past);
        setFutureReservations(future);
        setIsLoading(false);
      } else {
        console.error("Expected an array, but got:", bookings);
      }

      console.log("******* REQUEST", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error fetching bookings or details:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (userData?.userData?.id_obj_user && userData?.userData?.access) {
      fetchUserData();
    }
  }, [userData]);

  return !isLoading ? (
    <>
      <MenuBrowser width={width} />
      <div className="table-container">
        <h1>Réservations passées</h1>
        <Table dataSource={pastReservations} columns={columns} rowKey="id" />
      </div>
      <div className="table-container">
        {" "}
        <h1>Réservations à venir</h1>
        <Table
          dataSource={futureReservations}
          columns={columns_changed}
          rowKey="id"
        />
      </div>
      <Footer width={width} />
    </>
  ) : (
    <>Loading</>
  );
};

export default BookingGiver;
