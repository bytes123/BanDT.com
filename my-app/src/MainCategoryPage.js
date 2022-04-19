import React, { useEffect } from "react";
import "./MainCategoryPage.css";
import { useParams, useLocation } from "react-router-dom";
import { useStateValue } from "./StateProvider";

export default function MainCategoryPage() {
  let category = useParams();
  let location = useLocation();

  const [{ category_name }, dispatch] = useStateValue();
  useEffect(() => {
    dispatch({
      type: "GET_CATEGORY_NAME",
      payload: category.category_name,
    });
  }, [location.pathname]);
  return <div className="container">Trang {category.category_name}</div>;
}
