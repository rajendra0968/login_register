const express = require("express");
//const router = express.Router();
const Joi = require("joi");
//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')
const Role = require("_helpers/role");
require("dotenv").config();
const accountServic = require("../services/login.service");
const accountService = new accountServic();
//module.exports = {getAll,getById,create,start};
const jwt = require("jsonwebtoken");
//
class controller {
  logout = async(req,res,next)=>{
    accountService
      .logout(req.body)
      .then((message) => res.json(message.status,message))
      .catch(next);
  }
  login = async (req,res,next)=>{
    accountService
      .login(req.body)
      .then((message) => res.json(message.status,message))
      .catch(next);
  }
  
}
// jwt.verify(req.t,process.env.Secret,(err,authData)=>{
//   if(err){
//       res.send({result:'invalid token'})
//   }
//   else{
//       accountService.pending(req.body)
//   .then(accounts => res.json(accounts))
//   .catch(next);
//   }
// })

// }
//
module.exports = controller;
