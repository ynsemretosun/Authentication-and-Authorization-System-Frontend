import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import OtpVerification from "./pages/OtpVerification";
import ProtectedRoute from "./features/users/ProtectedRoute";
import NotFound from "./pages/ErrorPage";
import RestrictedRoute from "./features/users/RestrictedRoute";
import RestrictedPage from "./pages/RestrictedPage";
const router = createBrowserRouter([
  {
    path: "/login",

    element: <Login />,
  },
  {
    path: "/verifyOtp",
    element: <OtpVerification />,
  },
  {
    path: "/profile/:id",
    element: (
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/restricted",
    element: (
      <ProtectedRoute>
        <RestrictedRoute roles={["UsEr", "AdmiN"]}>
          <RestrictedPage />
        </RestrictedRoute>
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: (
      <NotFound
        code={404}
        header={"Page not found"}
        message={"Sorry, we couldn’t find the page you’re looking for."}
      />
    ),
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
