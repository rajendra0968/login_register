//const SuperDao = require('./SuperDao');
//const models = require('../models');
const db = require("../../_helpers/db");

class UserDao{

    findall = async (email)=> {
        return  db.Customer_table.findAll();
    }
    findone = async(params)=>{
        return await db.Customer_table.findOne({where:{id:params.id}})
      }
      findone_delete = async(params)=>{
        return await db.Customer_table.destroy({where:{id:params.id}})
        
      }

}

module.exports = UserDao;
