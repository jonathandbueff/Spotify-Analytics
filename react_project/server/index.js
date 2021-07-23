// server/index.js

const express = require("express");
const cors = require('cors')
const PORT = process.env.PORT || 3001;
const bodyParser = require('body-parser');


const app = express();
app.use(cors());
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var SpotifyWebApi = require('spotify-web-api-node');
let my_client_id = "443fd8dff1c94a5dbb47ffce567416d6";
let my_client_secret = "627b3c51a2f64de480c69d85916e0b8e";
let my_redirect_uri = "localhost:3000/home";

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
];

const redirectUri = 'http://localhost:3001/callback';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
const spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: my_client_id,
    clientSecret: my_client_secret
});


app.get('/login', (req, res) => {
    res.redirect(spotifyApi.createAuthorizeURL(scopes));
});

app.get('/callback', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    const state = req.query.state;
    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );
            res.redirect('http://localhost:3000/home');
            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        })
        .catch(error => {
            console.error('Error getting Tokens:', error);
            res.send(`Error getting Tokens: ${error}`);
        });
});

app.get('/userinfo', async (req, res) => {
    const me = await spotifyApi.getMe()
        .then((res) => { return res });
    res.send(me);
})

app.post('/getAudioFeaturesForTracks', async (req, res) => {
    const ids = req.body.ids;
    // var trackInfo = null;
    const featureForTracks = await spotifyApi.getAudioFeaturesForTracks(ids)
    .then(function(data) {
        return data.body;
    });
    res.send(featureForTracks);
})


// /* Get Audio Features for a Track */
// spotifyApi.getAudioFeaturesForTrack('3Qm86XLflmIXVm1wcwkgDK')
//     .then(function (data) {
//         console.log(data.body);
//     }, function (err) {
//         done(err);
//     });

// /* Get Audio Analysis for a Track */
// spotifyApi.getAudioAnalysisForTrack('3Qm86XLflmIXVm1wcwkgDK')
//     .then(function (data) {
//         console.log(data.body);
//     }, function (err) {
//         done(err);
//     });


app.get('/getPlaylistInfo', async (req, res) => {
    const playlistInfo = await spotifyApi.getUserPlaylists('jonnnydb')
        .then((data) => {
            return data.body.items[3]
        });

    const playlistTracks = await spotifyApi.getPlaylistTracks('37i9dQZF1EM4NG1Stkrir3', {
        offset: 1,
        limit: 100,
        fields: 'items'
    }).then((data) => {
        return data.body;
    },
        function (err) {
            console.log('Something went wrong!', err);
        }
    );
    res.send(playlistTracks)
})


async function getAudioFeatures(trackIds) {
    var track_lib = [];
    const trackInfo = await spotifyApi.getAudioFeaturesForTrack(item.track.id)
        .then(function (data) {
            return data.body;
        })
        .catch(error => console.log(error));
    track_lib.push({
        kay: item.track.name,
        value: data.body
    })
}

app.get('/getUserPlaylists', async (req, res) => {
    const playlistInfo = await spotifyApi.getUserPlaylists('jonnnydb')
        .then((data) => { return data });
    res.send(playlistInfo)
})

app.get('/recentlyPlayedTracks', async (req, res) => {
    const recentlyPlayedTracks = spotifyApi.getMyRecentlyPlayedTracks({
        limit: 30
    }).then(function (data) {
        return data;
    }, function (err) {
        console.log('Something went wrong!', err);
    });
    res.send(recentlyPlayedTracks);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});