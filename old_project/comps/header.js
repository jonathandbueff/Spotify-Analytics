import Link from "next/link";

const Header = () => (
  <div className="headerStyle">
    <div className="headerContainer">
      <Link href="/">
        <a className="linkStyle">Spotify Analytics</a>
      </Link>
      <div className="dropdown">
        <div className="spanBarBox">
        <span className="spanBar one"></span> 
        <span className="spanBar two"></span> 
        <span className="spanBar three"></span>
        </div> 
        <div className="dropdownContent">
          <Link href="/">
          <p className="dropdownItem itemOne">Login</p>
          </Link>
          <p className="dropdownItem"></p>
        </div>
      </div>
    </div>
    
    <style jsx>
      {`
      .headerStyle{
        font-family: console, monospace;
        position: fixed;
        background: black;
        height: 50px;
        top: -1px;
        left: -1px;
        right: -1px;
        border: 1px solid #DDD;
        z-index:100;
      }
      .headerContainer{
        display: inline-block;
        border: 1px solid black;
        padding: 10px;
        margin-top: 5px;
        text-align: center;
      }
      .linkStyle{
        color: white;
        text-decoration: none;
        font-family: console, monospace;
        transition: color 0.4s;
      }
      .dropdown{
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 15px;
        margin-right: 10px;
        color: white;
        height: 38px;
      }
      .dropdownContent {
        display:none;
        position: relative;
        top:15px;
        right: -15px;
        width: 180px;
        background-color: black;
        color: #FFF;
        text-align: left;
      }
      .spanBar{
        display: block;
        box-sizing: border-box;
        background-color: white;
        width: 19px;
        height: 3px;
        margin-bottom: 3px;
        margin-top: 3px;
        border-radius: 3px;
        // z-index:1000;
        transition: transform 1s;
      }
      .spanBarBox{
        float:right;
      }
      .linkStyle:hover {
        color:#1DB954;
      }
      .dropdown:hover .one{
        transform: rotate(210deg);
        
      }
      .dropdown:hover .two{
        transform: rotate(-180deg);
        
      }
      .dropdown:hover .three{
        transform: rotate(150deg);
        
      }
      .dropdown:hover .spanBar{
        background-color: #1DB954;
        -webkit-transition: 0.1s;
        transition-duration: 0.1s;
      }
      .dropdown:hover .dropdownContent {
        display: block;
      }
      .itemOne{
        padding-top: 10px;
      }
      .dropdownItem{
        padding-left: 10px;
        padding-bottom: 10px;        
      }
      .dropdownItem:hover {
        color:#1DB954;
      }
      
      `}
    </style>
  </div>
);

export default Header;