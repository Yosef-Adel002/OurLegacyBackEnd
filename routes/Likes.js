const express = require('express');
const {Likes} = require('../models')
const {validateTokent} = require("../middlewares/AuthMiddleWare")
const router= express.Router();

router.post("/", validateTokent, async (req,res)=>{
const {postId} =req.body;
const UserId =req.user.id;

const liked = await Likes.findOne({where: {
    PostId: postId, UserId:UserId
}});

if(!liked){
    await Likes.create({PostId: postId, UserId: UserId})
    res.json("Liked");
}else{
    await Likes.destroy({where: {PostId: postId, UserId:UserId}})
    res.json("unLiked");
}

})




module.exports = router

