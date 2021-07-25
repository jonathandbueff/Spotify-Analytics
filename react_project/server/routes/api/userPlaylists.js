const Router = require('express').Router;
const router = Router();

const spotifyApi = require('../../spotifyApi');

router.get('/', async (req, res) => {
    const playlistInfo = await spotifyApi.getUserPlaylists('jonnnydb').then(data => {
        return data;
    });
    res.send(playlistInfo);
});

module.exports = router;
