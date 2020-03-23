const fs = require('fs');
const path = require('path');
const Cart = require('./cart');
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    let products = [];
    if (!err) {
      try { products = JSON.parse(fileContent) }
      catch (e) { products = [] }
    }
    cb(products);
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const idx = products.findIndex(p => p.id === this.id);
        if (idx === -1) return;
        products[idx] = this;
      } else {
        this.id = Math.random().toString() + Date.now();
        products.push(this);
      }
      fs.writeFile(p, JSON.stringify(products), err => console.log(err));
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchProductById(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }

  static deleteProductById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const newProductList = products.filter(p => p.id !== id);
      fs.writeFile(p, JSON.stringify(newProductList),
        err => !err && Cart.deleteProduct(id, product.price));
    });
  }

};
