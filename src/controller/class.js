const express = require("express");
//const router = express.Router();
const Joi = require("joi");
//const validateRequest = require('_middleware/validate-request');
//const authorize = require('_middleware/authorize')
const Role = require("_helpers/role");
require("dotenv").config();
const accountServic = require("../services/account.service");
const accountService = new accountServic();
//module.exports = {getAll,getById,create,start};
const jwt = require("jsonwebtoken");
//
class controller {
  
  roll = async (req, res, next) => {
    accountService
      .roll(req.body)
      .then((accounts) => res.send("roll created").status(200))
      .catch(next);
  };
  signup = async (req, res, next) => {
    accountService
      .signup(req.body)
      .then((accounts) => res.json({accounts}).status(200))
      .catch(next);
  };
  user_update = async (req, res, next) => {
    accountService
      .user_update(req.body,req.query)
      .then((accounts) => res.json(accounts).status(200))
      .catch(next);
  };
  findone_delete = async (req, res, next) => {
    accountService
      .findone_delete(req.query)
      .then((accounts) => res.json(accounts).status(200))
      .catch(next);
  };
  alluser = async (req, res, next) => {
    accountService
      .alluser(req.body)
      .then((accounts) => res.json(accounts))
      .catch(next);
  };
  findone = async (req, res, next) => {
    accountService
      .findone(req.query)
      .then((accounts) => res.json(accounts))
      .catch(next);
  };
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
