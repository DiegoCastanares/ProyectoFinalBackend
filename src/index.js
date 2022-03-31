const ProductServiceMongo = require("./services/ProductServiceMongo.js");
const ProductService = require("./services/ProductService.js");
const CartServiceMongo = require("./services/cartServiceMongo.js");
const CartService = require("./services/CartService.js");

const fs = require("fs");

const dbToUse = "mongo";

let productDao;
let cartDao;

switch (dbToUse) {
  case "mongo":
    productDao = new ProductServiceMongo();
    cartDao = new CartServiceMongo();
    break;
  case "fs":
    productDao = new ProductService();
    cartDao = new CartService();
    break;
  default:
    break;
}

module.exports = { productDao, cartDao };
