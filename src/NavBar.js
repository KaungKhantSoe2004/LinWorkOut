import { NavLink, Outlet, useNavigate } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { FaArrowCircleLeft, FaArrowCircleRight, FaReact } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUser, removeUser } from "./assets/localStorage/localStorage";
import axios from "axios";
import { useDispatch } from "react-redux";
import { allFavorites } from "./store/action/favorites";
function NavBar() {
  // navigate
  const navigate = useNavigate();

  // dispatch
  const dispatch = useDispatch();

  // user Check
  const userCheck = async () => {
    const user = JSON.parse(getUser());
    if (!user) {
      navigate("/login");
    }
    if (user) {
      const response = await axios.get(
        `https://linworkout-backend.onrender.com/user/${user.id}?_embed=favorites`
      );

      dispatch(allFavorites(response.data.favorites));
    }
  };

  // logout function
  const logOut = () => {
    removeUser();
    navigate("/login");
  };

  // useEffect
  useEffect(() => {
    userCheck();
  }, []);

  const [isMenu, setIsMenu] = useState(false);

  const menuStatus = () => {
    setIsMenu(!isMenu);
  };
  return (
    <div className="NavBarPage ">
      <div className=" ms-2 opacity-100  position-fixed top-0 navBar pt-4 pb-3 row col-12 ">
        <div className="leftMenu col-3 p-4 ">
          <div className=" ms-2 d-flex logoContainer ">
            <img
              className=" logo w-25"
              src={require("./assets/logo.jpg")}
              alt="dd"
            />
            <h3 className=" ms-2 pt-3  text-white">FITNESS</h3>
          </div>
        </div>
        <div className=" p-4 rightMenu offset-2 col-6 text-danger">
          <div className="  d-flex justify-content-between">
            <NavLink to="/" className="pt-4  nav home ">
              Home
            </NavLink>
            <NavLink to="/about" className="pt-4  nav about ">
              About
            </NavLink>
            <NavLink to="/services" className="pt-4  nav services ">
              Services
            </NavLink>
            <NavLink to="/contact" className="pt-4  nav contact ">
              Contact
            </NavLink>
            <NavLink to="/favorites" className="pt-4  nav favorites ">
              Favorites
            </NavLink>
            <NavLink to="/calories" className="pt-4  nav calories">
              Calories
            </NavLink>
            <div className=" pt-3 nav account">
              <button
                onClick={logOut}
                className=" btn btn-sm text-white p-2  logBtn"
              >
                Log Out <FaArrowCircleRight />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className=" position-fixed  top-0  py-1 row col-12  menu ">
        <div className="leftMenu ps-4 col-5 pt-4 ">
          <div className=" ms-2 d-flex logoContainer ">
            <img
              className=" logoSmall"
              src={require("./assets/logo.jpg")}
              alt="dd"
            />
            <h3 className=" ms-2 pt-3  text-white">FITNESS</h3>
          </div>
        </div>

        <div
          onClick={menuStatus}
          className=" rightMenu mt-2 pt-5 ps-4  col-2 offset-5 "
        >
          <div className={`menubar one ${isMenu && "rotateDown"}`}></div>
          <div className={`menubar two ${isMenu && "d-none"} `}></div>
          <div className={`menubar three ${isMenu && "rotateUp"} `}></div>
        </div>
        <div
          className={` menuGroup col-10 offset-1 ps-2 ${
            !isMenu && "menuGroupNone"
          } `}
        >
          <NavLink
            to="/"
            className={`py-2  ms-3 mt-2 p-1 ${!isMenu && "menuUp"}`}
          >
            HOME
          </NavLink>
          <NavLink
            to="/about"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            ABOUT{" "}
          </NavLink>
          <NavLink
            to="/services"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            SERVICES
          </NavLink>
          <NavLink
            to="/contact"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            CONTACT
          </NavLink>
          <NavLink
            to="/favorites"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            FAVORITES
          </NavLink>
          <NavLink
            to="/calories"
            className={` py-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}
          >
            CALORIES
          </NavLink>
          <div className={`py-2  mb-2 ps-1 ms-3 ${!isMenu && "menuUp"}`}>
            LOG OUT
          </div>
        </div>
      </div>

      <Outlet />
      <div className=" mt-5 footer   p-2  text-white">
        <div className=" text-center text-dark ">
          All rights reserved by KKS @2024 !
        </div>
      </div>
    </div>
  );
}
export default NavBar;
