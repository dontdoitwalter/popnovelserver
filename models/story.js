module.exports=function(sequelize, DataTypes){
    return sequelize.define('storysubmit',{
        story:{
            type:DataTypes.TEXT
        }
    })
}