const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create db if it doesn't already exist
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    // connect to db
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    // init models and add them to the exported db object
    db.Customer_table = require('../src/models/account.model')(sequelize);
    db.Roll_table = require('../src/models/roll')(sequelize);
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
}