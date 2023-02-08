const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        name: { type: DataTypes.STRING,allowNull: false},
        email: { type: DataTypes.STRING, allowNull: false },
        phone_number: { type: DataTypes.STRING,allowNull: false},
        otp_verify: { type: DataTypes.BOOLEAN,},
        pincode:{ type: DataTypes.INTEGER,},
        role_code:{ type: DataTypes.INTEGER,allowNull: false},
        status:{ type: DataTypes.STRING,},
         created: { type: DataTypes.DATE },
         updated: { type: DataTypes.DATE },
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