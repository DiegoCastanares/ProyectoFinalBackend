const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const cartRouter = require("./routes/cart");

app.use(express.static(__dirname + "/public"));

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/products", productsRouter);

app.use("/api/carts", cartRouter);
