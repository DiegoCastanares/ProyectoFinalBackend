const fs = require("fs");
const ProductService = require("../services/productService");

const productService = new ProductService();
/*
Schema
    cart = {
        id: Number,
        timestamp: date, 
        product: [], 
}
*/

const pathToCarts = "./files/carts.json";

class CartService {
  createCart = async (cart) => {
    try {
      if (fs.existsSync(pathToCarts)) {
        let data = await fs.promises.readFile(pathToCarts, "utf-8");
        let carts = JSON.parse(data);
        let id = carts[carts.length - 1].id + 1;
        let timestamp = new Date();
        cart.id = id;
        cart.timestamp = timestamp;
        cart.product = [];
        carts.push(cart);
        await fs.promises.writeFile(
          pathToCarts,
          JSON.stringify(carts, null, 2)
        );
        return {
          status: "success",
          message: `Cart saved id:${cart.id}`,
        };
      } else {
        // el archivo no existe
        let timestamp = new Date();
        cart.id = 1;
        cart.timestamp = timestamp;
        cart.product = [];

        await fs.promises.writeFile(
          pathToCarts,
          JSON.stringify([cart], null, 2)
        );
        return {
          status: "success",
          message: `Cart saved id:${cart.id}`,
        };
      }
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  deleteCartById = async (id) => {
    if (!id) return { status: "error", error: "ID needed" };
    if (fs.existsSync(pathToCarts)) {
      let data = await fs.promises.readFile(pathToCarts, "utf-8");
      let carts = JSON.parse(data);
      let cart = carts.find((p) => p.id === id);
      if (cart) {
        let newCarts = carts.filter((cart) => cart.id !== id);
        await fs.promises.writeFile(
          pathToCarts,
          JSON.stringify(newCarts, null, 2)
        );
        return { status: "success", message: "Product deleted" };
      } else {
        return { status: "error", error: "Product not found" };
      }
    }
  };

  getCartById = async (id) => {
    if (!id) return { status: "error", error: "ID needed" };
    if (fs.existsSync(pathToCarts)) {
      let data = await fs.promises.readFile(pathToCarts, "utf-8");
      let carts = JSON.parse(data);
      let cart = carts.find((c) => c.id === id);
      if (cart) return { status: "success", payload: cart.product };
      else return { status: "error", error: "Null" };
    }
  };

  addProduct = async (cartId, productId) => {
    try {
      if (!cartId || !productId)
        return { status: "error", error: "missing field" };
      if (fs.existsSync(pathToCarts)) {
        let data = await fs.promises.readFile(pathToCarts, "utf-8");
        let carts = JSON.parse(data);
        let cart = carts.find((p) => p.id === cartId);
        if (cart) {
          let product = await productService.getById(productId);
          if (product.status === "success") {
            cart.product.push(product.payload.id);
            await fs.promises.writeFile(
              pathToCarts,
              JSON.stringify(carts, null, 2)
            );
            return {
              status: "success",
              message: `Product id:${product.payload.id} added to cart id:${cart.id}`,
            };
          } else {
            return {
              status: "error",
              error: "Product not found",
            };
          }
        } else {
          return {
            status: "error",
            error: "Cart not found",
          };
        }
      } else {
        return {
          status: "error",
          error: "Cart not found",
        };
      }
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  deleteProductById = async (id, prod_id) => {
    if (!id || !prod_id) return { status: "error", error: "missing field" };
    if (fs.existsSync(pathToCarts)) {
      let data = await fs.promises.readFile(pathToCarts, "utf-8");
      let carts = JSON.parse(data);
      let cart = carts.find((cart) => cart.id === id);
      if (cart) {
        let cartProd = cart.product.find((prod) => prod === prod_id);
        if (cartProd) {
          let newCart = cart.product.filter((prod) => prod !== prod_id);
          cart.product = newCart;
          await fs.promises.writeFile(
            pathToCarts,
            JSON.stringify(carts, null, 2)
          );
        } else {
          return { status: "error", error: "Product not found" };
        }
        return { status: "success", message: "Product deleted" };
      } else {
        return { status: "error", error: "Product not found" };
      }
    }
  };
}

module.exports = CartService;
