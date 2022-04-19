import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useStateValue } from "./StateProvider";

export default function MainProductPage() {
  const [{ products, cleanString }, dispatch] = useStateValue();
  let params = useParams();
  let location = useLocation();

  let product = products.filter(
    (item) => cleanString(item.product_name) == params.product_name
  );

  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: params.category_name,
    });
  }, [location.pathname]);

  return (
    <div className="container">
      {product.length > 0 ? product[0].product_name : ""}
    </div>
  );
}
