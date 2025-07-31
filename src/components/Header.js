import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img
          className="logoImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0spjtAPTUSInbJecfaSbTAYw99EoklAEDA&s"
        ></img>
      </div>
      <h1 className="">Parking Lot</h1>
      <div>
        <ul className="navItems">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/vehicleForm">Park Vehicle</Link>
          </li>
          <li>UnPark Vehicle</li>
          <li>Admin: {"test"}</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
