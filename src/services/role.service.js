const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op, where } = require("sequelize");
const sendEmail = require("_helpers/send-email");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const userda = require("../dao/userdao");
const status = require('../../_middleware/error-handler');
//
// const createToken = async(req,res,one)=>{
//     const token =
//     console.log(one);
//     return token;
// }
//
const userDao = new userda();
class users {
  
  role = async (params) => {
    const data = new db.Roles({
      role_name: params.role_name,
      role_code: params.role_code,
      created_at:Date.now()
    });
    await data.save();
    return{message:"role created"};
  };

  
  
}

module.exports = users;
