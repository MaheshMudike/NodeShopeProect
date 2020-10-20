
// // const fs = require('fs');
// // const path = require('path');
// const db = require('../util/databse');
// const Cart = require('./cart');

// // const p = path.join(
// //   path.dirname(process.mainModule.filename),
// //   'data',
// //   'products.json'
// // );

// // const getProductsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     // getProductsFromFile(products => {
//     //   if (this.id) {
//     //     const existingProductIndex = products.findIndex(
//     //       prod => prod.id === this.id
//     //     );
//     //     const updatedProducts = [...products];
//     //     updatedProducts[existingProductIndex] = this;
//     //     fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//     //       console.log(err);
//     //     });
//     //   } else {
//     //     this.id = Math.random().toString();
//     //     products.push(this);
//     //     fs.writeFile(p, JSON.stringify(products), err => {
//     //       console.log(err);
//     //     });
//     //   }
//     // });
//    return  db.execute('INSERT INTO Products (title,price,description,imageUrl) VALUES (?, ?, ?, ?)',
//    [this.title,this.price,this.description,this.imageUrl]);
//   }

//   static deleteById(id) {
//     // getProductsFromFile(products => {
//     //   const product = products.find(prod => prod.id === id);
//     //   const updatedProducts = products.filter(prod => prod.id !== id);
//     //   fs.writeFile(p, JSON.stringify(updatedProducts), err => {
//     //     if (!err) {
//     //       Cart.deleteProduct(id, product.price);
//     //     }
//     //   });
//     // });
//   }

//   static fetchAll(cb) {
//     //getProductsFromFile(cb);
//     return db.execute('SELECT * FROM Products')
//   }

//   static findById(id, cb) {
//   //   getProductsFromFile(products => {
//   //     const product = products.find(p => p.id === id);
//   //     cb(product);
//   //   });
//   console.log("di cameee",id)
//   return db.execute('SELECT* FROM Products WHERE Products.id = ?',[id]);
//    }
//   }

  const Sequelize = require('sequelize');
  const sequelize = require('../util/databse');

  const Product = sequelize.define('product',{
    id : {
      type : Sequelize.INTEGER,
      autoIncrement : true,
      allowNull : false,
      primaryKey : true
    },
    title: Sequelize.STRING,
    price : {
      type:Sequelize.DOUBLE,
      allowNull:false
    },
    imageUrl:{
      type:Sequelize.STRING,
      allowNull:false
    },
    description : {
      type : Sequelize.STRING,
      allowNull:false
    }
  });
  module.exports = Product;