//const SuperDao = require('./SuperDao');
//const models = require('../models');
const db = require("../../_helpers/db");

class UserDao{

    findall = async (email)=> {
        return await db.Users.findAll();
    }
    findone = async(params)=>{
        return await db.Users.findOne({where:{id:params.id}})
      }
      findone_delete = async(params)=>{
        return await db.Users.destroy({where:{id:params.id}})
        
      }
      findbyname = async(params)=>{
        return await db.Users.findOne({where:{phone_number:params}});
      }
      

}

module.exports = UserDao;
