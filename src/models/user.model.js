const { DataTypes } = new require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        id:{type:DataTypes.INTEGER,allowNull: false,autoIncrement:true,primaryKey:true},
        name: { type: DataTypes.STRING,allowNull: false},
        email: { type: DataTypes.STRING, allowNull: false },
        phone_number: { type: DataTypes.STRING,allowNull: false},
        otp_verify: { type: DataTypes.BOOLEAN,},
        pincode:{ type: DataTypes.INTEGER,},
        role_name:{ type: DataTypes.STRING,allowNull: false},
        status:{ type: DataTypes.STRING,},
         created_at: { type: DataTypes.DATE },
         updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW  },
        deleted_at: { type: DataTypes.DATE },
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

    return sequelize.define('Users', attributes,options);
}