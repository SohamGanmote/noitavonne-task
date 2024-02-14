const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 8080;

// getting fake products
const products = require("./fakeData")

app.use(bodyParser.json());
app.use(cors());

// Define a route
app.get("/", (req, res) => {
  res.send(products);
});

//get product by id
app.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find(
    (item) => item.id.toString() === productId
  );
  res.send(product);
});

// Filter products by productName or companyName
app.get("/products/search/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm.toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm) ||
      product.companyName.toLowerCase().includes(searchTerm)
  );
  res.send(filteredProducts);
});

//suggestions
app.get("/products/suggestions/:searchTerm", (req, res) => {
  const searchTerm = req.params.searchTerm.toLowerCase();
  const suggestions = [];
  products.forEach((product) => {
    if (
      product.productName.toLowerCase().includes(searchTerm) ||
      product.companyName.toLowerCase().includes(searchTerm)
    ) {
      suggestions.push({
        id: product.id,
        suggestion: product.productName,
      });
    }
  });
  res.send(suggestions);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});