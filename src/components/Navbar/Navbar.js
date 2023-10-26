import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { UserContext } from '../../context/UserContext';
import "./Navbar.css";
//import { GiRocketThruster } from "react-icons/gi";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import star from '../../assets/images/Department Star 10-8-2019 100x100.png';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const { userContext, Logout } = useContext(UserContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" image={star}>
              <img className="navbar-icon img-responsive mb-2" style={{ height: 50, width: 50 }} src={star} alt="logo" />
              {/* <GiRocketThruster className="navbar-icon" onClick={closeMobileMenu} /> */}
              RsoApp Template
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />}
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/about"
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                  onClick={closeMobileMenu}
                >
                  About
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                  onClick={closeMobileMenu}
                >
                  Contact
                </NavLink>
              </li>
              {
                userContext?.validCredentials
                  ?
                  <>
                    <li className="nav-item">
                      <NavLink
                        to="/usercontextdisplay"
                        className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                        onClick={closeMobileMenu}
                      >
                        {userContext.firstname}'s User Context
                      </NavLink>
                    </li>
                    <Button onClick={(() => Logout())}>Logout</Button>
                  </>
                  :
                  <li className="nav-item">
                    <NavLink
                      to="/login"
                      className={({ isActive }) => "nav-links" + (isActive ? " activated" : "")}
                      onClick={closeMobileMenu}
                    >
                      Login
                    </NavLink>
                  </li>
              }
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar;