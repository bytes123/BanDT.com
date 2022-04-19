import React, { useState, useEffect } from "react";
import Slider from "./Slider";
import Product from "./Product";
import "./Home.css";
import { useStateValue } from "./StateProvider";

export default function Home() {
  const [{ products, details_product }, dispatch] = useStateValue();

  return (
    <div className="home">
      <div className="home_container">
        <Slider />

        <div className="home_products">
          <div className="home_row row">
            <h2 className="home_header">Điện thoại nổi bật</h2>
            {products
              .filter((item) => item.category_english_name == "phone")
              .slice(0, 5)
              .map((product, index) => {
                let productImage =
                  details_product.length > 0
                    ? details_product.filter(
                        (detail) => detail.product_id == product.product_id
                      )[0] != undefined
                      ? details_product.filter(
                          (detail) => detail.product_id == product.product_id
                        )[0].product_image
                      : ""
                    : [];

                let miniList =
                  details_product.length > 0
                    ? details_product.filter(
                        (detail) => detail.product_id == product.product_id
                      )
                    : [];

                return (
                  <Product
                    key={index}
                    id={product.product_name ?? ""}
                    title={"Điện thoại " + product.product_name ?? ""}
                    category={product.category_english_name}
                    amount={1}
                    price={product.product_price ?? ""}
                    image={productImage ?? ""}
                    rating={product.product_star_point}
                    miniList={miniList}
                  />
                );
              })}
          </div>
          <div className="home_row row">
            <h2 className="home_header">Laptop nổi bật</h2>
            {products
              .filter((item) => item.category_english_name == "laptop")
              .slice(0, 5)
              .map((product, index) => {
                let productImage =
                  details_product.length > 0
                    ? details_product.filter(
                        (detail) => detail.product_id == product.product_id
                      )[0] != undefined
                      ? details_product.filter(
                          (detail) => detail.product_id == product.product_id
                        )[0].product_image
                      : ""
                    : [];

                let miniList =
                  details_product.length > 0
                    ? details_product.filter(
                        (detail) => detail.product_id == product.product_id
                      )
                    : [];
                if (product.category_english_name == "laptop" && index < 5) {
                  return (
                    <Product
                      key={index}
                      id={product.product_name ?? ""}
                      title={product.product_name ?? ""}
                      category={product.category_english_name}
                      amount={1}
                      price={product.product_price ?? ""}
                      image={productImage ?? ""}
                      rating={product.product_star_point}
                      miniList={miniList}
                    />
                  );
                }
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
