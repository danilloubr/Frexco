import React from "react";
import Logo from "../../images/logo.png";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./navbar.css";
import { useHistory } from "react-router-dom";
function Navbar() {
  const history = useHistory();
  const json = localStorage.getItem("COMPRAS");
  const cart = JSON.parse(json);
  return (
    <header>
      <nav>
        <img
          src={Logo}
          style={{ cursor: "pointer" }}
          alt="Logo"
          onClick={() => history.push("/")}
        />

        <button onClick={() => history.push("/cart")}>
          <p>
            {cart && cart.length}
            <ShoppingCartIcon />
          </p>
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
