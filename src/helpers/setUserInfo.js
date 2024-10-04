import Cookies from "js-cookie";
function setUserInfo(user, token) {
  Cookies.set("token", token);
  localStorage.setItem("displayName", user.displayName);
  localStorage.setItem("email", user.email);
  localStorage.setItem("photo", user.photo);
  localStorage.setItem("id", user.id);
  localStorage.setItem("userType", user.userType);
  localStorage.setItem("role", user.role);
}

export default setUserInfo;
