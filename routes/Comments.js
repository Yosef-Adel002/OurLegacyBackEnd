const express = require('express');

const {validateTokent} = require("../middlewares/AuthMiddleWare")
const router= express.Router();
const {Comments,Users} = require('../models')

router.get("/:postId",async (req,res)=>{
    const id =req.params.postId;
    const comments = await Comments.findAll({
        where: { postId : id}
    })
    res.json(comments)
});

router.post("/", validateTokent, async (req,res)=>{
    const UserId = req.user.id
    const Comment = req.body;
    const user = await Users.findOne({where:{email: req.user.email}})
    Comment.username= user.username;
    Comment.UserId = UserId;
    await Comments.create(Comment);
    res.json(Comment)
  
});

router.delete("/:commentID", validateTokent , async (req,res) => {
    const CId = req.params.commentID;
    await Comments.destroy({
        where:{
            id :  CId,
        },
    });

    res.json("deleted")
});


module.exports = router;