import React, { useState, useEffect } from "react";
import "./Checkout.css";
import useCheckout from "./useCheckout";
import validateCheckout from "./validateCheckout";
import { useStateValue } from "../StateProvider";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useLocation } from "react-router-dom";

function Checkout() {
  const [{ basket, profileCustomer, formatMoney }, dispatch] = useStateValue();
  const [isSelectColor, setIsSelectColor] = useState(false);
  const [idActiveDropDown, setIdActiveDropDow] = useState(0);
  const [basketLength, setBasketLength] = useState(0);

  let location = useLocation();

  useEffect(() => {
    dispatch({
      type: "RESET_PROFILE_CUSTOMER",
    });
  }, [location.pathname]);

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

  const totalPrice = basket
    .map((item) => Number(item.price) * item.amount)
    .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

  const handleConfirm = () => {
    console.log(profileCustomer);
  };

  const { handleChange, handleSubmit, values, errors } = useCheckout(
    handleConfirm,
    validateCheckout
  );

  const increaseBasket = (id) => {
    dispatch({
      type: "INCREASE_BASKET",
      payload: {
        id: id,
      },
    });
  };

  const decreaseBasket = (id) => {
    dispatch({
      type: "DECREASE_BASKET",
      payload: {
        id: id,
      },
    });
  };

  const removeBasket = (id) => {
    dispatch({
      type: "REMOVE_BASKET",
      payload: {
        id: id,
      },
    });
  };

  const handleSelectColor = (e, id) => {
    window.onclick = (event) => {
      if (event.target != e.target) {
        setIsSelectColor(false);
      }
    };
    if (id !== idActiveDropDown) {
      setIsSelectColor(true);
      setIdActiveDropDow(id);
    } else {
      setIsSelectColor(!isSelectColor);
    }
  };

  const handleChangeColor = (item, index) => {
    let newCurrentColor = item.miniList[index];
    let oldCurrentColor = item.miniList[0];
    let newColorList = item.miniList.map((item, newIndex) => {
      if (newIndex == 0) {
        return { ...newCurrentColor };
      } else if (newIndex == index) {
        return { ...oldCurrentColor };
      }
      return item;
    });

    dispatch({
      type: "CHANGE_COLOR",
      payload: {
        id: item.id,
        newList: newColorList,
      },
    });
  };

  return (
    <div className="checkout">
      <div className="checkout_wrapper">
        <div className="checkout_product-list">
          <ul className="checkout_product-list-wrapper">
            {basket.map((item, index) => (
              <li className="checkout_product" key={index}>
                <div className="product_info-left">
                  <img
                    className="product_info-img"
                    src={item?.miniList[0]?.product_image}
                    alt=""
                  />
                  <p
                    className="product_info-delete"
                    onClick={() => removeBasket(item.id)}
                  >
                    <HighlightOffIcon />
                    <span>Xóa</span>
                  </p>
                </div>
                <div className="product_info-center">
                  <h3>{item?.title}</h3>
                  <ul className="product_info-code-list">
                    <li className="product_info-code-item">
                      Nhập mã DMX100 giảm 3% tối đa 100.000đ khi thanh toán quét
                      QRcode qua App của ngân hàng
                    </li>
                  </ul>
                  <div className="product_info-color">
                    <span
                      onClick={(e) => handleSelectColor(e, item.id)}
                      className="product_info-color-heading"
                    >
                      Màu: {item.miniList[0].product_color}{" "}
                      <ArrowDropDownIcon />
                    </span>
                    <div
                      className={`${
                        isSelectColor && idActiveDropDown == item.id
                          ? "product_info-mini-wrapper active"
                          : "product_info-mini-wrapper"
                      }`}
                    >
                      <div className="arrow-up"></div>
                      <div
                        className={`${
                          isSelectColor && idActiveDropDown == item.id
                            ? "product_info-color-dropdown active"
                            : "product_info-color-dropdown"
                        }`}
                      >
                        <ul className="product_info-color-dropdown-list">
                          {item.miniList.map((singleMini, miniIndex) => (
                            <li
                              className="product_info-color-dropdown-item"
                              onClick={() => handleChangeColor(item, miniIndex)}
                              key={miniIndex}
                            >
                              <img
                                src={singleMini.product_image}
                                alt=""
                                className="product_info-mini-img"
                              />
                              <span className="product_info-mini-color">
                                {singleMini.product_color}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="product_info-right">
                  <div className="product_info-price-wrapper">
                    <p className="product_info-price">
                      {formatMoney(item?.price)}
                      <sup>đ</sup>{" "}
                    </p>
                    <div className="product_info-old-price">
                      <strike>{formatMoney(item?.price)}</strike>
                      <sup>đ</sup>
                    </div>
                  </div>
                  <div className="product_info-quantity">
                    <span
                      className={`${
                        item?.amount > 1
                          ? "product_info-quantity-minus active"
                          : "product_info-quantity-minus"
                      }`}
                      onClick={() => decreaseBasket(item.id)}
                    >
                      -
                    </span>
                    <input type="number" min="1" value={item?.amount} />
                    <span
                      className="product_info-quantity-plus active"
                      onClick={() => increaseBasket(item.id)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="checkout_totalPrice">
            <span>Tạm tính ({basketLength} sản phẩm):</span>
            <p className="product_info-totalPrice">
              {formatMoney(totalPrice)}
              <sup>đ</sup>
            </p>
          </div>
        </div>
        <form className="checkout_form">
          <div className="checkout_profile">
            <h3>Thông tin khách hàng</h3>
            <div className="checkout_profile-input ">
              <div className="checkout_profile-gender">
                <input
                  type="radio"
                  value="Nam"
                  checked={values.gender == "Nam"}
                  onChange={handleChange}
                ></input>
                <label htmlFor="gender" onClick={handleChange}>
                  Nam
                </label>
                <input
                  type="radio"
                  value="Nữ"
                  checked={values.gender == "Nữ"}
                  onChange={handleChange}
                ></input>
                <label htmlFor="gender" onClick={handleChange}>
                  Nữ
                </label>
              </div>
              <div className="checkout_profile-infor d-flex">
                <div className="checkout_profile-name-wrapper">
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    name="name"
                    className={
                      errors.name
                        ? "checkout_profile-fullName checkout_text-input error-input"
                        : "checkout_profile-fullName checkout_text-input"
                    }
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name ? (
                    <p className="error-text">{errors.name}</p>
                  ) : (
                    ""
                  )}
                </div>
                <div className="checkout_profile-phoneNumber-wrapper">
                  <input
                    type="text"
                    placeholder="Số điện thoại"
                    name="phoneNumber"
                    className={
                      errors.phoneNumber
                        ? "checkout_profile-phoneNumber checkout_text-input error-input"
                        : "checkout_profile-phoneNumber checkout_text-input"
                    }
                    value={values.phoneNumber}
                    onChange={handleChange}
                  />
                  {errors.phoneNumber ? (
                    <p className="error-text">{errors.phoneNumber}</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <h3>CHỌN CÁCH THỨC NHẬN HÀNG</h3>
              <div className="checkout_ship-method">
                <input
                  type="radio"
                  value="Giao tận nơi"
                  name="shippingMethod"
                  checked={values.shippingMethod == "Giao tận nơi"}
                  onChange={handleChange}
                ></input>
                <label htmlFor="shippingMethod" onClick={handleChange}>
                  Giao tận nơi
                </label>
                <input
                  type="radio"
                  value="Nhận tại siêu thị"
                  name="shippingMethod"
                  checked={values.shippingMethod == "Nhận tại siêu thị"}
                  onChange={handleChange}
                ></input>
                <label htmlFor="shippingMethod" onClick={handleChange}>
                  Nhận tại siêu thị
                </label>
              </div>
              <div className="checkout_profile-address-wrapper my-10">
                <input
                  type="text"
                  placeholder="Nhập địa chỉ"
                  name="address"
                  className={
                    errors.address
                      ? "checkout_profile-address checkout_text-input w-100 error-input"
                      : "checkout_profile-address checkout_text-input w-100"
                  }
                  value={values.address}
                  onChange={handleChange}
                />
                {errors.address ? (
                  <p className="error-text">{errors.address}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="checkout_profile-request-wrapper my-10 d-flex">
                <input
                  type="text"
                  placeholder="Yêu cầu khác (không bắt buộc)"
                  className="checkout_profile-request checkout_text-input"
                  value={values.request}
                  onChange={handleChange}
                />
              </div>
              <div className="checkout_profile-code-wrapper my-10 d-flex">
                <input
                  type="text"
                  placeholder="Sử dụng mã giảm giá"
                  className="checkout_profile-code checkout_text-input"
                />
                <button className="checkout_code-confirm-btn">Áp dụng</button>
              </div>
              <div className="checkout_profile-total-wrapper d-flex">
                <span>Tổng tiền:</span>
                <span className="checkout_profile-total-money">
                  {formatMoney(totalPrice)}
                  <sup>đ</sup>
                </span>
              </div>
              <div className="checkout_profile-confirm-wrapper">
                <button className="checkout_confirm-btn" onClick={handleSubmit}>
                  Đặt hàng
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Checkout;
