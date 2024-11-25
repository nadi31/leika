// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { message } from "antd";

// Create the context
const AuthContext = createContext();

// Define the provider component
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [access_token, setAccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tokenExpiry, setTokenExpiry] = useState();

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/refresh/",
        {
          headers: {
            "content-type": "multipart/form-data",
            Authorization: "Bearer " + access_token,
          },
          refresh: localStorage.getItem("token"),
        },

        { withCredentials: true } // This ensures cookies are sent with the request
      );

      const newToken = response.data.refresh;
      const expiresIn = 15 * 60 * 1000; // 15 minutes in milliseconds
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setTokenExpiry(Date.now() + expiresIn);
      if (response.status === 200) {
        console.log("Token refreshed successfully:", response.data);
        handleSuccessfulLogin(response.data);
      } else {
        // If refresh fails, fallback to email/password login.
        console.log(
          "No valid refresh token, proceeding with email/password login"
        );
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle the error, possibly redirect to login or show an error message
    }
  };
  const login = async (email, password) => {
    console.log("LOGIN ");
    if (email === "" || password === "") {
      console.log("refreshAccessToken**** FUNCGTION ");
      refreshAccessToken();
    } else {
      console.log(email, password);

      try {
        // Check for the presence of the refresh token by attempting to use the refresh endpoint.
        const refreshResponse = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh: localStorage.getItem("token") }, // Ensure this is the correct refresh token
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json", // This is the default for axios but good to specify
            },
          }
        );
        // If the refresh is successful, update tokens and user data from the refresh response.
        if (refreshResponse.status === 200) {
          console.log("Token refreshed successfully:", refreshResponse.data);
          handleSuccessfulLogin(refreshResponse.data);
        } else {
          // If refresh fails, fallback to email/password login.
          console.log(
            "No valid refresh token, proceeding with email/password login"
          );
          await loginWithEmailPassword(email, password);
        }
      } catch (refreshError) {
        console.error(
          "Error during token refresh, attempting email/password login:",
          refreshError
        );
        // If any error occurs during refresh, attempt login with email and password.
        await loginWithEmailPassword(email, password);
      }
    }
  };

  // Helper function to handle login via email and password
  const loginWithEmailPassword = async (email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/obtain/",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );

      handleSuccessfulLogin(response.data);
      message.success("Connexion réussie");
    } catch (error) {
      console.error("There was an error logging in:", error);
      message.error("Connexion échouée");
    }
  };

  // Helper function to set tokens and user data after a successful login or token refresh
  const handleSuccessfulLogin = (data) => {
    const expiresIn = 15 * 60 * 1000;
    console.log("access token" + data.access);
    console.log("ID USER " + data.id_obj_user);
    setToken(data.access);
    localStorage.setItem("token", data.refresh);
    setTokenExpiry(Date.now() + expiresIn);
    setAccessToken(data.access);
    setUserData({
      access: data.access,
      firstName: data.first_name,
      email: data.email,
      id_user: data.id_user,
      user_type: data.user_type,
      id_obj_user: data.id_obj_user,
    });
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
  };
  useEffect(() => {
    refreshAccessToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, userData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
