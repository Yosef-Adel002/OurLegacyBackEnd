
const express = require('express');
const {UserVerification, Users} = require('../models')
const router= express.Router();
const nodemailer = require('nodemailer')
const {v4: uuidv4}  = require('uuid')
require("dotenv").config();

router.post("/",async(req,res)=>{
    const {email} = req.body;
    const user= await Users.findOne({where:{
        email: email
    }})

    if(user){
        res.json( "Email already exist")
    }else{
        let code = uuidv4().slice(0,4)
        const v = UserVerification.findOne({
            where:{
                email: email
            }
        })

        if(v){
            UserVerification.destroy({where:{
                email: email
            }})
        }
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com" ,
            service: "gmail",
            port: 587,
            secure: false,
            auth : {
                user: process.env.AUTH_EMAIL,
                pass:  process.env.AUTH_PASSWORD
            },
            tls :{
                rejectUnauthorized: false
                
            }
        })

        await transport.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verefication",
            html: `
            Your verefication code is:  ${code}
            `
        }, (err,data)=>{
            if(err){
                res.json(err)
            }else{
                res.json("Mail Sent")
                UserVerification.create ({
                    email : email,
                    code : code
                })
            }
        })
    }


})

router.post("/check",async(req,res)=>{
    const {email} = req.body;
    const user= await Users.findOne({where:{
        email: email
    }})

    if(!user){
        res.json( "Email doesn't exist")
    }else{
        let code = uuidv4().slice(0,4)
        const v = UserVerification.findOne({
            where:{
                email: email
            }
        })

        if(v){
            UserVerification.destroy({where:{
                email: email
            }})
        }
        const transport = nodemailer.createTransport({
            host: "smtp.gmail.com" ,
            service: "gmail",
            port: 587,
            secure: false,
            auth : {
                user: process.env.AUTH_EMAIL,
                pass:  process.env.AUTH_PASSWORD
            },
            tls :{
                rejectUnauthorized: false
                
            }
        })

        await transport.sendMail({
            from: process.env.AUTH_EMAIL,
            to: email,
            subject: "Verefication",
            html: `
            Your verefication code is:  ${code}
            `
        }, (err,data)=>{
            if(err){
                res.json(err)
            }else{
                res.json("Mail Sent")
                UserVerification.create ({
                    email : email,
                    code : code
                })
            }
        })
    }


})



router.put("/check", async(req,res) =>{
    
    const {code,email} = req.body;
   
    const user = await UserVerification.findOne({where:{
        email:email
    }})
   
    if(user.code !== code){
        res.json("Wrong")
    }else{
        res.json("true")
    }

})

module.exports = router