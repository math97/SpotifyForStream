require('dotenv/config')

module.exports = {
  clientId:process.env.CLIENT_ID,
  clientSecret:process.env.CLIENT_SECRET,
  urlCode:'http://accounts.spotify.com/authorize',
  urlToken:'https://accounts.spotify.com/api/token',
  scopePlayingCurrentSong:'user-read-currently-playing user-read-playback-state'
}