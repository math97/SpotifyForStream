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

module.exports = {generateAxiosInstance}