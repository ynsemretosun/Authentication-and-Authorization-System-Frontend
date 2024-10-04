import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { notifyError, notifySuccess } from "../ui/Toast";
import setUserInfo from "../../helpers/setUserInfo";
const baseUrl = "https://127.0.0.1:443/api";
// Kullanıcı ile ilgili işlemlerin yapıldığı slice'ın başlangıç durumu
const initialState = {
  isLoading: false,
  user: {},
  data: "",
};

// Kullanıcı ile ilgili işlemlerin yapıldığı slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // Kullanıcı giriş işlemi, çıkış işlemi ve kullanıcı bilgilerinin alınması işlemlerinin tanımlanması
  reducers: {
    // otp doğrulama işlemi
    verifyOtp(state, action) {
      const user = action.payload.data.user;
      localStorage.setItem("groups", JSON.stringify(user.groups));
      setUserInfo(user, action.payload.data.token);
      state.isLoading = !state.isLoading;
      state.user = user;
    },
    // loading durumunun değiştirilmesi
    loading(state) {
      state.isLoading = !state.isLoading;
    },
    // çıkış işlemi
    logout(state) {
      state.isLoading = !state.isLoading;
      state.user = {};
      Cookies.remove("token");
      Cookies.remove("connect.sid");
      localStorage.clear();
    },
    // oauth ile giriş işlemi sonrası kullanıcı bilgilerinin alınması
    fetchUser(state, action) {
      const user = action.payload.data.user;
      setUserInfo(user, action.payload.data.token);
      state.isLoading = !state.isLoading;
      state.user = user;
    },
  },
});

// LDAP ile giriş işlemi
export function login(username, password) {
  return async function (dispatch) {
    try {
      dispatch({ type: "user/loading" }); // loading durumunun değiştirilmesi
      // Kullanıcı adı ve şifrenin gönderilmesi
      const response = await fetch(baseUrl + `/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ username: username, password: password }),
        credentials: "include",
      });
      const res = await response.json();
      // Eğer giriş işlemi başarısızsa hata mesajı göster
      if (!response.ok) {
        dispatch({ type: "user/loading" });
        notifyError(res.message);
      } else {
        // Eğer giriş işlemi başarılıysa kullanıcı bilgilerinin kaydedilmesi
        dispatch({ type: "user/loading" });
        localStorage.setItem("bluredMail", res.data.bluredMail);
        return true;
      }
    } catch {
      // Eğer sunucu hatası oluşursa hata mesajı göster
      notifyError("Server Error");
      dispatch({ type: "user/loading" });
      return notifyError("Unexpected error");
    }
  };
}

// OTP'nin doğrulanması
export function verifyOtp(otp) {
  return async function (dispatch) {
    try {
      dispatch({ type: "user/loading" });
      // OTP'nin gönderilmesi
      const response = await fetch(baseUrl + `/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ otp }),
        credentials: "include",
      });
      const res = await response.json();
      // Eğer OTP doğrulama işlemi başarısızsa hata mesajı göster
      if (!response.ok) {
        dispatch({ type: "user/loading" });
        notifyError(res.message);
      } else {
        // Eğer OTP doğrulama işlemi başarılıysa kullanıcı bilgilerinin kaydedilmesi
        dispatch({ type: "user/verifyOtp", payload: res });
        return true;
      }
    } catch {
      // Eğer sunucu hatası oluşursa hata mesajı göster
      notifyError("Server Error");
      dispatch({ type: "user/loading" });
    }
  };
}

// Çıkış işlemi
export function logout() {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    try {
      // Çıkış işleminin gerçekleştirilmesi
      const response = await fetch(baseUrl + "/logout", {
        method: "GET",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
        credentials: "include",
      });
      const data = await response.json();
      // Eğer çıkış işlemi başarılıysa kullanıcı bilgilerinin silinmesi
      if (response.ok) {
        dispatch({ type: "user/logout" });
        return true;
      } else {
        // Eğer çıkış işlemi başarısızsa hata mesajı göster
        notifyError(data.message);
        dispatch({ type: "user/loading" });
      }
    } catch {
      // Eğer sunucu hatası oluşursa hata mesajı göster
      notifyError("Server Error");
    }
  };
}

// oauth ile giriş işlemi sonrası kullanıcı bilgilerinin alınması
export function fetchUser() {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    try {
      // Kullanıcı bilgilerinin alınması
      const response = await fetch("https://localhost:443/api/profile", {
        method: "GET",
        credentials: "include", // Cookie'lerin gönderilmesini sağlar
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      // Eğer kullanıcı bilgileri alındıysa kullanıcı bilgilerinin kaydedilmesi
      if (response.ok) {
        const res = await response.json();
        dispatch({ type: "user/fetchUser", payload: res });
      } else {
        // Eğer kullanıcı bilgileri alınamadıysa hata mesajı göster
        dispatch({ type: "user/loading" });
        notifyError("User data can not loaded from server!");
      }
    } catch {
      // Eğer sunucu hatası oluşursa hata mesajı göster
      notifyError("Server Error");
    }
  };
}

// OTP'nin yeniden gönderilmesi işlemi
export function resendOtp() {
  return async function (dispatch) {
    dispatch({ type: "user/loading" });
    try {
      // OTP'nin yeniden gönderilmesi
      const response = await fetch(baseUrl + "/resendOtp", {
        method: "GET",
        credentials: "include", // Cookie'lerin gönderilmesini sağlar
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      });
      // Eğer OTP kodu yeniden gönderildiyse bilgilendirme mesajı göster
      if (response.ok) {
        dispatch({ type: "user/loading" });
        notifySuccess("OTP Code regenerated sucesfuly!");
      } else {
        // Eğer OTP kodu yeniden gönderilemediyse hata mesajı göster
        notifyError("OTP Code can not regenerated!");
      }
    } catch {
      // Eğer sunucu hatası oluşursa hata mesajı göster
      notifyError("Server Error");
    }
  };
}

export default userSlice.reducer;
