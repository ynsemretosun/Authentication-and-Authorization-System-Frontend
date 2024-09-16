import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "../../pages/ErrorPage";
import Spinner from "../ui/Spinner";
import { fetchUser } from "./userSlice";
/* eslint react/prop-types: 0 */
function ProtectedRoute({ children }) {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const isAuthenticated = Cookies.get("token");
  const connectSid = Cookies.get("connect.sid");
  useEffect(() => {
    const fetchUserData = async () => {
      const userType = localStorage.getItem("userType");
      if (userType !== "LDAP User") await dispatch(fetchUser());
    };
    if (!connectSid) return;
    fetchUserData();
  }, [dispatch, connectSid]);
  if (isLoading) return <Spinner fullScreen={true} />;
  return isAuthenticated ? (
    children
  ) : (
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
