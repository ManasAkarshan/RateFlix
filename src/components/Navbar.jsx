import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const isLoggedIn = localStorage.getItem("guest_session_id") !== null;
  const navigate = useNavigate();

  const logOut = ()=>{
    localStorage.removeItem("guest_session_id");
    navigate("/auth")
  }

  return (
    <Menu fixed="top" size="huge">
      <Menu.Item as={Link} to="/home" style={{ fontSize: "1.5rem" }}>
        Home
      </Menu.Item>

      <Menu.Item as={Link} to="/rated" style={{ fontSize: "1.5rem" }}>
        Rated
      </Menu.Item>

      {isLoggedIn ? <Menu.Item
        position="right"
        as={Link}
        to="/auth"
        style={{ fontSize: "1.5rem" }}
        onClick={logOut}
      >
        Logout
      </Menu.Item> : <Menu.Item
        position="right"
        as={Link}
        to="/auth"
        style={{ fontSize: "1.5rem" }}
      >
        Auth
      </Menu.Item>}
    </Menu>
  );
};

export default Navbar;
