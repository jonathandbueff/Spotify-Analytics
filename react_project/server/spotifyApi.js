var SpotifyWebApi = require('spotify-web-api-node');

const redirectUri = 'http://localhost:3001/callback';
let my_client_id = process.env.SPOTIFY_CLIENT_ID;
let my_client_secret = process.env.SPOTIY_CLIENT_SECRET;

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: my_client_id,
    clientSecret: my_client_secret,
});

module.exports = spotifyApi;
