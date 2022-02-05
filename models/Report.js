module.exports = (sequelize,DataType) =>{

    const Report = sequelize.define("Report" , {
        Resone : {
            type: DataType.STRING,
            allowNull: false
        }
    });



    return Report
    
}