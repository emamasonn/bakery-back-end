process.env.PORT = process.env.PORT || 3000


process.env.NODE_ENV = process.env.NODE_ENV || 'Dev'

let urlDB;

if(process.env.NODE_ENV === 'Dev'){
    urlDB = 'mongodb://localhost:27017/bakery'
}else{
    urlDB = ''
}

process.env.URLDB = urlDB
