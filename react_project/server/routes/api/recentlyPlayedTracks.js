const Router = require('express').Router;
const router = Router();

const spotifyApi = require('../../spotifyApi');

router.get('/', async (req, res) => {
    const recentlyPlayedTracks = spotifyApi
        .getMyRecentlyPlayedTracks({
            limit: 30,
        })
        .then(
            function(data) {
                return data;
            },
            function(err) {
                console.log('Something went wrong!', err);
            },
        );
    res.send(recentlyPlayedTracks);
});

module.exports = router;
