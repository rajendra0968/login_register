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

  alluser = async (params) => {
    const data = await userDao.findall(); //await db.User_table.findAll({where:params.email});
    return { data };
  };
  findone = async (params) => {
    const data = await userDao.findone(params); //({where:{id:params.id}})
    if(data == null || data == 0){
return {message:"user not found",status:status.Not_found}
    }
    else{
      return {data:data,status:status.Ok}
    }
  };
  findone_delete = async (params) => {
    var data = await db.Users.update(
      {
        status: "in_active",
        deleted_at:Date.now()
      },
      {
        where: {
          id: params.id,
        },
      }
    ); //destroy({where:{id:params.id}})
    if(data == null || data == 0){
return {message:"user not found",status:status.Not_found}
    }
    else{
      return {message:"user deleted successfully",status:status.Ok}
    }
    
  };
  user_update = async (params, query) => {
    const detail = await params;
    const rol = await db.Roles.findOne({
      where: { role_name: detail.role_name },
    });
    var data = await db.Users.update(
      {
        name: detail.name,
        email: detail.email,
        phone_number: detail.phone_number,
        otp_verify: detail.password,
        pincode: detail.pincode,
        role_code: rol.id,
        status: detail.status,
        updated_at:Date.now()
      },
      {
        where: {
          id: query.id,
        },
      }
    );
    if(data == null || data == 0){
      return {message:"user not found",status:status.Not_found}
          }
          else{
            return {message:"user updated successfully",status:status.Ok}
          }
  };
  signup = async (params) => {
    //var one = 123;
    
    const detail = await params;
    const rol = await db.Roles.findOne({
      where: { role_name: detail.role_name },
    });
    const cust1 = await userDao.findbyname(detail.phone_number)
    //console.log(detail);
    if (cust1 == null) {
      const data = new db.Users({
        name: detail.name,
        email: detail.email,
        phone_number: detail.phone_number,
        otp_verify: detail.password,
        pincode: detail.pincode,
        role_name:rol.role_name,
        status: detail.status,
        created_at: Date.now()
      });
      await data.save();
      return {message:"successfully signup",status:status.Created};
    } else {
      return {message: "phone number is already exists",status:status.Conflict};
    }
    //}
  };
  
}

module.exports = users;
