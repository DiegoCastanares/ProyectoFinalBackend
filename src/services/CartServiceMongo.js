const mongoose = require("mongoose");
const cartService = require("../model/cart.js");
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

class CartServiceMongo {
  createCart = async (cart) => {
    try {
      let newCart = await cartService.create(cart);
      return {
        status: "success",
        message: `Cart saved id:${newCart._id}`,
      };
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  deleteCartById = async (id) => {
    if (!id) return { status: "error", error: "ID needed" };
    let deletedCart = await cartService.findByIdAndDelete(id);
    return { status: "success", message: "Cart deleted" };
  };

  getCartById = async (id) => {
    let cart = await cartService.findById(id);
    if (cart) return { status: "success", payload: cart };
    else return { status: "error", error: "Null" };
  };

  addProduct = async (cartId, productId) => {
    let cart = await cartService.findById(cartId);
    if (cart) {
      let product = await productService.findById(productId);
      if (product) {
        cart.product.push(product);
        await cart.save();
        return { status: "success", message: "Product added" };
      } else return { status: "error", error: "Null" };
    } else return { status: "error", error: "Null" };
  };

  deleteProductById = async (id, id_prod) => {
    let cart = await cartService.findById(id);
    if (cart) {
      cart.product.splice(cart.product.indexOf(id_prod), 1);
      await cart.save();
      return { status: "success", message: "Product deleted" };
    } else return { status: "error", error: "Null" };
  };
}

module.exports = CartServiceMongo;
