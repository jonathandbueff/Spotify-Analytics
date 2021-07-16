import React from 'react'
import './Header.scss'

export default class Header extends React.Component {

    render() {
        
        return (
            <div className="headerStyle">
                <div className="headerContainer">
                    <a href="/login">
                        <a className="linkStyle">Spotify Analytics</a>
                    </a>
                    <div className="dropdown">
                        <div className="spanBarBox">
                            <span className="spanBar one"></span>
                            <span className="spanBar two"></span>
                            <span className="spanBar three"></span>
                        </div>
                        <div className="dropdownContent">
                            <a href="/">
                                <p className="dropdownItem itemOne">Login</p>
                            </a>
                            <p className="dropdownItem"></p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}