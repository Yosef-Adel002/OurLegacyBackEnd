const express = require('express');
const {Users,Follow,UserVerification} = require('../models')
const { Op } = require("sequelize");
const {sign} = require("jsonwebtoken")
const router= express.Router();
const bcrypt = require ("bcryptjs")
const {validateTokent} = require("../middlewares/AuthMiddleWare")
require("dotenv").config();

router.post("/", async (req,res)=>{
  const {username , password,email,code} = req.body;

  const user = await UserVerification.findOne({where:{
      email:email,
  }})

  if(user.code != code){
    res.json("Wrong")
  }else{
    bcrypt.hash(password,10).then((hash)=>{

        Users.create({
            username: username ,
            password: hash,
            email: email
        });
        UserVerification.destroy({where:{
            email:email,
        }})
        res.json("Success");
});

  }  
});

router.post("/reset", async(req,res)=>{
    const {email, password,code} =req.body;
    const user = await UserVerification.findOne({where:{
        email:email,
    }})
    if(user.code != code){
        res.json("Wrong")
      }else{
          bcrypt.hash(password,10).then((hash)=>{
             Users.update({password: hash},{where:{
                email:email
            }})
            res.json("updated")
          })
        
      }

})

router.get("/all",validateTokent, async(req,res)=>{
    const uid = req.user.id;
    const follow= await Follow.findAll( {
        attributes:  [ "FollowedId" ] 
     , where:{
        UserId: uid
    }})
    let f =[uid]
    follow.map(v=>{
        f.push(v.FollowedId)
    })

    const users = await Users.findAll({attributes: { exclude : ["password"]} ,where:{
        id: {[Op.notIn] : f }
    }})

    res.json(users)
} )

router.get("/auth",validateTokent, async(req,res)=>{
    res.json(req.user);
});

router.get("/profile/:UserID" , async(req,res)=>{
    const UID = req.params.UserID;
    const user = await Users.findByPk( UID , {
        attributes: { exclude: [ "password" ] }
    })
    res.json(user);
})

router.post("/login", async(req,res)=>{
    const { password, email} = req.body;

    const user = await Users.findOne({where:{email: email}});

    if(!user){
        res.json({error: "email doesn't exist"})
        return;

    }

    bcrypt.compare(password,user.password).then((match)=>{
        if(!match){
            res.json({error: "wrong username and password combination"})
            return;
        }
        const accesToken = sign({email: user.email , id: user.id } , process.env.SECRET_STRING);
        res.json({token:accesToken, email: email, id: user.id });

    });


});


module.exports = router