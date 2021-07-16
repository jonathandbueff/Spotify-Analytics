import React from 'react'
import './OAuthLogin.scss'
export default class OAuthLogin extends React.Component {


  render() {
    let client_id = "443fd8dff1c94a5dbb47ffce567416d6";
    let response_type = "code";

    let awsinstance = "localhost";

    let redirect_uri = 'http://localhost:3001/login'
    var scopes = "user-modify-playback-state user-top-read user-library-modify user-follow-modify playlist-read-private playlist-modify-public playlist-modify-private user-read-playback-state user-read-currently-playing user-read-private user-follow-read playlist-read-collaborative user-read-email user-library-read streaming user-read-recently-played";
    let loginLink =
      "https://accounts.spotify.com/authorize?" +
      "client_id=" +
      client_id +
      "&response_type=" +
      response_type +
      "&scope=" +
      scopes +
      "&redirect_uri=" +
      redirect_uri;



    return (
      <div className="OAuthLogin">
        <a href={redirect_uri}>
          <input type="button" className="loginBtn" value="Login To Spotify" />
        </a>
      </div>);
  }
}