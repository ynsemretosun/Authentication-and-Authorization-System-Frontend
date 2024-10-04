import ErrorPage from "../../pages/ErrorPage";
/* eslint react/prop-types: 0 */
// Kısıtlanmış sayfaların erişimini kontrol eden component; izin verilen roller dizi olarak verilmelidir!
function RestrictedRoute({ children, roles }) {
  const role = localStorage.getItem("role").toLocaleLowerCase(); // Kullanıcının rolünün alınması
  roles = roles.map((role) => role.toLowerCase()); // Rol isimlerinin küçük harfe çevrilmesi
  // Eğer kullanıcı yetkili değilse hata sayfasına yönlendir
  if (!roles.includes(role))
    return (
      <ErrorPage
        code={403}
        header={"Access Denied"}
        message={"You are not authorized to access this page!"}
      />
    );
  return children; // Eğer kullanıcı yetkiliyse sayfayı göster
}

export default RestrictedRoute;
