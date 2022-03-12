const { Router }= require("express");
const {authorizationRoutes} = require("./authorization");

const routes = new Router();

routes.use('/authorization',authorizationRoutes)

module.exports = {routes};