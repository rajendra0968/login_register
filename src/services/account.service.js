const config = require("config.json");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { Op, where } = require("sequelize");
const sendEmail = require("_helpers/send-email");
const db = require("_helpers/db");
const Role = require("_helpers/role");
const customerda = require("../dao/customer_table");
//
// const createToken = async(req,res,one)=>{
//     const token =
//     console.log(one);
//     return token;
// }
//
const customerdao = new customerda();
class customer {
    login = async (params)=>{

    const token = await jwt.sign({ id: `${params.phone_number}` }, process.env.Secret);
    const data = await customerdao.findbyname(params.phone_number);
    if(data == null){
      return {message:'phone number is not exists'};
    }
    else{
      return {data:data,token};
    }
  }
  role = async (params) => {
    const data = new db.Role_table({
      role_name: params.name,
      role_code: params.code,
      created:Date.now()
    });
    data.save();
    return{message:"role created"};
  };

  alluser = async (params) => {
    const data = await customerdao.findall(); //await db.Customer_table.findAll({where:params.email});
    return { data };
  };
  findone = async (params) => {
    const data = await customerdao.findone(params); //({where:{id:params.id}})
    return { data };
  };
  findone_delete = async (params) => {
    var data = await db.Customer_table.update(
      {
        status: "in-active",
        deleted:Date.now()
      },
      {
        where: {
          id: params.id,
        },
      }
    ); //destroy({where:{id:params.id}})
    if(data == null || data == 0){
return {code:101,message:"user not found"}
    }
    else{
      return {message:"user deleted successfully"}
    }
    
  };
  user_update = async (params, query) => {
    const detail = await params;
    const rol = await db.Role_table.findOne({
      where: { role_name: detail.role_name },
    });
    var data = await db.Customer_table.update(
      {
        name: detail.name,
        email: detail.email,
        phone_number: detail.phone_number,
        otp_verify: detail.password,
        pincode: detail.pincode,
        role_code: rol.id,
        status: detail.status,
        updated:Date.now()
      },
      {
        where: {
          id: query.id,
        },
      }
    );
    if(data == null || data == 0){
      return {code:101,message:"user not found"}
          }
          else{
            return {message:"user updated successfully"}
          }
  };
  signup = async (params) => {
    //var one = 123;
    
    const detail = await params;
    const rol = await db.Role_table.findOne({
      where: { role_name: detail.role_name },
    });
    const cust1 = await customerdao.findbyname(detail.phone_number)
    //console.log(detail);
    if (cust1 == null) {
      const data = new db.Customer_table({
        name: detail.name,
        email: detail.email,
        phone_number: detail.phone_number,
        otp_verify: detail.password,
        pincode: detail.pincode,
        role_code: rol.id,
        status: detail.status,
        created: Date.now()
      });
      await data.save();
      return {message:"successfully signup"};
    } else {
      return {message: "phone number is already exists"};
    }
    //}
  };
  
}

module.exports = customer;
