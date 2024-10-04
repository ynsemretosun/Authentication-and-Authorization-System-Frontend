import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";
import Spinner from "../ui/Spinner";
import { fetchUser } from "./userSlice";
/* eslint react/prop-types: 0 */
// Kullanıcı giriş yapmış mı kontrol eden component
function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const isAuthenticated = Cookies.get("token"); // Kullanıcının giriş yapmış olup olmadığının kontrolü
  const connectSid = Cookies.get("connect.sid"); // Kullanıcının giriş yapmış olup olmadığının kontrolü
  useEffect(() => {
    const fetchUserData = async () => {
      const userType = localStorage.getItem("userType");
      if (userType !== "LDAP User") await dispatch(fetchUser()); // Redux'taki fetchUser fonksiyonuyla kullanıcı bilgilerinin alınması
    };
    if (!connectSid) return; // Eğer kullanıcı giriş yapmamışsa işlem yapma
    fetchUserData();
  }, [dispatch, connectSid]);
  if (isLoading) return <Spinner fullScreen={true} />; // Eğer kullanıcı bilgileri yükleniyorsa spinner göster
  // Eğer kullanıcı giriş yapmışsa sayfayı göster
  return isAuthenticated ? (
    children
  ) : (
    // Eğer kullanıcı giriş yapmamışsa hata sayfasına yönlendir
    <>
      <ErrorPage
        code={401}
        header={"Unauthorized"}
        message={
          "It looks like you are not logged in. Please go to the login page and try again after logging in."
        }
        buttonType={"login"}
      />
    </>
  );
}

export default ProtectedRoute;
