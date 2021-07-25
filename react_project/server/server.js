const express = require('express');
const app = express();
const port = 3000;
const request = require('request');
const http = require('http');
// const mysql = require("mysql");
// let con = mysql.createConnection({
//   host: "localhost",
//   user: "spotify",
//   password: "wustl",
//   database: "spotify"
// });

// let awsinstance = 'http://ec2-18-191-11-49.us-east-2.compute.amazonaws.com'; //JON
// let awsinstance = "http://ec2-18-234-109-238.compute-1.amazonaws.com"; //JOE
let awsinstance = 'localhost';

// CONNECT TO MYSQL DATABASE
// con.connect(function (err) {
//   if (err) console.log(err);
//   console.log("Connected!");
// });
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
//GLOBAL VARIABLES
let my_client_id = '443fd8dff1c94a5dbb47ffce567416d6';
let my_client_secret = '627b3c51a2f64de480c69d85916e0b8e';
let my_redirect_uri = awsinstance + ':3000/hotestme';
let tracks_metrics;

//USER PROFILE DATA
async function getUserProfile(accessToken) {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

//USER TOP ARTIST
async function getUserTopArtist(accessToken) {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/artists?limit=1&time_range=medium_term',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

//USER TOP TRACKS
async function getUserTopTracks(accessToken) {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/top/tracks?limit=5&time_range=medium_term',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

//USER PLAYLISTS
async function getPlaylists(accessToken) {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/me/playlists',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            let returnValue = getPlaylistHelper(response, accessToken);
            return resolve(returnValue);
        });
    });
}

function getPlaylistHelper(playlists, accessToken) {
    let parsedPlaylists = JSON.parse(playlists.body).items;
    let listOfPlaylists = [];
    let index = 0;
    //GET THE TITLE, ARTIST, LISTENS OF TOP 5 TRACKS, PLACE IN TRACKS[] AS JSON OBJ
    parsedPlaylists.forEach(playlist => {
        // let playlistImage = playlist.image.url;
        let playlistName = playlist.name;
        let owner = playlist.owner.display_name;
        let playlistTracksHref = playlist.tracks.href;
        // let linkToTracks = playlist.tracks.href;
        // console.log(linkToTracks);
        listOfPlaylists[index] = {
            title: playlistName,
            creator: owner,
            href: playlistTracksHref,
            id: playlist.id,
        };

        index++;
    });
    return JSON.stringify(listOfPlaylists);
}

// Call this function for each playlist in parsedPlaylist and retrieve tracks
async function getPlaylistTracks(playlistTracksHref, accessToken) {
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: playlistTracksHref,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

//TOKEN
async function getToken(theCode) {
    let options = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        form: {
            grant_type: 'authorization_code',
            client_id: my_client_id,
            client_secret: my_client_secret,
            code: theCode,
            redirect_uri: my_redirect_uri,
        },
    };
    return new Promise((resolve, reject) => {
        request(options, function(error, response, body) {
            if (error) return reject(error);
            let jsonBody = JSON.parse(body);
            let refreshToken = jsonBody.refresh_token;
            let accessToken = jsonBody.access_token;
            return resolve({ accessToken: accessToken, refreshToken: refreshToken });
        });
    });
}

async function sendToSQL(data) {
    //profileData: profileData, userTopArtist: userTopArtist, userTopTracks: userTopTracks, refreshToken: refreshToken, accessToken: accessToken}
    let username = JSON.parse(data.profileData).id;
    let image = null;
    if (JSON.parse(data.profileData).images != undefined) {
        image = JSON.parse(data.profileData).images[0].url;
    }
    let userTopArtistUrl = JSON.parse(data.userTopArtist).items[0].images[0].url;
    let accessToken = data.accessToken;
    let refreshToken = data.refreshToken;
    let userTopTracks = data.userTopTracks;
    let userAllPlaylists = data.userAllPlaylists;
    let sqlUsers =
        "insert INTO users (username, image, accessToken, refreshToken, topArtistUrl, topTracks, playlists) VALUES ('" +
        username +
        "','" +
        image +
        "','" +
        accessToken +
        "','" +
        refreshToken +
        "','" +
        userTopArtistUrl +
        "','" +
        userTopTracks +
        "','" +
        userAllPlaylists +
        "') ON DUPLICATE KEY UPDATE image = '" +
        image +
        "', accessToken = '" +
        accessToken +
        "', refreshToken ='" +
        refreshToken +
        "', topArtistUrl ='" +
        userTopArtistUrl +
        "', topTracks ='" +
        userTopTracks +
        "', playlists ='" +
        userAllPlaylists +
        "'";
    con.query(sqlUsers, function(err, result) {
        if (err) console.log(err);
    });
    return { username: username };
}

async function getMetricsData(idAccessToken) {
    let ids = idAccessToken.ids;
    let accessToken = idAccessToken.accessToken;
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/audio-features/?ids=' + ids,
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}
async function getMetrics(trackAccess) {
    let accessToken = trackAccess.accessToken;
    let track_array = trackAccess.tracks;
    let arrayOfIDs;
    let ids = '';
    let track_array_iterable = JSON.parse(track_array).items;

    track_array_iterable.forEach((song, index) => {
        let id = song.track.id;
        ids = ids + id + ',';
    });
    let metrics = await getMetricsData({ ids: ids, accessToken: accessToken });
    return metrics;
}

async function listOfTracks(JSON_file) {
    let tracks_parsed = JSON.parse(JSON_file.tracks_JSON).items;
    let accessToken = JSON_file.accessToken;
    track_array = [];
    index = 0;
    tracks_parsed.forEach(song => {
        track_array[index] = {
            track: song.track,
        };
        index++;
    });
    let result = await JSON.stringify(track_array)
        .replace(/&/, '&amp;')
        .replace(/'/g, "\\'");
    return { result: result, array: track_array };
}

async function getPlaylistImageURL(idToken) {
    let playlistID = idToken.id;
    let accessToken = idToken.accessToken;
    return new Promise((resolve, reject) => {
        let options = {
            method: 'GET',
            url: 'https://api.spotify.com/v1/playlists/' + playlistID + '/images',
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + accessToken,
            },
        };
        request(options, function(error, response, body) {
            if (error) return reject(error);
            return resolve(body);
        });
    });
}

async function insertDataHelper(jsonToken) {
    let accessToken = jsonToken.access;
    let refreshToken = jsonToken.refresh;
    let profileData = await getUserProfile(accessToken);
    let userTopArtist = await getUserTopArtist(accessToken);
    let userTopTracks = await getUserTopTracks(accessToken);
    let userAllPlaylists = await getPlaylists(accessToken);

    let playlists_parsed = JSON.parse(userAllPlaylists);
    playlists_parsed.forEach(async playlist => {
        let id = playlist.id;
        let tracks_JSON = await getPlaylistTracks(playlist.href, accessToken);
        let tracksInPlaylistTemp = await listOfTracks({ tracks_JSON: tracks_JSON, accessToken: accessToken });
        let tracksInPlaylist = tracksInPlaylistTemp.result;
        let playlistImageArray = await getPlaylistImageURL({ id: id, accessToken: accessToken });
        let metrics = await getMetrics({ tracks: tracks_JSON, accessToken: accessToken });
        let playlistName = playlist.title;
        let sqlPlaylist =
            "insert INTO playlists (playlist, image, username, tracks, metrics) VALUES ('" +
            playlistName +
            "','" +
            playlistImageArray +
            "','" +
            playlist.creator +
            "','" +
            tracksInPlaylist +
            "','" +
            metrics +
            "') ON DUPLICATE KEY UPDATE playlist = '" +
            playlistName +
            "', image = '" +
            playlistImageArray +
            "', username = '" +
            playlist.creator +
            "', tracks = '" +
            tracksInPlaylist +
            "', metrics ='" +
            metrics +
            "'";
        con.query(sqlPlaylist, function(err, result) {
            if (err) console.log(err);
        });

        // for each playlist, fill sql track table with track info
        // let blah = JSON.parse(JSON.stringify(tracksInPlaylist));
        // tracksInPlaylist.forEach(song => {
        //   let songID = song.id;
        //   console.log(songID);
        //   // let song_JSON = await getTrackInfo();
        // })
    });
    let sendToSQLData = {
        profileData: profileData,
        userAllPlaylists: userAllPlaylists,
        userTopArtist: userTopArtist,
        userTopTracks: userTopTracks,
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
    let sentToSQL = sendToSQL(sendToSQLData);
    return sentToSQL;
}
//CALLED ON LOGIN. WAITS FOR TOKEN THEN CALLS getDATAHELPER TO GET HOME PAGE DATA
app.get('/getCode', async (req, res) => {
    let theCode = req.query.code;
    try {
        let token = await getToken(theCode);
        let tempToken = JSON.parse(JSON.stringify(token));
        let accessToken = tempToken.accessToken;
        let refreshToken = tempToken.refreshToken;
        let jsonToken = { access: accessToken, refresh: refreshToken };
        let dataInserted = await insertDataHelper(jsonToken);
        res.send({ accessToken: accessToken, username: dataInserted.username });
    } catch (err) {
        console.log(err);
    }
});

async function getSQLData(usernameToken, callback) {
    let username = usernameToken.username;
    let sql = "select * from users  where username ='" + username + "'";
    // let sql = "select username, image, accessToken, refreshToken, topArtistUrl, topTracks, playlists, playlists.rating from users join playlists on (users.username=playlists.username) where username ='"+username+"'";
    con.query(sql, async function(err, result, fields) {
        if (err) {
            console.log(err);
        }
        return callback(result);
    });
}

app.get('/getData', async (req, res) => {
    let accessToken = req.query.token;
    let username = req.query.username;
    getSQLData({ accessToken: accessToken, username: username }, function(result) {
        res.send(result);
    });
});

async function getPlaylistData(usernameObject, callback) {
    let username = usernameObject.username;
    let playlist = usernameObject.playlist;
    let sql = "select * from playlists where playlist ='" + playlist + "' and username ='" + username + "'";
    con.query(sql, async function(err, result, fields) {
        if (err) {
            console.log(err);
        }

        return callback(result[0]);
    });
}

app.get('/getPlaylistData', async (req, res) => {
    let playlist = req.query.title;
    let username = req.query.username;
    getPlaylistData({ username: username, playlist: playlist }, function(result) {
        res.send({
            image: result.image,
            tracks: result.tracks,
            creator: result.username,
            playlist: result.playlist,
            metrics: result.metrics,
        });
    });
});

async function getOtherUserData(blank, callback) {
    // let username = usernameToken.username;
    let sql = 'select username, image from users';
    con.query(sql, async function(err, result, fields) {
        if (err) {
            console.log(err);
        }
        return callback(result);
    });
}
app.get('/getOtherUsers', async (req, res) => {
    // let accessToken = req.query.token;
    // let username = req.query.username;
    let blank = 'none';
    getOtherUserData(blank, function(result) {
        res.send(result);
    });
});

// async function getRatings(username, callback){
//   let sql = "select rating from playlists where username ='"+username+"'";
//   con.query(sql, async function(err,result, fields){
//     if(err){console.log(err)};
//     return callback(result);
//   })
// }

// app.get("/getRatings", async (req, res) => {
//   // let accessToken = req.query.token;
//   let username = req.query.username;
//   getRatings(username, function(result){
//     res.send(result);
//   });
// });

async function getFriendData(usernameObject, callback) {
    let username = usernameObject.username;
    let sql = "select * from users where username ='" + username + "'";
    con.query(sql, async function(err, result, fields) {
        if (err) {
            console.log(err);
        }
        return callback(result);
    });
}

app.get('/getFriendData', async (req, res) => {
    let friendUsername = req.query.friendUsername;
    getFriendData({ username: friendUsername }, function(result) {
        res.send(result);
    });
});

// //FOLLOW PLAYList
// async function followPlaylist(object) {
//   let accessToken = object.accessToken;
//   let id = object.id;
//   console.log(id);
//   console.log(accessToken);
//   return new Promise((resolve, reject) => {
//     let options = {
//       method: "PUT",
//       url:
//         "https://api.spotify.com/v1/playlists/"+id+"/followers",
//       headers: {
//         "content-type": "application/json",
//         authorization: "Bearer " + accessToken
//       }
//     };
//     request(options, function(error, response, body) {
//       if (error) return reject(error);
//       let returnValue = {success: "true"}
//       return resolve(returnValue);
//     });
//   });
// }

// app.get("/followPlaylist", async (req,res)=> {
//   let playlistID = req.query.playlistID;
//   let accessToken = req.query.accessToken;

//   console.log(accessToken);
//   followPlaylist({id: playlistID, accessToken: accessToken}, function(result){
//     res.send(result);
//   });
// })

//START SERVER
app.listen(port, () =>
    // res.send("HELLO THIS IS YOUR SERVER"),
    console.log(`Example app listening on port ${port}!`),
);
