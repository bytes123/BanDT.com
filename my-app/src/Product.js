import React, { useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import { Link } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";

export default function Product({
  id,
  title,
  amount,
  category,
  image,
  price,
  rating,
  miniList,
}) {
  const [{ basket, formatMoney, cleanString }, dispatch] = useStateValue();

  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      payload: {
        id: id,
        title: title,
        amount: amount,
        image: image,
        price: price,
        rating: rating,
        miniList: miniList,
      },
    });
  };

  useEffect(() => {
    let user, password;
    if (!user && !password) {
      localStorage.setItem("basket", JSON.stringify(basket));
    }
  }, [basket]);

  return (
    <div className="product col-lg-2 col-md-4 col-sm-12">
      <Link to={`${category}/${cleanString(id)}`}>
        <div className="product_wrapper">
          <img className="product_img" src={image} alt="" />
          <div className="product_info">
            <p className="product_title">{title}</p>
            <p className="product_price">
              <strong>{formatMoney(price)}</strong>
              <sup>
                <b>
                  <u>đ</u>
                </b>
              </sup>
            </p>
            <div className="product_rating">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <p key={i}>
                    <StarIcon />
                  </p>
                ))}
            </div>
          </div>
        </div>
      </Link>
      <button onClick={addToBasket}>Thêm vào giỏ hàng</button>
    </div>
  );
}
