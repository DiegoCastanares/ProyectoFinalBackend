const express = require("express");
const router = express.Router();
const fs = require("fs");
const middlewareAuth = require("../middlewares/adminAuth");
const CartService = require("../services/CartService");

const cartService = new CartService();

router.post("/", (req, res) => {
  let cart = req.body;
  cartService.createCart(cart).then((result) => res.send(result));
});

router.delete("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  cartService.deleteCartById(id).then((result) => res.send(result));
});

router.get("/:id/products", (req, res) => {
  let id = parseInt(req.params.id);
  cartService.getCartById(id).then((result) => res.send(result));
});

router.post("/:id/products", (req, res) => {
  let cartId = parseInt(req.params.id);
  let productId = req.body.id;
  cartService.addProduct(cartId, productId).then((result) => res.send(result));
});

router.delete("/:id/products/:id_prod", (req, res) => {
  let id = parseInt(req.params.id);
  let id_prod = parseInt(req.params.id_prod);
  cartService.deleteProductById(id, id_prod).then((result) => res.send(result));
});

module.exports = router;
