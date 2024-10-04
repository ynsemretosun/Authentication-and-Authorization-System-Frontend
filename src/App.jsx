import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import OtpVerification from "./pages/OtpVerification";
import ProtectedRoute from "./features/users/ProtectedRoute";
import NotFound from "./pages/ErrorPage";
import RestrictedRoute from "./features/users/RestrictedRoute";
import RestrictedPage from "./pages/RestrictedPage";
// Router'ın oluşturulması
const router = createBrowserRouter([
  {
    // Giriş sayfası
    path: "/login",
    element: <Login />,
  },
  {
    // OTP doğrulama sayfası
    path: "/verifyOtp",
    element: <OtpVerification />,
  },
  {
    // Kullanıcı profil sayfası
    path: "/profile/:id",
    element: (
      // Kullanıcı profil sayfası sadece giriş yapmış kullanıcılar için erişilebilir
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    ),
  },
  {
    // Kısıtlanmış sayfa
    path: "/restricted",
    element: (
      // Kısıtlanmış sayfa sadece Admin ve user rollerine sahip kullanıcılar için erişilebilir
      <ProtectedRoute>
        <RestrictedRoute roles={["AdmiN", "user"]}>
          <RestrictedPage />
        </RestrictedRoute>
      </ProtectedRoute>
    ),
  },
  {
    // Uygulamanın direkt olarak giriş sayfasına yönlendirilmesi
    path: "/",
    element: <Navigate to="/login" />,
  },
  {
    // Bulunamayan route'lar için hata sayfası
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
  return <RouterProvider router={router} />; // RouterProvider ile router'ın uygulamaya entegre edilmesi
}

export default App;
