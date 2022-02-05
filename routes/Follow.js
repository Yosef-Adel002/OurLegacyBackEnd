const express = require('express');
const {Follow} = require('../models')
const {validateTokent} = require("../middlewares/AuthMiddleWare")
const router= express.Router();

router.post("/", validateTokent, async (req,res)=>{
    const {follwer} = req.body;
    const UserId =req.user.id;

    const followed = await Follow.findOne({where: 
    {
        UserId: UserId, FollowedId: follwer
    }})

    if(!followed){
        await Follow.create({UserId:UserId, FollowedId: follwer})
        res.json("Followed")
    }else{
        await Follow.destroy({where: {UserId: UserId, FollowedId: follwer}})
        res.json("unFollowed")
    }

})


router.get("/:Id", validateTokent, async (req,res)=>{
    const follwer =req.params.Id;
    const UserId =req.user.id;
    const followed = await Follow.findOne({where: 
    {
            UserId: UserId, FollowedId: follwer
    }})
    if(followed){
        res.json("true")
    }else{
        res.json("false")
    }
})


module.exports = router