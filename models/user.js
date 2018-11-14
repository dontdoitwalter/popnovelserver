module.exports = function(sequelize, DataTypes){
    return sequelize.define('user', {
        displayname:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                min:[3],
                max:[30]
            },
            unique:true,
        },
        email:{
            type:DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        passwordhash:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                min:[5]
            }
        },
        firstname:{
            type:DataTypes.STRING,
            allowNull: true
        },
        lastname:{
            type:DataTypes.STRING,
            allowNull: true
        },
        hometown:{
            type:DataTypes.STRING,
            allowNull:true
        },
        aboutme:{
            type:DataTypes.TEXT,
            allowNull:true
        }
    })
}