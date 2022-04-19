"use strict";

const util = require("util");
const mysql = require("mysql");
const db = require("./../db");

module.exports = {
  get: (req, res) => {
    let sql = "SELECT * from category";
    db.query(sql, (err, response) => {
      if (err) throw err;
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "X-Requested-With");
      res.json(response);
    });
  },
};
