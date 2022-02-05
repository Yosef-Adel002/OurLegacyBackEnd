module.exports = (sequelize,DataType) =>{

    const User= sequelize.define("Users", {
        
        username: {
            type: DataType.STRING,
            allowNull: false
        },
        password: {
            type: DataType.STRING,
            allowNull: false
        },
        email: {
            type: DataType.STRING,
            allowNull: false
        }
        
    });

    

    User.associate = (models) => {
        User.hasMany(models.Likes,{
            onDelete: "cascade",
        });
        User.hasMany(models.Posts,{
        onDelete: "cascade",
        });
         User.hasMany(models.Follow,{
        onDelete: "cascade",
        });
        User.hasMany(models.Report,{
            onDelete: "cascade",
        });
        User.hasMany(models.Comments,{
            onDelete: "cascade",
        });
        
    };
    return User
}