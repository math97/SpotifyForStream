const { Router }= require("express");

const routes = new Router();

routes.get("/teste",(request,response)=>{
  console.log('teste');
  return response.json({message:"teste"})
})

module.exports = {routes};