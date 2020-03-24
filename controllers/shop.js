const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = async (req, res, next) => {
  const [rows, fieldData] = await Product.fetchAll();
  res.render('shop/product-list', {
    prods: rows,
    pageTitle: 'All Products',
    path: '/products'
  });
};

exports.getProduct = async (req, res, next) => {
  const productId = req.params.id;
  const result = await Product.fetchProductById(productId);
  const product = result[0][0];
  res.render('shop/product-detail', {
    product,
    pageTitle: product.name,
    path: `/products`
  })
}

exports.getIndex = async (req, res, next) => {
  const [rows, fieldData] = await Product.fetchAll();
  res.render('shop/index', {
    prods: rows,
    pageTitle: 'Shop',
    path: '/'
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(cartProd => cartProd.id === product.id);
        if (cartProductData)
          cartProducts.push({ productData: product, qty: cartProductData.qty });
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    })
  })
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchProductById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const { cartProductId, cartProductPrice } = req.body;
  Cart.deleteProduct(cartProductId, cartProductPrice);
  res.redirect('/cart');
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};