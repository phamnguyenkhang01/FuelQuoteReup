const jwt = require('jsonwebtoken');

module.exports =  function (req, res, next){
   
    const authHeader = req.header('Authorization');

    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
        res.status(401).send('Access denied');

    try{
        const verified = jwt.verify(token, 'SECRET_KEY');
        req.user = verified;

        next();

    }catch(err){
        res.status(400).send('Invalid token');
    }
}