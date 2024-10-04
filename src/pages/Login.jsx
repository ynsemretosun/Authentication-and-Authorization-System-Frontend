import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/pictures/loginPageLogo.jpg";
import Spinner from "../features/ui/Spinner";
import Toast, { notifyError } from "../features/ui/Toast";
import { login } from "../features/users/userSlice";
function Login() {
  // Kullanıcı adı ve şifre state'lerinin tanımlanması
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Giriş işleminin gereçekleştirilmesi sırasında işlem durumunun elde edilmesi
  const { isLoading } = useSelector((state) => state.user);

  // Giriş işleminin gerçekleştirilmesi
  async function handleSubmit(e) {
    e.preventDefault();
    // Kullanıcı adı ve şifre alanlarının dolu olup olmadığının kontrolü
    if (username && password) {
      const res = await dispatch(login(username, password)); // Redux'taki login fonksiyonunuyla giriş işlemi gerçekleştirilir
      if (res) {
        navigate("/verifyOtp"); // Giriş işlemi başarılıysa kullanıcıyı doğrulama sayfasına yönlendir
      } else {
        notifyError(); // Giriş işlemi başarısızsa hata mesajı göster
      }
    } else {
      // Eğer kullanıcı adı ve şifre alanları boşsa hata mesajı gösterilir
      notifyError("Please fill in all fields");
    }
  }

  // Sosyal medya hesaplarıyla giriş işlemlerinin gerçekleştirilmesi
  function googleAut() {
    window.open("https://localhost:443/api/auth/google", "_self");
  }
  function githubAut() {
    window.open("https://localhost:443/api/auth/github", "_self");
  }
  function facebookAut() {
    window.open("https://localhost:443/api/auth/facebook", "_self");
  }

  // Kullanıcının daha önce giriş yapmış olup olmadığının kontrolü
  useEffect(
    function () {
      // Eğer kullanıcı daha önce giriş yapmışsa kullanıcı profil sayfasına yönlendirilir
      const token = Cookies.get("token");
      const id = localStorage.getItem("id");
      if (token) {
        navigate("/profile/" + id);
      }
    },
    [navigate]
  );
  return (
    <>
      {isLoading ? (
        <Spinner fullScreen={true} /> // Eğer giriş işlemi hala devam ediyorsa spinner gösterilir
      ) : (
        <>
          <Toast />
          {/* Giriş sayfasının tasarımı */}
          <main className=" m-auto flex min-h-screen max-h-full w-full flex-col items-center justify-center px-4 md:px-8 ">
            <Toast />
            <div>
              <Link
                to="http://giresun.edu.tr"
                className="mb-6 flex items-center  "
              >
                <img
                  src={Logo}
                  alt="logo"
                  className=" h-32 w-40 object-center"
                />
              </Link>
            </div>

            <div className="mt-0 w-full max-w-xl rounded-lg bg-zinc-50 px-6  shadow md:max-w-2xl ">
              <div className="space-y-4 ">
                <h1 className="text-2xl font-bold leading-tight tracking-tight text-gray-700">
                  Log In with LDAP
                </h1>
                <form className="space-y-4 px-4  " onSubmit={handleSubmit}>
                  <div className="flex flex-col mx-10">
                    <label className=" mb-2 block place-self-start text-lg font-semibold text-gray-700">
                      User Logon Name
                    </label>
                    <input
                      id="username"
                      className="h-10 rounded-md text-center outline-none  ring-sky-600  focus:ring-1 "
                      type="text"
                      required
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </div>
                  <div className="flex flex-col mx-10 ">
                    <label className="mb-2 block place-self-start text-lg font-semibold text-gray-700">
                      Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      className="h-10 rounded-md text-center outline-none  ring-sky-600  focus:ring-1 "
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></input>
                  </div>
                  <div className="flex flex-col mx-10 items-center">
                    <button
                      className="my-4 rounded-md w-full hover:bg-sky-600 bg-sky-700 p-3 font-semibold text-stone-100 transition duration-500 focus:ring focus:ring-sky-800 focus:ring-offset-2 "
                      disabled={isLoading}
                    >
                      Login
                    </button>
                  </div>
                  <div className="flex items-center justify-center">
                    <hr className="w-1/2 border-1 border-gray-700"></hr>
                    <span className="mx-2 text-gray-900">Or</span>
                    <hr className="w-1/2 border-1 border-gray-700"></hr>
                  </div>
                  <div className="flex items-center justify-center flex-col">
                    <button
                      type="button"
                      className="text-white w-3/4 bg-red-500 justify-center hover:bg-red-400 focus:ring-4 transition duration-500 focus:ring-offset-2 focus:ring-red-500/50 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                      onClick={googleAut}
                    >
                      <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 18 19"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sign in with Google
                    </button>
                    <button
                      type="button"
                      className="text-white w-3/4 focus:ring-offset-2 transition duration-500 justify-center bg-slate-900 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-stone-900/50 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                      onClick={githubAut}
                    >
                      <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sign in with Github
                    </button>
                    <button
                      type="button"
                      className="text-white w-3/4 focus:ring-offset-2 transition duration-500 justify-center bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
                      onClick={facebookAut}
                    >
                      <svg
                        className="w-4 h-4 me-2"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 8 19"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Sign in with Facebook
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default Login;
