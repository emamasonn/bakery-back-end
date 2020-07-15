
let headers = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    req.header('Access-Control-Allow-Credentials', 'true');
    next();
}

module.exports = {
    headers,
}

