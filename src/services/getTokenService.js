const authConfig = require('../config/auth');
const { generateAxiosInstance } = require('./axios')


const getTokenService = async ({authorizedCode,redirectUri}) =>{
  const {clientId,clientSecret,urlToken} = authConfig;
    
  const axiosInstance = generateAxiosInstance({urlToken,clientId,clientSecret});

  const body=`code=${authorizedCode}&redirect_uri=${redirectUri}&grant_type=authorization_code`;
  const authorizationTokens = await axiosInstance.post(authConfig.urlToken,body);

  const { access_token,token_type,scope,expires_in,refresh_token } = authorizationTokens.data;

  return {access_token,token_type,scope,expires_in, refresh_token}
}

module.exports = {getTokenService}