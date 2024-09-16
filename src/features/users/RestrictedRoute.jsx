import ErrorPage from "../../pages/ErrorPage";
/* eslint react/prop-types: 0 */
function RestrictedRoute({ children, roles }) {
  const role = localStorage.getItem("role").toLocaleLowerCase();
  roles = roles.map((role) => role.toLowerCase());
  if (!roles.includes(role))
    return (
      <ErrorPage
        code={403}
        header={"Access Denied"}
        message={"You are not authorized to access this page!"}
      />
    );
  return children;
}

export default RestrictedRoute;
