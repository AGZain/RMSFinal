const jwt = require('jsonwebtoken');

var checkAuth = (req,res,next) => {
    var token = req.headers['auth'];
    if(token){
        console.log("good token")
        req.decoded = jwt.decode(token, {complete: true});
        console.log(req.decoded.email);
        next();
    }
    else{
        console.log("bad token")
    }
}