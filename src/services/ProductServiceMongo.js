const mongoose = require("mongoose");
const productService = require("../model/product.js");

mongoose.connect(
  "mongodb+srv://Diego:123@codercluster18335.oxenh.mongodb.net/proyectoCoder?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw new Error("Cannot connect to Mongo");
    console.log("Base conectada");
  }
);

class ProductServiceMongo {
  getAll = async () => {
    let products = await productService.find();
    if (products) return { status: "success", payload: products };
    return { status: "error", message: "error" };
  };

  getById = async (id) => {
    let product = await productService.findById(id);
    if (product) return { status: "success", payload: product };
    else return { status: "error", error: "Null" };
  };

  saveProduct = async (product) => {
    let newProduct = await productService.create(product);
    return {
      status: "success",
      message: `Product saved id:${newProduct._id}`,
    };
  };

  updateProduct = async (id, product) => {
    let updatedProduct = await productService.findByIdAndUpdate(id, product);
    return {
      status: "success",
      message: `Product updated id:${updatedProduct._id}`,
    };
  };

  deleteProduct = async (id) => {
    let deletedProduct = await productService.findByIdAndDelete(id);
    return { status: "success", message: "Product deleted" };
  };
}

module.exports = ProductServiceMongo;
