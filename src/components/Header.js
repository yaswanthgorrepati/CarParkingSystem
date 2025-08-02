import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img
          className="logoImg"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRA0spjtAPTUSInbJecfaSbTAYw99EoklAEDA&s"
          alt="ParkingLogo"
        ></img>
      </div>

      <div className="titleWrapper">
        <h1 className="title">Parking Lot</h1>
      </div>
      <div>
        <ul className="navItems">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/vehicleForm">Park Vehicle</Link>
          </li>
          <li>
            <Link to="/unparkVehicle">UnPark Vehicle</Link>
          </li>
          <li className="admin">
            Admin: <strong>{"test"}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
