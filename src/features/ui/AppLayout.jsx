import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { MdArrowCircleLeft } from "react-icons/md";
import PageNav from "./PageNav";
function AppLayout() {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const navigate = useNavigate();
  function handleBack() {
    navigate(-1);
  }
  return (
    <>
      <div className="h-[10vh]">
        <PageNav />
        {splitLocation[1] === "halls" ? (
          <button
            onClick={handleBack}
            className="absolute -right-0 top-4 mr-2 cursor-pointer text-sky-900 transition duration-500 hover:text-sky-700"
          >
            <span className="text-2xl ">
              <MdArrowCircleLeft size={40} />
            </span>
            <span className="mr-4">Geri Dön</span>
          </button>
        ) : null}
      </div>
      <div className={`${splitLocation[1] === "halls" ? "p-10" : ""}`}>
        <Outlet className="h-[90vh]" />
      </div>
    </>
  );
}

export default AppLayout;
