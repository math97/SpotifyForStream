const { Router } = require("express");
const authConfig = require('../config/auth');
const { getTokenService } = require('../services/getTokenService')

const authorizationRoutes = new Router();

authorizationRoutes.get('/',async (request,response)=>{
  try {
    const {scopePlayingCurrentSong,clientId,urlCode } = authConfig
    response.redirect(urlCode +
    '?response_type=code'+
    '&client_id='+clientId+
    '&scope='+encodeURIComponent(scopePlayingCurrentSong)+
    '&redirect_uri='+encodeURIComponent(`${process.env.APP_URL}authorization/token`))
  } catch (error) {
    console.log("\nerror:",error);
  }

});

authorizationRoutes.get('/token',async (request,response)=>{
  try {
    const authorizedCode  = await request.query.code
    const {access_token,refresh_token,token_type,expires_in} = await getTokenService({authorizedCode,redirectUri:`${process.env.APP_URL}authorization/token`});

    request.token = {accessToken:access_token,refreshToken:refresh_token}  
      
    return response.json({access_token,refresh_token,token_type,expires_in});
  } catch (error) {
    console.log("\nerror:",error);
  }  
})

module.exports = {authorizationRoutes};
