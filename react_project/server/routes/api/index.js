const Router = require('express').Router;
const router = Router();

const audioFeatures = require('./audioFeatures');
const playlistInfo = require('./playlistInfo');
const recentlyPlayedTracks = require('./recentlyPlayedTracks');
const userInfo = require('./userInfo');
const userPlaylists = require('./userPlaylists');

router.use('/audioFeatures', audioFeatures);
router.use('/playlistInfo', playlistInfo);
router.use('/recentlyPlayedTracks', recentlyPlayedTracks);
router.use('/userInfo', userInfo);
router.use('/userPlaylists', userPlaylists);

module.exports = router;
