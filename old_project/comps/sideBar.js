import Search from '../comps/search';
import UserLink from '../comps/userLink';

// import Link from "next/link";
const SideBar = props => (
  <div>
    <div className="sideBarBox">
        {/* <h3>Search</h3> */}
        {/* <Search className="seachBarMain"/> */}
        <h3>Other Users</h3>
        <ul className="otherUsersList">
        {props.data.allUsers.map(p => (<li className ="userListItem" key={p.username+"userItem"}><UserLink key={p.username} {...p} {...props.data.accessToken}/></li>))}
        </ul>
    </div>

    <style jsx>{`
    .userListItem{
      max-width:25vw;
      position: relative;
      left:0;
    }
    .otherUsersList{
      list-style-type:none;
      margin:0;
      width: 25vw;
      padding:0;
    }
    .searchBarMain{
      position:fixed;
    }
    .sideBarBox{
    padding: 0;
    margin: 0;
    height: 100vh;
    color: #1DB954;
    background: black;
    position: fixed;
    width: 25vw;
    padding-left: 5px;
  }
    `}
    </style>
  </div>
);

export default SideBar;