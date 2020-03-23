const fs = require('fs');
const path = require('path');
const pathDir = require('../util/path');

const pathCart = path.join(pathDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, price) {
    fs.readFile(pathCart, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        try { cart = JSON.parse(fileContent); }
        catch (e) { cart = cart }
      }

      const existProductIndex = cart.products.findIndex(p => p.id == id);

      cart.products[existProductIndex]
        ? cart.products[existProductIndex].qty += 1
        : cart.products = [...cart.products, { id, qty: 1 }];

      cart.totalPrice += parseInt(price);
      fs.writeFile(pathCart, JSON.stringify(cart), err => console.error(err));
    });
  }

  static deleteProduct(id, price) {
    fs.readFile(pathCart, (err, fileContent) => {
      if (err) return;
      const cart = JSON.parse(fileContent);

      const productIndex = cart.products.findIndex(p => p.id == id);
      if (productIndex === -1) return;

      cart.products[productIndex].qty -= 1;
      if (cart.products[productIndex].qty === 0)
        cart.products = cart.products.filter(p => p.id !== id);

      cart.totalPrice -= parseInt(price);
      fs.writeFile(pathCart, JSON.stringify(cart), err => console.error(err));
    });
  }

  static getCart(cb) {
    fs.readFile(pathCart, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 }
      if (!err) {
        try { cart = JSON.parse(fileContent); }
        catch (e) { cart = { products: [], totalPrice: 0 } }
      }
      cb(cart);
    });

  }
}