import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useStateValue } from "./StateProvider";

export default function MainBrandPage() {
  let params = useParams();
  let location = useLocation();
  let brandName = params.brand_name.replace("laptop-", "");
  let categoryName = params.brand_name
    .replace(`${brandName}`, "")
    .replace("-", "");
  const [{ category_name }, dispatch] = useStateValue();

  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: categoryName,
    });
  }, [location.pathname]);

  return <div className="container">Trang {brandName}</div>;
}
