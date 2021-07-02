import React from 'react'
import './Login.scss'
import Header from '../components/Header'
import OAuthLogin from '../components/OAuthLogin'


export default class Login extends React.Component {
  
  render() {
    const bodyStyle = {
      position: "absolute",
      backgroundImage: "url('./media/login_wallpaper.jpeg')",
      backgroundSize: "cover",
      left: "0",
      top: "0",
      right: "0",
      height: "100%",
      width: "100%"
    };

    return (
      <div style={bodyStyle}>
        <div className="headerBox"><Header /></div>
        <div className="loginBtnBox"><OAuthLogin /></div>
      </div>
    )
  }
}