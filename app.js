const http = require('http')
const express = require('express')
//const routes = require('./routee');
const bodyParser = require('body-parser')
const app = express();
const path = require('path')

//const db= require('./util/databse');
const sequelize = require('./util/databse');
const Product = require('./models/product');
const User = require('./models/user');
const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const Cart = require ('./models/cart');
const CartItem = require ('./models/cart-item');
const Order = require ('./models/order');
const OrderItem = require ('./models/order-item');

app.use(bodyParser.urlencoded({ extended: false }));
//const expressHbs = require('express-handlebars')
//app.engine('handlebars',expressHbs({layoutsDir:'views/layouts', defaultLayout:'main-layout',extname:'handlebars'}));
//app.set('view engine', 'pug');
//according to register we create a file of Hnadle bars here 'handlebars' example.handlebars we have to create / if we create hb .hb
// ejs is most used and  total course is ejs so we have to check ejs files  
app.set('view engine', 'ejs');
app.set('views', 'views');

// below it is used fro using the external css file in Html and we keep just path in html file 
app.use(express.static(path.join(__dirname, 'public')))
// app.use('/',(req,res,next)=>{
//   console.log("always run this code  next meathod send according to the route ")
//   next()
// })
// db.execute('SELECT * FROM Products').then((result)=>{
// console.log(result[0]), console.log(result[1])
// }).catch((err)=>{
// console.log(err)
// })
app.use((req, res, next) => {
  User.findByPk(1).then(user => {
    req.user = user;
    next();
  }).catch((error) => {
    console.log(error);
  });
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
  //res.status(404).sendFile(path.join(__dirname,'views','404.html'))
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: '/404' })
})

// const server = http.createServer(app);

// server.listen(3000)
// or 
Product.belongsTo(User, { constraints: true, oneDelete: 'CASCADE' });
User.hasMany(Product)
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through :CartItem});
Product.belongsToMany(Cart,{through :CartItem});
Order.belongsTo(User)
User.hasMany(Order);
Order.belongsToMany(Product, {through : OrderItem})
sequelize.sync().then(result => {
 return User.findByPk(1)
}).then(user => {
  if (!user) {
    return User.create({ name: 'Max', email: 'test@test.com' })
  }
  return user;
}).then(user => {
  return user.createCart()
}).then(user => {
  console.log(user);
  app.listen(3000)
}).catch((error) => {
  console.log(error)
})
