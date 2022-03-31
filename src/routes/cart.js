const express = require("express");
const router = express.Router();
const fs = require("fs");
const { cartDao } = require("../../src/index.js");
const middlewareAuth = require("../middlewares/adminAuth");

router.post("/", async (req, res) => {
  let cart = req.body;
  await cartDao.createCart(cart).then((result) => res.send(result));
  console.log(cartDao);
});

router.delete("/:id", async (req, res) => {
  let id = req.params.id;
  await cartDao.deleteCartById(id).then((result) => res.send(result));
});

router.get("/:id/products", async (req, res) => {
  let id = req.params.id;
  await cartDao.getCartById(id).then((result) => res.send(result));
});

router.post("/:id/products", async (req, res) => {
  let cartId = req.params.id;
  let productId = req.body.id;
  await cartDao
    .addProduct(cartId, productId)
    .then((result) => res.send(result));
});

router.delete("/:id/products/:id_prod", (req, res) => {
  let id = req.params.id;
  let id_prod = req.params.id_prod;
  cartDao.deleteProductById(id, id_prod).then((result) => res.send(result));
});

module.exports = router;
