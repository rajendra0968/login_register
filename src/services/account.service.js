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
  roll = async(params)=>{
    const data =  new db.Roll_table({
      roll_name:params.name,
      roll_code:params.code,
    })
    data.save();

  }


   alluser = async(params)=>{
    const data = await customerdao.findall();//await db.Customer_table.findAll({where:params.email});
    return { data };
  }
  findone = async(params)=>{
    
    const data = await customerdao.findone(params)//({where:{id:params.id}})
    return {data};
  }
  findone_delete = async(params)=>{
    const data = await customerdao.findone_delete(params)//destroy({where:{id:params.id}})
    return (data>0)?"user can be deleted":null;
  }
  user_update = async (params,query) => {
    const detail = await params;
    const rol = await db.Roll_table.findOne({where:{roll_name:detail.roll_name}})
    var data = await db.Customer_table.update({
      name: detail.name,
      email: detail.email,
      phone_number: detail.phone_number,
      otp_verify: detail.password,
      pincode:detail.pincode,
      role_id:rol.id,
      status:detail.status,
    }, {
      where: {
        id: query.id
      }
    });

    return (data==0)?null:"user can be updated";
  };
  signup = async (params) => {
    //var one = 123;
    //const dat = await jwt.sign({ id: `${one}` }, process.env.Secret);
    const detail = await params;
    const rol = await db.Roll_table.findOne({where:{roll_name:detail.roll_name}});
    const cust1 =  await db.Customer_table.findOne({where:{phone_number:detail.phone_number}});
    const cust2 =  await db.Customer_table.findOne({where:{name:detail.name}});
   if(cust1 == null && cust2 == null){
    const data = new db.Customer_table({
      name: detail.name,
      email: detail.email,
      phone_number: detail.phone_number,
      otp_verify: detail.password,
      pincode:detail.pincode,
      role_id:rol.id,
      status:detail.status,
    });
     await data.save();
    return data;
    
   }
   else{
    return "phone number and user name already exists";
  }
  //}
  };
}
module.exports = customer;
