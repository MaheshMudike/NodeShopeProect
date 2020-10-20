
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title: title,
    price: price,
    description: description,
    imageUrl: imageUrl,
   // userId : req.user.id
  //})
  //const product = new Product(null, title, imageUrl, description, price);
  // product.save().then(()=>{
  //   res.redirect('/')
  // }).catch((error)=>{
  //    console.log(error)
  // })

  // Product.create({
    
  }).then((result) => {
    console.log(result)
    console.log('created product')
    res.redirect('/admin/products')
  }).catch((error) => {
    console.log(error)
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  //Product.findById(prodId, product => {
    req.user.getProducts({where : {id : prodId}})
  //Product.findByPk(prodId).
  .then(products => {
    const product = products[0];
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  // const updatedProduct = new Product(
  //   prodId,
  //   updatedTitle,
  //   updatedImageUrl,
  //   updatedDesc,
  //   updatedPrice
  // );
  // updatedProduct.save();
  Product.findByPk(prodId).then(product => {
    product.title = updatedTitle;
    product.price = updatedPrice;
    product.description = updatedDesc;
    product.imageUrl = updatedImageUrl;
    return product.save();
  }).then(result => {
    console.log('updated Product ')
    res.redirect('/admin/products');
  }).catch((error) => {
    console.log(error)
  })

};

exports.getProducts = (req, res, next) => {
  // Product.fetchAll(products => {
  //   res.render('admin/products', {
  //     prods: products,
  //     pageTitle: 'Admin Products',
  //     path: '/admin/products'
  //   });
  // });
  req.user.getProducts()
 // Product.findAll().
  .then((products) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch((erorr) => {
    console.log(erorr)
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId).then(product => {
    return product.destroy();
  }).then(result => {
    console.log('Destroyerd Product');
    res.redirect('/admin/products');
  })
    // Product.deleteById(prodId);
    .catch((err) => {
      console.log(error)
    })
};
