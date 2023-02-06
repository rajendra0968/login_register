const router = require('express').Router();
const Controller = require('../controller/class');
const controller  = new Controller();
const UserValidator = require('../validators/uservalidator');
const userValidator = new UserValidator();
require('dotenv').config();
//
const jwt  =require('jsonwebtoken');

//
function verify(req,res,next){
    const bearer = req.headers['authorization'];
    if(typeof bearer !== undefined){
        const b  = bearer.split(" ");
        const t = b[1];
        req.t = t;
        next();
    }
    else{
        res.send({result:'token is not valid'});
    }    
}
//
router.post('/roll',controller.roll);
//leave request
router.post('/signup',controller.signup);//customer create
router.post('/user_update',controller.user_update);
router.post('/findone_delete',controller.findone_delete);
router.get('/findall',controller.alluser);//
router.get('/findone',controller.findone);//pending approvation

module.exports = router;