const { Router }= require("express");

const routes = new Router();

routes.get("/",(req,res)=>{
  console.log('teste');
  res.send("hello world")
})

module.exports = {routes};