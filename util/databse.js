//const mysql  = require('mysql2');

// const pool = mysql.createPool({
//     host : "db4free.net",
//     user : 'mahesh',
//     database : 'mahesh',
//     password : 'mahesh@123'
// });
// module.exports = pool.promise()

// user: "mahesh",
// password: 'mahesh@123',
// database: 'mahesh',
// host: "db4free.net",
// port: 3306
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mahesh','mahesh','mahesh@123',{
    dialect:'mysql',
    host : "db4free.net"
});
module.exports = sequelize;