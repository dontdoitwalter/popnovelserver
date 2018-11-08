module.exports = function(sequelize, DataTypes){
    return sequelize.define('submission',{
        suggest:DataTypes.TEXT
    })
}