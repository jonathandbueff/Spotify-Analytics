const Router = require('express').Router;
const router = Router();

const spotifyApi = require('../../spotifyApi');

router.get('/', async (req, res) => {
    const me = await spotifyApi.getMe().then(res => {
        return res;
    });
    res.send(me);
});

module.exports = router;
