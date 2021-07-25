const Router = require('express').Router;
const router = Router();

const spotifyApi = require('../../spotifyApi');

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

async function getAudioFeatures(trackIds) {
    var track_lib = [];
    const trackInfo = await spotifyApi
        .getAudioFeaturesForTrack(item.track.id)
        .then(function(data) {
            return data.body;
        })
        .catch(error => console.log(error));
    track_lib.push({
        kay: item.track.name,
        value: data.body,
    });
}

router.get('/', async (req, res) => {
    const ids = req.body.ids || [];
    // var trackInfo = null;
    const featureForTracks = await spotifyApi.getAudioFeaturesForTracks(ids).then(function(data) {
        return data.body;
    });
    res.send(featureForTracks);
});

module.exports = router;
