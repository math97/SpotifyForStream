require('dotenv').config()
const express = require("express");
const {routes} = require("./routes/index.js");

const app = express();

app.use(express.json());

app.use(routes);

app.listen(process.env.PORT,()=>{
  console.log(`🎧 server start on port ${process.env.PORT} 🎧`);
})