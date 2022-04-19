import React, { useEffect } from "react";
import Header from "./Header";
import Home from "./Home";
import Checkout from "./Checkout/Checkout";
import Brands from "./Brands";
import Banner from "./Banner";
import ProductCategory from "./ProductCategory";
import ScrollToTop from "./scrollToTop";
import MainCategoryPage from "./MainCategoryPage";
import MainProductPage from "./MainProductPage";
import MainBrandPage from "./MainBrandPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import { useStateValue } from "./StateProvider";
import "./App.css";

function App() {
  const axios = require("axios");
  const [{ products, brands }, dispatch] = useStateValue();

  async function getProducts() {
    try {
      const response = await axios.get("http://localhost:5000/products");

      dispatch({
        type: "GET_PRODUCTS",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getDetailsProduct() {
    try {
      const response = await axios.get("http://localhost:5000/details_product");
      dispatch({
        type: "GET_DETAILS_PRODUCT",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getProductCategory() {
    try {
      const response = await axios.get("http://localhost:5000/category");
      dispatch({
        type: "GET_PRODUCT_CATEGORY",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function getBrands() {
    try {
      const response = await axios.get("http://localhost:5000/brands");
      dispatch({
        type: "GET_BRANDS",
        payload: response.data,
      });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getProducts();
    getDetailsProduct();
    getProductCategory();
    getBrands();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Header />
        <ProductCategory />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Brands
                  brandsList={
                    brands.filter(
                      (item) => item.category_english_name == "laptop"
                    ) ?? []
                  }
                />
                <Home />
              </>
            }
          />
          <Route
            path="/checkout"
            element={
              <>
                <Checkout />
              </>
            }
          />
          <Route />
          <Route
            path="/:brand_name"
            element={
              <>
                <MainBrandPage />
              </>
            }
          />
          <Route
            path="/category/:category_name"
            element={
              <>
                <MainCategoryPage />
              </>
            }
          />
          <Route
            path="/:category_name/:product_name"
            element={
              <>
                <MainProductPage />
              </>
            }
          />
          <Route />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
