import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Spinner from "../features/ui/Spinner";
import { notifyError } from "../features/ui/Toast";
import ErrorPage from "./ErrorPage";
function RestrictedPage() {
  // const { isLoading } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRestricted = async () => {
      try {
        const token = Cookies.get("token");
        const response = await fetch("https://127.0.0.1:443/api/protected", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setMessage(data.message);
        }
        setIsLoading(false);
      } catch {
        notifyError("Server Error");
      }
    };
    fetchRestricted();
  }, []);
  console.log(message);
  if (isLoading) return <Spinner fullScreen={true} />;
  if (!message)
    return (
      <ErrorPage
        code={403}
        header="Access Denied"
        message="You do not have permission to perform this action!"
      />
    );
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-stone-50 via-stone-100 to-stone-200">
      <div className="bg-white p-10 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-semibold text-gray-700 mb-4">{message}</h1>
        <p className="text-gray-500">You have reached to restricted page</p>
        <button
          className="px-6 py-3 mt-4 text-sm font-semibold transition duration-500 text-stone-100 bg-sky-700 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-offset-2"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default RestrictedPage;
