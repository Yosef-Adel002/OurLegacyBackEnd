const {verify} = require("jsonwebtoken")
require("dotenv").config();
const validateTokent = (req,res,next) =>{
    const accessToken = req.header("accessToken")
    if(!accessToken){
        
        return res.json({error: "User not logged in!!"});
    }


    try{
        const valid = verify(accessToken, process.env.SECRET_STRING)
        if(valid){
            req.user = valid;
            return next();
        }
    }catch (err){
            return res.json({error: err})
    }
};

module.exports = {validateTokent}