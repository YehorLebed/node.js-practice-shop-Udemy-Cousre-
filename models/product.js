const fs = require('fs');
const path = require('path');
const pathDir = require('../util/path');

pathProduct = path.join(pathDir, 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(pathProduct, (err, fileContent) =>
    err ? cb([]) : cb(JSON.parse(fileContent)));
}

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }

  static fetchAll = cb => {
    getProductsFromFile(cb);
  }
 
  save = () => {
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(
        pathProduct,
        JSON.stringify(products),
        err => console.log(err));
    });
  }

}