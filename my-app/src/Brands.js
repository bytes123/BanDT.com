import React from "react";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./Brands.css";

function Brands({ brandsList }) {
  const [{ cleanString }, dispatch] = useStateValue();

  return (
    <div className="category">
      <div className="category_row">
        {brandsList.map((item, index) => {
          return (
            <Link
              to={`/${
                item.category_english_name + "-" + cleanString(item.brand_name)
              }`}
              key={index}
            >
              <div className="category_col">
                <img src={item.brand_image} alt={item.brand_name} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Brands;
