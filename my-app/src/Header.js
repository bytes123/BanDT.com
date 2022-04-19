import React, { useState, useEffect } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { useStateValue } from "./StateProvider";
import Home from "./Home";
import { Link } from "react-router-dom";

export default function Header() {
  const [{ basket }, dispatch] = useStateValue();
  const [basketLength, setBasketLength] = useState(0);

  useEffect(() => {
    setBasketLength(
      basket
        .map((item) => item.amount)
        .reduce(
          (previousValue, currentValue) => previousValue + currentValue,
          0
        )
    );
  }, [basket]);

  return (
    <div className="header">
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/vi/a/a2/FPT_Telecom_logo.svg"
          alt=""
          className="header_logo"
        />
      </Link>

      <div className="header_search">
        <input type="text" className="header_searchInput" />
        <div className="header_search-icon-wrapper">
          <SearchIcon className="header_searchIcon" />
        </div>
      </div>

      <div className="header_nav">
        <div className="header_option">
          <div className="header_optionLineOne">Xin chào</div>
          <div className="header_optionLineTwo">Đăng nhập</div>
        </div>
        <div className="header_option">
          <div className="header_optionLineOne">Quay lại</div>
          <div className="header_optionLineTwo">& Mua hàng</div>
        </div>

        <Link to="/checkout">
          <div className="header_optionBasket">
            <ShoppingBasketIcon className="header_optionBasketIcon" />
            <span className="header_optionLineTwo header_basketCount">
              {basketLength}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}
