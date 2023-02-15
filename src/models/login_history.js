const { DataTypes } = new require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id:{type:DataTypes.INTEGER,allowNull: false,autoIncrement:true,primaryKey:true},
        user_id:{ type: DataTypes.STRING,},
        login_status:{ type: DataTypes.STRING,},
        city: { type: DataTypes.STRING,},
        state: { type: DataTypes.STRING },
        country:{ type: DataTypes.STRING },
        ip: { type: DataTypes.STRING },
       // phone_number: { type: DataTypes.INTEGER,},
        created_at: { type: DataTypes.DATE},
        updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deleted_at: { type: DataTypes.DATE },
        // isVerified: {
        //     type: DataTypes.VIRTUAL,
        //     get() { return !!(this.verified || this.passwordReset); }
        // }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
    };

    return sequelize.define('Login_history', attributes,options);
}