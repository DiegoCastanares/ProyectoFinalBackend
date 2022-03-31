const express = require("express");
const router = express.Router();
const fs = require("fs");
const productDao = require("../../src/index.js");
const middlewareAuth = require("../middlewares/adminAuth");

//la ruta ./productos nos muesta un array con todos los productos del json
router.get("/", (req, res) => {
  productDao.getAll().then((result) => res.send(result));
});

//la ruta ./productos/:id nos muestra el producto con el id que le pasamos
router.get("/:id", (req, res) => {
  let id = req.params.id;
  productDao.getById(id).then((result) => res.send(result));
});

router.post("/", middlewareAuth, (req, res) => {
  let product = req.body;
  productDao.saveProduct(product).then((result) => res.send(result));
});

router.put("/:id", middlewareAuth, (req, res) => {
  let id = req.params.id;
  let product = req.body;
  productDao.updateProduct(id, product).then((result) => res.send(result));
});

router.delete("/:id", middlewareAuth, (req, res) => {
  let id = req.params.id;
  productDao.deleteProduct(id).then((result) => res.send(result));
});

module.exports = router;
