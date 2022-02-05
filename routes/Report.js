const express = require('express');
const {Report} = require('../models')
const {validateTokent} = require("../middlewares/AuthMiddleWare")
const router= express.Router();

router.post("/", validateTokent, async (req,res)=>{
const {postId} =req.body;
const {Resone} = req.body;
const UserId =req.user.id;


await Report.create({PostId: postId, UserId: UserId , Resone: Resone})
    res.json("Reported");
    
})





module.exports = router

