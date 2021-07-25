const Router = require('express').Router;
const router = Router();

const spotifyApi = require('../../spotifyApi');

router.get('/', async (req, res) => {
    const playlistInfo = await spotifyApi.getUserPlaylists('jonnnydb').then(data => {
        return data.body.items[3];
    });

    const playlistTracks = await spotifyApi
        .getPlaylistTracks('37i9dQZF1EM4NG1Stkrir3', {
            offset: 1,
            limit: 100,
            fields: 'items',
        })
        .then(
            data => {
                return data.body;
            },
            function(err) {
                console.log('Something went wrong!', err);
            },
        );
    res.send(playlistTracks);
});

module.exports = router;
