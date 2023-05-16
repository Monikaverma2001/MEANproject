const route=require('express').Router();

route.get('/hello',(req,res)=>{
  res.send("huyn ghg")
})

module.exports=route;