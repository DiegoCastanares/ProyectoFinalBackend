const fs = require("fs");

/*
Schema
    product = {
        name: String (required), 
        description: String, 
        thumbnail: String
        price: Number (required),
        stock: Number (required),
}
*/

const pathToProducts = "./src/files/products.json";

class ProductService {
  getAll = async () => {
    if (fs.existsSync(pathToProducts)) {
      let data = await fs.promises.readFile(pathToProducts, "utf-8");
      let products = JSON.parse(data);
      if (products) return { status: "success", payload: products };
      return { status: "error", message: "error" };
    }
  };

  getById = async (id) => {
    id = parseInt(id);
    if (!id) return { status: "error", error: "ID needed" };
    if (fs.existsSync(pathToProducts)) {
      let data = await fs.promises.readFile(pathToProducts, "utf-8");
      let products = JSON.parse(data);
      let product = products.find((p) => p.id === id);
      if (product) return { status: "success", payload: product };
      else return { status: "error", error: "Null" };
    }
  };

  saveProduct = async (product) => {
    if (
      !product.name ||
      !product.description ||
      !product.thumbnail ||
      !product.price ||
      !product.stock
    )
      return { status: "error", error: "missing field" };

    try {
      if (fs.existsSync(pathToProducts)) {
        let data = await fs.promises.readFile(pathToProducts, "utf-8");
        let products = JSON.parse(data);
        let id = products[products.length - 1].id + 1;
        let timestamp = new Date();
        product.id = id;
        product.timestamp = timestamp;
        product.code = product.id + timestamp.getTime();
        products.push(product);
        await fs.promises.writeFile(
          pathToProducts,
          JSON.stringify(products, null, 2)
        );
        return {
          status: "success",
          message: `Product saved id:${product.id}`,
        };
      } else {
        // el archivo no existe
        let timestamp = new Date();
        product.id = 1;
        product.timestamp = timestamp;
        product.code = product.id + timestamp.getTime();
        await fs.promises.writeFile(
          pathToProducts,
          JSON.stringify([product], null, 2)
        );
        return {
          status: "success",
          message: `Product saved id:${product.id}`,
        };
      }
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  updateProduct = async (id, product) => {
    id = parseInt(id);
    if (
      !product.name ||
      !product.description ||
      !product.thumbnail ||
      !product.price ||
      !product.stock
    )
      return { status: "error", error: "missing field" };
    try {
      if (fs.existsSync(pathToProducts)) {
        let data = await fs.promises.readFile(pathToProducts, "utf-8");
        let products = JSON.parse(data);
        let savedProd = products.find((p) => p.id == id);
        if (!savedProd) {
          return { status: "error", message: "product not found" };
        } else {
          let id = savedProd.id;
          let code = savedProd.code;
          let timestamp = new Date();
          product.id = id;
          product.code = code;
          product.timestamp = timestamp;
          let index = products.findIndex((p) => p.id == id);
          products[index] = product;
          await fs.promises.writeFile(
            pathToProducts,
            JSON.stringify(products, null, 2)
          );
          return {
            status: "success",
            message: `Product updated id:${product.id}`,
          };
        }
      } else {
        return { status: "error", message: "product not found" };
      }
    } catch (error) {
      return { status: "error", message: error };
    }
  };

  deleteProduct = async (id) => {
    id = parseInt(id);
    if (!id) return { status: "error", error: "ID needed" };
    if (fs.existsSync(pathToProducts)) {
      let data = await fs.promises.readFile(pathToProducts, "utf-8");
      let products = JSON.parse(data);
      let product = products.find((p) => p.id === id);
      if (product) {
        let newProducts = products.filter((product) => product.id !== id);
        await fs.promises.writeFile(
          pathToProducts,
          JSON.stringify(newProducts, null, 2)
        );
        return { status: "success", message: "Product deleted" };
      } else {
        return { status: "error", error: "Product not found" };
      }
    }
  };
}

module.exports = ProductService;
