module.exports = (sequelize,DataType) =>{

    const posts= sequelize.define("Posts", {
        title: {
            type: DataType.STRING,
            allowNull: false
        },
        postText: {
            type: DataType.TEXT  ,
            allowNull: false
        },
        username: {
            type: DataType.STRING,
            allowNull: false
        }
    });

    posts.associate = (models) => {
        posts.hasMany(models.Comments,{
            onDelete: "cascade",
        });
        posts.hasMany(models.Likes,{
            onDelete: "cascade",
        });
        posts.hasMany(models.Report,{
            onDelete: "cascade",
        });


    };
    return posts

}