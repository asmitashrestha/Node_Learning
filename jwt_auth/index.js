const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const secretkey = 'secretkey'

require("dotenv").config();
require("./config/db");
const PORT = process.env.PORT || 5001;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Login page");
});

app.post('/login',(req,res)=>{
  const user = {
    id : 1,
    name :"asmita",
    email:"abc@gmail.com"
  }

  jwt.sign({user},secretkey, {expiresIn:"300s"},(err,token) =>{
    res.json({
      token
    })
  })
})


function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'] || req.headers['Authorization'];
  console.log('All Headers:', req.headers);
  console.log('Entire Request Object:', req);

  console.log('Bearer Header:', bearerHeader); // Add this line for debugging
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({
      result: 'Token is not valid',
    });
  }
}



app.post('/profile',verifyToken, (req,res)=>{
  jwt.verify(req.token, secretkey, (err,authData)=>{
    if(err){
      res.send({msg:"Profile not verified"})
    }else{
      res.json({
        msg:"profile verified",
        authData
      })
    }
  })
})




app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
