import { useState } from "react";
import { HiOutlineLibrary } from "react-icons/hi";
import {
  MdClose,
  MdOutlineDesk,
  MdOutlineHome,
  MdOutlineLogout,
  MdOutlinePersonAddAlt,
  MdOutlinePersonPin,
  MdOutlineSettings,
  MdOutlineSpaceDashboard,
} from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../admin/userSlice";
import { notifySuccess } from "./Toast";
function Sidebar() {
  const isAdmin = JSON.parse(localStorage.getItem("isAdmin"));
  const [isExpanden, setIsExpanded] = useState(false);
  const location = useLocation();
  const { pathname } = location;
  const splitLocation = pathname.split("/");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLogout() {
    dispatch(logout());
    await navigate("/");
    notifySuccess("Başarıyla çıkış yapıldı!");
  }
  return (
    <>
      <div className="flex"></div>
      <div
        className={`
        ${
          isExpanden
            ? "sm:w[5dvw] w-[30vw] md:w-[20dvw]"
            : "w-[10dvw] sm:w-[5dvw] md:w-[5dvw]"
        }  inset-x-0 flex h-[90vh]  rounded-sm  bg-sky-900 text-xl font-semibold text-gray-950 opacity-70 duration-500 md:text-2xl
      `}
      >
        <button
          onClick={() => setIsExpanded(!isExpanden)}
          className="absolute -right-0 top-4 mr-6 cursor-pointer text-sky-900 transition duration-500 hover:text-sky-700"
        >
          {!isExpanden ? <RxHamburgerMenu size={40} /> : <MdClose size={40} />}
        </button>
        <nav className="h-full w-full text-start">
          <ul className=" flex h-full flex-col items-center justify-evenly  ">
            <li className="w-full px-4">
              <NavLink
                to="https://www.giresun.edu.tr/"
                target="_blank"
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                } flex items-center gap-x-2 transition duration-500  hover:bg-stone-200`}
                onClick={() => setIsExpanded(false)}
              >
                <span>
                  <MdOutlineHome className="text-4xl  md:text-5xl" />
                </span>

                {isExpanden && (
                  <p className="place-items-start"> Üniversite Sayfası </p>
                )}
              </NavLink>
            </li>

            <li className="w-full px-4 ">
              <NavLink
                className={`${
                  isExpanden
                    ? "justify-start  md:px-10 lg:px-20"
                    : "justify-center "
                } ${
                  splitLocation[2] === "dashboard" ? "bg-stone-100" : ""
                } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200 `}
                to="/admin/dashboard"
                onClick={() => setIsExpanded(false)}
              >
                <span>
                  <MdOutlineSpaceDashboard className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> Özet Paneli </p>}
              </NavLink>
            </li>
            <li className="w-full px-4 ">
              <NavLink
                to="/admin/halls"
                onClick={() => setIsExpanded(false)}
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                } ${
                  splitLocation[2] === "halls" ? "bg-stone-100" : ""
                } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200`}
              >
                <span>
                  <HiOutlineLibrary className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> Salonlar </p>}
              </NavLink>
            </li>
            <li className="w-full px-4 ">
              <NavLink
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                } ${
                  splitLocation[2] === "occupiedTables" ? "bg-stone-100" : ""
                } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200`}
                to="/admin/occupiedTables"
                onClick={() => setIsExpanded(false)}
              >
                <span>
                  <MdOutlineDesk className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> İşgaldeki Masalar </p>}
              </NavLink>
            </li>
            {isAdmin === true ? (
              <li className="w-full px-4 ">
                <NavLink
                  className={`${
                    isExpanden
                      ? "justify-start md:px-10 lg:px-20"
                      : "justify-center"
                  } ${
                    splitLocation[2] === "addUser" ? "bg-stone-100" : ""
                  } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200`}
                  to="/admin/addUser"
                  onClick={() => setIsExpanded(false)}
                >
                  <span>
                    <MdOutlinePersonAddAlt className="text-4xl md:text-5xl" />
                  </span>
                  {isExpanden && <p> Kullanıcı Ekle </p>}
                </NavLink>
              </li>
            ) : null}
            <li className="w-full px-4 ">
              <NavLink
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                } ${
                  splitLocation[2] === "users" ? "bg-stone-100" : ""
                } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200 `}
                to="/admin/users"
                onClick={() => setIsExpanded(false)}
              >
                <span>
                  <MdOutlinePersonPin className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> Kullanıcıları Görüntüle </p>}
              </NavLink>
            </li>
            <li className="w-full px-4 ">
              <NavLink
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                } ${
                  splitLocation[2] === "changePassword" ? "bg-stone-100" : ""
                } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200`}
                to="/admin/changePassword"
                onClick={() => setIsExpanded(false)}
              >
                <span>
                  <RiLockPasswordLine className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> Şifre Değiştir </p>}
              </NavLink>
            </li>
            <li className="w-full px-4 ">
              <NavLink
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                } ${
                  splitLocation[2] === "profileSettings" ? "bg-stone-100" : ""
                } flex items-center gap-x-2 transition duration-500 hover:bg-stone-200`}
                to="/admin/profileSettings"
                onClick={() => setIsExpanded(false)}
              >
                <span>
                  <MdOutlineSettings className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> Profili Düzenle </p>}
              </NavLink>
            </li>
            <li className="w-full px-4 ">
              <NavLink
                className={`${
                  isExpanden
                    ? "justify-start md:px-10 lg:px-20"
                    : "justify-center"
                }  flex items-center gap-x-2 transition duration-500 hover:bg-stone-200`}
                to="/"
                onClick={handleLogout}
              >
                <span>
                  <MdOutlineLogout className="text-4xl md:text-5xl" />
                </span>
                {isExpanden && <p> Çıkış Yap </p>}
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Sidebar;
