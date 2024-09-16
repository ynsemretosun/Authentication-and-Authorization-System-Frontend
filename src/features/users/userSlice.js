import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { notifyError, notifySuccess } from "../ui/Toast";
const baseUrl = "https://127.0.0.1:443/api";
const initialState = {
  isLoading: false,
  user: {},
  data: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    verifyOtp(state, action) {
      const user = action.payload.data.user;
      console.log(user);
      Cookies.set("token", action.payload.token);
      localStorage.setItem("displayName", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("photo", user.photo);
      localStorage.setItem("id", user.id);
      localStorage.setItem("userType", user.userType);
      localStorage.setItem("groups", JSON.stringify(user.groups));
      localStorage.setItem("role", user.role);
      state.isLoading = !state.isLoading;
      state.user = user;
    },
    loading(state) {
      state.isLoading = !state.isLoading;
    },
    logout(state) {
      state.isLoading = !state.isLoading;
      state.user = {};
      Cookies.remove("token");
      Cookies.remove("connect.sid");
      localStorage.clear();
    },
    fetchUser(state, action) {
      const user = action.payload.data.data.user;
      Cookies.set("token", action.payload.data.token);
      state.isLoading = !state.isLoading;
      state.user = user;
      localStorage.setItem("displayName", user.displayName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("photo", user.photo);
      localStorage.setItem("id", user.id);
      localStorage.setItem("userType", user.userType);
      localStorage.setItem("role", user.role);
    },
  },
});

export function login(username, password) {
  return async function (dispatch) {
    try {
      dispatch({ type: "user/loading" });
      const response = await fetch(`https://127.0.0.1:443/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Required for CORS support to work
        },
        body: JSON.stringify({ username: username, password: password }),
        credentials: "include",
      });
      const res = await response.json();
      if (!response.ok) {
        dispatch({ type: "user/loading" });
        notifyError(res.message);
      } else {
        dispatch({ type: "user/loading" });
        localStorage.setItem("bluredMail", res.data.bluredMail);
        return true;
      }
    } catch {
      // Handle the error here
      notifyError("Server Error");
      dispatch({ type: "user/loading" });
      return notifyError("Unexpected error");
    }
  };
}

export function verifyOtp(otp) {
  return async function (dispatch) {
    try {
      dispatch({ type: "user/loading" });
      const response = await fetch(`https://127.0.0.1:443/api/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ otp }),
        credentials: "include",
      });
      const res = await response.json();
      console.log(res);
      if (!response.ok) {
        dispatch({ type: "user/loading" });
        notifyError(res.message);
      } else {
        dispatch({ type: "user/verifyOtp", payload: res });
        return true;
      }
    } catch {
      // Handle the error here
      notifyError("Server Error");
      dispatch({ type: "user/loading" });
      return notifyError("Unexpected error");
    }
  };
}

export function logout() {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    try {
      const response = await fetch("https://127.0.0.1:443/api/logout", {
        method: "GET",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "user/logout" });
        notifySuccess("Çıkış");
        return true;
      } else {
        notifyError(data.message);
        dispatch({ type: "user/loading" });
      }
    } catch {
      notifyError("Server Error");
    }
  };
}

export function fetchUser() {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    try {
      const response = await fetch("https://localhost:443/api/profile", {
        method: "GET",
        credentials: "include", // Cookie'lerin gönderilmesini sağlar
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: "user/fetchUser", payload: { data } });
      } else {
        dispatch({ type: "user/loading" });
        notifyError("User data can not loaded from server!");
      }
    } catch {
      notifyError("Server Error");
    }
  };
}

export function resendOtp() {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    try {
      const response = await fetch("https://127.0.0.1:443/api/resendOtp", {
        method: "GET",
        credentials: "include", // Cookie'lerin gönderilmesini sağlar
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      console.log(response);
      if (response.ok) {
        dispatch({ type: "user/loading" });
        notifySuccess("OTP Code regenerated sucesfuly!");
      } else {
        notifyError("OTP Code can not regenerated!");
      }
    } catch {
      notifyError("Server Error");
    }
  };
}

export default userSlice.reducer;
