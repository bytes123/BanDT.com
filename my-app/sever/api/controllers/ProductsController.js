"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("./../db");

module.exports = {
  get: (req, res) => {
    let sql =
      "SELECT products.*,category.category_english_name FROM products,category WHERE product_category = category_id ORDER BY products.create_date DESC";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(response);
    });
  },
  getDetailsProduct: (req, res) => {
    let sql = "SELECT * FROM details_product";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(response);
    });
  },
  detail: (req, res) => {
    let sql = "SELECT * FROM products WHERE id = ?";
    db.query(sql, [req.params.productId], (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(response[0]);
    });
  },
  update: (req, res) => {
    let data = req.body;
    let productId = req.params.productId;
    let sql = "UPDATE products SET ? WHERE id = ?";
    db.query(sql, [data, productId], (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json({ message: "Update success!" });
    });
  },
  store: (req, res) => {
    let data = req.body;
    let sql = "INSERT INTO products SET ? ";
    db.query(sql, [data], (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json({ message: "Insert success!" });
    });
  },
  delete: async (req, res) => {
    let sql = "DELETE FROM products WHERE id = ?";

    db.query(sql, [req.params.productId], (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json({ message: "Delete success!" });
    });
  },
};
