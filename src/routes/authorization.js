const axios = require("axios");
const { Router } = require("express");
const authConfig = require('../config/auth');

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


const getTokenService = async ({authorizedCode,redirectUri}) =>{
  const {clientId,clientSecret,urlToken} = authConfig;
    
  const axiosInstance = generateAxiosInstance({urlToken,clientId,clientSecret});

  const body=`code=${authorizedCode}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
  const authorizationTokens = await axiosInstance.post(authConfig.urlToken,body);

  const { access_token,token_type,scope,expires_in,refresh_token } = authorizationTokens.data;

  return {access_token,token_type,scope,expires_in, refresh_token}
}

const generateAxiosInstance =  ({urlToken,clientId,clientSecret}) => {
  const instance= axios.create({
    baseURL: urlToken,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64'),
    },
    timeout: 60 * 1000,
  });

  return instance;
};

module.exports = {authorizationRoutes};
