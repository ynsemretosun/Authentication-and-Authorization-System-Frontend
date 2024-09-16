import { Link } from "react-router-dom";
import Logo from "./Logo";

function PageNav() {
  return (
    <nav className="mx-5 flex h-full w-[80vw] items-center justify-between ">
      <Link to="/">
        <Logo />
      </Link>
    </nav>
  );
}

export default PageNav;
