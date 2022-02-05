const express = require('express');
const  app = express();
const cors = require('cors')
const db =require('./models')
app.use(cors());
app.use(express.json());
require("dotenv").config();

const postRouter= require('./routes/Posts');

app.use("/posts", postRouter)

const commentsRouter = require('./routes/Comments');
app.use("/comments", commentsRouter)


const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter)

const likesRouter = require('./routes/Likes');
app.use("/likes", likesRouter)

const followRouter = require('./routes/Follow');
app.use("/follow", followRouter)

const ReportRouter = require('./routes/Report');
app.use("/repoet", ReportRouter)
const UserVerificationRouter = require('./routes/UserVerification');
app.use("/verefiy", UserVerificationRouter)

//UserVerification
db.sequelize.sync().then(()=>{
    app.listen( process.env.PORT ||3001 , ()=>{
    console.log("server is running at port 3001");
        
    })
    
}).catch((err)=>{
    console.log(err)
});


