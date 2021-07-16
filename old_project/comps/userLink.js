import Link from "next/link";
const UserLink = props => (
  <div>
    <div className="linkBox">
    <Link href = {"/friendProfile?user="+ props.username} >
    <div className="userLinkBox">
    <img className="profilePic" src={props.image}></img>
    <div className="userInfo">
        <p className="userLinkusername">{props.username}</p>
    </div>
    </div>
    </Link>
    </div>
    <style jsx>{`
    
    .profilePic{
        display: inline-block;
        width: 50px;
        float: left;
        padding-top: 1px;
        
    }
    .userLinkusername{
        display: inline-block;
    }
    .userInfo{
        display: inline-block;
    }
    .userLinkBox{
        font-family: console, monospace;
        padding-left: 2px;
        padding-top: 1px;
        padding-bottom: 2px;
        margin-bottom: 2px;
        color: white;
        width: calc(100% - 28px);
        text-align: center;
        border: 1px solid #1DB954;
    }
    
    `}
    </style>
  </div>
);

export default UserLink;