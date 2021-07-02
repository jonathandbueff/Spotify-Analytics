import React from 'react'

export default class OAuthLogin extends React.Component {


  render() {
    let client_id = "443fd8dff1c94a5dbb47ffce567416d6";
    let response_type = "code";

    // let awsinstance = 'http://ec2-18-191-11-49.us-east-2.compute.amazonaws.com'; //JON
    // let awsinstance = "http://ec2-18-234-109-238.compute-1.amazonaws.com"; //JOE
    let awsinstance = "localhost";

    let redirect_uri = awsinstance + ":3000/home";
    var scopes = "user-modify-playback-state user-top-read user-library-modify user-follow-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-read-currently-playing user-read-private user-follow-read playlist-read-collaborative user-read-email user-library-read streaming user-read-recently-played";
    let loginLink =
      "https://accounts.spotify.com/authorize?" +
      "client_id=" +
      client_id +
      "&response_type=" +
      response_type +
      "&scope=" + scopes +
      "&redirect_uri=" +redirect_uri;
    return (
      <div className="OAuthLogin">
        <a href={console.log(loginLink)}>
          <input type="button" className="loginBtn" value="Login To Spotify" />
        </a>
        <input type="button" className="loginBtn" value="Login To Spotify" />
        {/* </a> */}
        <style jsx>{`
        .loginBtn{
            position: absolute;
            align-self: center;
            background:#1DB954;
            font-family: console, monospace;
            color: #FFF;
            font-size: 14px;
            border: none;
            border-radius: 500px;
            padding: 16px 48px 18px;
            -webkit-transition: 0.4s;
          transition-duration: 0.4s;
        }
        .loginBtn:hover {
          background: black;
          color: #1DB954;     
        }
      
      `}
        </style>
      </div>);
  }
}