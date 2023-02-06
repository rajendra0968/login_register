const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING,},
        email: { type: DataTypes.STRING, allowNull: false },
        phone_number: { type: DataTypes.STRING,},
        otp_verify: { type: DataTypes.STRING,},
        pincode:{ type: DataTypes.INTEGER,},
        role_id:{ type: DataTypes.INTEGER,},
        status:{ type: DataTypes.STRING,},
         created: { type: DataTypes.DATE ,defaultValue: DataTypes.NOW },
         updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deleted: { type: DataTypes.DATE },
         //updated: { type: DataTypes.DATE },
        // isVerified: {
        //     type: DataTypes.VIRTUAL,
        //     get() { return !!(this.verified || this.passwordReset); }
        // }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false, 
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }        
    };

    return sequelize.define('Customer_table', attributes,options);
}