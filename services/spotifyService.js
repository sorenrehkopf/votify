var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
	clientId:process.env.spotify_id,
	clientSecret:process.env.spotify_secret,
	redirectUri:process.env.spotify_redirect_uri
});

module.exports = spotifyApi;