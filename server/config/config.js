const dotenv = require('dotenv');
dotenv.config();

process.env.PORT = process.env.PORT || 3000

process.env.NODE_ENV = process.env.NODE_ENV || 'Dev'

let urlDB;

if(process.env.NODE_ENV === 'Dev'){
    urlDB = 'mongodb://localhost:27017/bakery'
}else{
    urlDB = process.env.URL_DB
}

process.env.URLDB = urlDB

module.exports = {
  urlDB: urlDB,
  port: process.env.PORT,
  user_gmail: process.env.USER_GMAIL,
  pass_gmail: process.env.PASS_GMAIL,
};
