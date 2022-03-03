const express = require("express");
const router = express.Router();
const fs = require("fs");
const middlewareAuth = require("../middlewares/adminAuth");
const ProductService = require("../services/productService");

const productService = new ProductService();

//la ruta ./productos nos muesta un array con todos los productos del json
router.get("/", (req, res) => {
  productService.getAll().then((result) => res.send(result));
});

//la ruta ./productos/:id nos muestra el producto con el id que le pasamos
router.get("/:id", (req, res) => {
  let id = parseInt(req.params.id);
  productService.getById(id).then((result) => res.send(result));
});

router.post("/", middlewareAuth, (req, res) => {
  let product = req.body;
  productService.saveProduct(product).then((result) => res.send(result));
});

router.put("/:id", middlewareAuth, (req, res) => {
  let id = parseInt(req.params.id);
  let product = req.body;
  productService.updateById(id, product).then((result) => res.send(result));
});

router.delete("/:id", middlewareAuth, (req, res) => {
  let id = parseInt(req.params.id);
  productService.deletebyId(id).then((result) => res.send(result));
});

module.exports = router;
