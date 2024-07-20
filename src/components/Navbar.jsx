import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Form, FormField, Button } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
  const navigate = useNavigate();
  const [active, setActive] = useState(1)

  const logOut = () => {
    localStorage.removeItem("guest_session_id");
    navigate("/auth");
  };

  return (
    <Menu fixed="top" >
      <Menu.Item 
        active = {active===1}
        className="nav-link sm:text-2xl text-lg"
        as={Link}
        to="/home"
        onClick={()=>{setActive(1)}}
      >
        Home
      </Menu.Item>
      <Menu.Item
        active = {active===2}
        className="nav-link sm:text-2xl text-lg"
        as={Link}
        to="/trending"
        onClick={()=>{setActive(2)}}
      >
        Trending
      </Menu.Item>

      <Menu.Item
        active = {active===3}
        className="nav-link sm:text-2xl text-lg"
        as={Link}
        to="/rated"
        onClick={()=>{setActive(3)}}
      >
        Rated
      </Menu.Item>

      {isLoggedIn ? (
        <Menu.Item
        className="nav-link sm:text-2xl text-lg"
          position="right"
          as={Link}
          to="/auth"
          onClick={logOut}
        >
          Logout
        </Menu.Item>
      ) : (
        <Menu.Item
        className="nav-link sm:text-2xl text-lg"
          position="right"
          as={Link}
          to="/auth"
          style={{ fontSize: "1.2rem" }}
        >
          Auth
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
