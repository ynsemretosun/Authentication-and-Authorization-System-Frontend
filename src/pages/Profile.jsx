import {
  HiOutlineIdentification,
  HiOutlineMail,
  HiOutlineUser,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Avatar from "../assets/pictures/avatar.jpg";
import Spinner from "../features/ui/Spinner";
import Toast, { notifyError } from "../features/ui/Toast";
import { logout } from "../features/users/userSlice";
import getUserInfo from "../helpers/getUserInfo";
function Profile() {
  // Redux'taki user state'inden kullanıcının yüklenme durumunun alınması
  const { isLoading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Local Storage'dan kullanıcı bilgilerinin alınması
  const { displayName, email, id, photo, role, userType, groups } =
    getUserInfo();

  // Çıkış işleminin gerçekleştirilmesi
  async function handleLogout() {
    const response = await dispatch(logout()); // Redux'taki logout fonksiyonuyla çıkış işleminin gerçekleştirilmesi
    if (response) {
      navigate("/login"); // Çıkış işlemi başarılıysa kullanıcıyı giriş sayfasına yönlendir
    } else {
      notifyError("Logout failed");
    }
  }
  // Eğer çıkış işlemi hala devam ediyorsa spinner göster
  if (isLoading) return <Spinner fullScreen={true} />;

  return (
    <>
      <Toast />
      {/* Kullanıcı profil sayfasının tasarımı */}
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md flex flex-col place-self-center bg-white border border-gray-200 rounded-lg shadow-lg p-6">
          <div className="flex justify-center mt-4">
            <img
              className="w-32 h-32 rounded-full border-4 border-gray-300"
              src={photo !== "Photo not provided" ? photo : Avatar}
              alt="Profile Picture"
            ></img>
          </div>

          <div className="p-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              {displayName}
            </h2>
            <p className="text-md text-gray-500">User Type: {userType}</p>

            {userType === "LDAP User" && (
              <div className="text-md text-gray-500 mt-4">
                <p className="text-md font-semibold">Groups:</p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  {groups && groups.length > 0 ? (
                    groups.map((group, index) => (
                      <span
                        key={index}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-300"
                      >
                        {group}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500">No Groups Assigned</p>
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col items-center mt-6 space-y-4">
              {/* ID alanı */}
              <div className="flex items-center justify-between w-full">
                <HiOutlineIdentification className="w-6 h-6 text-gray-600" />
                <p className="ml-2 text-md text-gray-700 font-medium flex-1 text-left truncate">
                  ID: <span className="font-semibold text-gray-900">{id}</span>
                </p>
              </div>

              {/* E-posta alanı */}
              <div className="flex items-center justify-between w-full">
                <HiOutlineMail className="w-6 h-6 text-gray-600" />
                <p className="ml-2 text-md text-gray-700 font-medium flex-1 text-left truncate">
                  Email:{" "}
                  <span className="font-semibold text-gray-900">
                    {email !== "Email not provided" ? email : "Not provided"}
                  </span>
                </p>
              </div>
              <div className="flex items-center justify-between w-full">
                <HiOutlineUser className="w-6 h-6 text-gray-600" />
                <p className="ml-2 text-md text-gray-700 font-medium flex-1 text-left truncate">
                  Role:{" "}
                  <span className="font-semibold text-gray-900">
                    {role ? role : "Role not assigned"}
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => handleLogout()}
                className="text-white w-3/4 bg-red-500 justify-center hover:bg-red-400 focus:ring-4 transition duration-500 focus:ring-offset-2 focus:ring-red-500/50 font-medium rounded-lg text-md px-5 py-2.5 text-center inline-flex items-center  me-2 mb-2"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
