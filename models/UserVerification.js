module.exports = (sequelize,DataType) =>{

    const UserVerification= sequelize.define("UserVerification", {
        
        email: {
            type: DataType.STRING,
            allowNull: false
        },
        code: {
            type: DataType.STRING,
            allowNull: false
        },

    });
    return UserVerification
}
