module.exports = (sequelize,DataType) =>{

    const Follow= sequelize.define("Follow", {
        FollowedId : {
            type: DataType.INTEGER,
            allowNull:false
        }
    })



    return Follow
}