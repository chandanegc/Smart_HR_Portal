import { Link } from "react-router-dom";
// import logo from "../assets/images/logo.png";

const Logo = () => {
  return (
    <Link to="/">
      {" "}
      <img src="/logo.png" alt="Smart HR Portal" className="logo" />
    </Link>
  );
};
export const SmallLogo = () => {
  return (
    <Link to="/">
      <img
        src="/logo.png"
        alt="Smart HR Portal"
        height={"100px"}
        className="logo"
      />
    </Link>
  );
};
export const VerySmallLogo = () => {
  return (
    <Link to="/">
      {" "}
      <img
        src="/logo.png"
        alt="Smart HR Portal"
        height={"80px"}
        className="logo"
      />
    </Link>
  );
};
export default Logo;
