module.exports = (sequelize,DataType) =>{

    const Comments= sequelize.define("Comments", {
        commentBody: {
            type: DataType.STRING,
            allowNull: false

        },
        username: {
            type: DataType.STRING,
            allowNull: false

        }
       
    });

    return Comments
}