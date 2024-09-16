import HeaderLogo from "../../assets/pictures/headerLogo.png";
function Logo() {
  return (
    <img
      src={HeaderLogo}
      alt="KYS logo"
      className=" h-[15vh] w-[60%] object-contain "
    />
  );
}

export default Logo;
