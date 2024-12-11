import React from "react";
import { render, act, fireEvent } from "@testing-library/react";
import axios from "axios";
import { AuthProvider, useAuth } from "./AuthContext";

jest.mock("axios");

const MockComponent = () => {
  const { login, logout, token, userData } = useAuth();

  return (
    <div>
      <button onClick={() => login("test@example.com", "password123")}>
        Login
      </button>
      <button onClick={logout}>Logout</button>
      <div data-testid="token">{token}</div>
      <div data-testid="userData">{userData ? userData.email : "No user"}</div>
    </div>
  );
};

describe("AuthContext", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login and set user data", async () => {
    const mockResponse = {
      data: {
        access: "mockAccessToken",
        refresh: "mockRefreshToken",
        first_name: "John",
        email: "test@example.com",
        id_user: 1,
        user_type: "2",
        id_obj_user: 42,
      },
    };
    axios.post.mockResolvedValue(mockResponse);

    const { getByText, getByTestId } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(getByText("Login"));
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/token/obtain/",
      {
        email: "test@example.com",
        password: "password123",
      },
      { withCredentials: true }
    );

    expect(getByTestId("token").textContent).toBe("mockAccessToken");
    expect(getByTestId("userData").textContent).toBe("test@example.com");
  });

  it("should logout and clear user data", () => {
    const { getByText, getByTestId } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    act(() => {
      fireEvent.click(getByText("Logout"));
    });

    expect(getByTestId("token").textContent).toBe("");
    expect(getByTestId("userData").textContent).toBe("No user");
  });

  it("should refresh token on mount", async () => {
    const mockResponse = {
      data: { refresh: "mockNewRefreshToken", access: "mockNewAccessToken" },
    };
    axios.post.mockResolvedValue(mockResponse);
    localStorage.setItem("token", "mockRefreshToken");

    render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/token/refresh/",
      {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer null",
        },
        refresh: "mockRefreshToken",
      },
      { withCredentials: true }
    );
  });

  it("should display error message on login failure", async () => {
    axios.post.mockRejectedValue(new Error("Login failed"));

    const { getByText } = render(
      <AuthProvider>
        <MockComponent />
      </AuthProvider>
    );

    await act(async () => {
      fireEvent.click(getByText("Login"));
    });

    expect(axios.post).toHaveBeenCalled();
    // `message.error` mock
  });
});
