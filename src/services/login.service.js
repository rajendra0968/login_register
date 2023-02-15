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
  logout =async(params)=>{
    await db.Refresh_token.update({ deleted_at:Date.now()}, {
      where: {
        id: params.id
      }
    });
    return {message:'logout successfully',status:status.Ok}
  }
    login = async (params)=>{

    
    const data =  await db.Users.findOne({where:{phone_number:params.phone_number,status:"active"}});
   
    if(data == null){
      return {message:'phone number is not register',status:status.Conflict};
    }
    else{
      const token = await jwt.sign({ id: `${params.phone_number}` }, process.env.Secret,{ expiresIn: '1y' });
        function addOneYear(date) {
          date.setFullYear(date.getFullYear() + 1);
          return date;
        }
      // April 20, 2022
      const date = new Date();
      const newDate = addOneYear(date);
      const refresh = new  db.Refresh_token({user_id:data.id,token:token,types:data.role_name,expires:newDate,created_at:Date.now()});
      await refresh.save();
      const login_history = new db.Login_history({user_id:data.id,login_status:'success',state:params.state,city:params.city,country:params.country,ip:params.ip,created_at:Date.now()});
      await login_history.save();
      const role = await db.Roles.findOne({where:{role_name:data.role_name}});
      return {data:{data:data,role_id:role},token:token,status:status.Ok};
    }
  }
  
  
}

module.exports = users;
