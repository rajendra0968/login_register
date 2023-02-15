const router = require('express').Router();
const Controller = require('../controller/roleController');
const controller  = new Controller();
const UserValidator = require('../validators/uservalidator');
const userValidator = new UserValidator();
require('dotenv').config();
//
const jwt  =require('jsonwebtoken');

//
// function verify(req,res,next){
//     const bearer = req.headers['authorization'];
//     if(typeof bearer !== undefined){
//         const b  = bearer.split(" ");
//         const t = b[1];
//         req.t = t;
//         next();
//     }
//     else{
//         res.send({result:'token is not valid'});
//     }    
// }
//
router.post('/role',controller.role);
//


module.exports = router;