const getUserInfo = () => {
  const displayName = localStorage.getItem("displayName");
  const email = localStorage.getItem("email");
  const photo = localStorage.getItem("photo");
  const id = localStorage.getItem("id");
  const userType = localStorage.getItem("userType");
  const groups = JSON.parse(localStorage.getItem("groups"));
  const role = localStorage.getItem("role");

  return {
    displayName,
    email,
    photo,
    id,
    userType,
    groups,
    role,
  };
};

export default getUserInfo;
