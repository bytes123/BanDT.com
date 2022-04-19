"use strict";
module.exports = function (app) {
  let productsCtrl = require("./controllers/ProductsController");
  let categoryCtrl = require("./controllers/CategoryController");
  let brandsCtrl = require("./controllers/BrandsController");

  // todoList Routes
  app.route("/products").get(productsCtrl.get).post(productsCtrl.store);

  app.route("/details_product").get(productsCtrl.getDetailsProduct);

  app
    .route("/products/:productId")
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);

  app.route("/category").get(categoryCtrl.get);

  app.route("/brands").get(brandsCtrl.get);
};
