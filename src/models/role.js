const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        role_name: { type: DataTypes.STRING,},
        role_code: { type: DataTypes.STRING },
       // phone_number: { type: DataTypes.INTEGER,},
        created: { type: DataTypes.DATE},
        updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        deleted: { type: DataTypes.DATE },
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

    return sequelize.define('Role_table', attributes,options);
}