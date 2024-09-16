import { useNavigate } from "react-router";
/* eslint react/prop-types: 0 */
function ErrorPage({ code, header, message, buttonType }) {
  const navigate = useNavigate();
  const loginButton = {
    text: "Go to Login Page",
    onClick: () => navigate("/login"),
  };
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-9xl font-bold text-sky-700">{code}</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          {header}
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">{message}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          {buttonType === "login" ? (
            <button
              className="px-6 py-3 text-sm font-semibold transition duration-500 text-stone-100 bg-sky-700 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-offset-2"
              onClick={loginButton.onClick}
            >
              {loginButton.text}
            </button>
          ) : (
            <button
              className="px-6 py-3 text-sm font-semibold transition duration-500 text-stone-100 bg-sky-700 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-800 focus:ring-offset-2"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
          )}
        </div>
      </div>
    </main>
  );
}

export default ErrorPage;
