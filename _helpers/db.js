const config = require('config.json');
const mysql = require('mysql2/promise');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');


const db = initialize();

async function initialize() {
    try{
    // create db if it doesn't already exist
    const { host, user,port, password, database } = config.database;
    const connection = await mysql.createConnection({ host,port, user, password ,debug:false});
    
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Users = await require('../src/models/user.model')(sequelize);
    db.Roles = await require('../src/models/role')(sequelize);
    db.Refresh_token = await require('../src/models/refresh_token')(sequelize);
    db.Login_history = await require('../src/models/login_history')(sequelize);
    // db.Leave = require('../src/models/leave.model')(sequelize);
    // db.Atten_request=require('../src/models/atten_request.model')(sequelize);
    // db.Leave_data = require('../src/models/leave_data.model')(sequelize);
    // db.Holiday = require('../src/models/holiday.model')(sequelize);
    // db.Leave_history = require('../src/models/leave_history.model')(sequelize);
    //db.RefreshToken = require('../src/refresh-token.model')(sequelize);

    // define relationships
    //db.Attendance.hasMany(db.RefreshToken, { onDelete: 'CASCADE' });
    //db.RefreshToken.belongsTo(db.Attendance);
    
    // sync all models with database
    await sequelize.sync();
    global.connection = connection
    return connection;
    }
    catch(er){
        return er;
    }
}
module.exports = db;
