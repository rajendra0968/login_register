//const SuperDao = require('./SuperDao');
//const models = require('../models');
const db = require("../../_helpers/db");

class UserDao{

    findall = async (email)=> {
        return await db.Admin_Users.findAll();
    }
    findone = async(params)=>{
        return await db.Admin_Users.findOne({where:{id:params.id}})
      }
      findone_delete = async(params)=>{
        return await db.Admin_Users.destroy({where:{id:params.id}})
        
      }
      findbyname = async(params)=>{
        return await db.Admin_Users.findOne({where:{phone_number:params}});
      }
      

}

module.exports = UserDao;
