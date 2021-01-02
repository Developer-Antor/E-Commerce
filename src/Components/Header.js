import React from "react";
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { useStateValue } from "../Context/StateContextProvider";
import { auth } from "../Firebase/Firebase";
function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuth = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header-icon">
          <i class="fas fa-home    "></i>
        </div>
      </Link>
      {/* <div className="header-search">
        <input className="header-search-bar" type="text" />
        <SearchIcon className="header-search-icon" />
      </div> */}
      <div className="header-nav">
        <Link to={!user && "/login"}>
          <div onClick={handleAuth} className="header-option">
            <span className="header-option-line-one">
              Hello {user ? `${user.displayName}` : "Guest"}
            </span>
            <span className="header-option-line-two">
              {user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <Link to="/orders">
          <div className="header-option">
            <span className="header-option-line-one">Returns</span>
            <span className="header-option-line-two">& Orders</span>
          </div>
        </Link>

        <Link to="/admin">
          <div className="header-option">
            <span className="header-option-line-one">Are You</span>
            <span className="header-option-line-two">Admin?</span>
          </div>
        </Link>
        <Link to="/checkout">
          <div className="header-option-basket">
            <ShoppingBasketIcon />
            <span className="header-option-line-two header-basket-count">
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
