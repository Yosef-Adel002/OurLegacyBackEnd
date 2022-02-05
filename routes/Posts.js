const express = require('express');
const {Posts, Likes, Follow,Users} = require('../models')
const {validateTokent} = require("../middlewares/AuthMiddleWare")
const router= express.Router();


router.get("/folow",validateTokent,async (req,res)=>{
    const id = req.user.id;
    const follow= await Follow.findAll( {
        attributes:  [ "FollowedId" ] 
     , where:{
        UserId: id
    }} )

    let f =[id]
    follow.map(v=>{
        f.push(v.FollowedId)
    })
    const postses = await Posts.findAll( { where:{
        UserId:  f
    },include: [Likes] })

    res.json(postses);

  
});

router.post("/edit", validateTokent ,async(req,res)=>{
    const {title, postText, postId} = req.body;
    await Posts.update({title: title,postText:postText },{where: {id: postId}})
    res.json("updated")
})


router.get("/byId/:id",async (req,res)=>{
    const id =req.params.id;

    const post = await Posts.findByPk(id ,{include: [Likes]})
    res.json(post)
});
router.get("/byUserId/:id" , async(req,res)=>{
    const id =req.params.id;
    const posts= await Posts.findAll({where:{
        UserId: id
    } ,include: [Likes]})
    res.json(posts)

}) 
router.post("/", validateTokent, async (req,res)=>{
    const post = req.body;
    post.UserId= req.user.id
    const user = await Users.findOne({where:{email: req.user.email}})
    post.username= user.username;
    await Posts.create(post);
    res.json(post)
  
});
router.delete("/:postId",validateTokent, async (req,res)=>{
    const PId = req.params.postId;
    
    await Posts.destroy({
        where:{
            id: PId,
        }
        
    })
})


module.exports = router