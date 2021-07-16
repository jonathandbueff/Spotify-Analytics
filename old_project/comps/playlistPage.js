import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Song from './song';
import Playlist from './playlist';
import Search from './search';
// let awsinstance = 'http://ec2-18-191-11-49.us-east-2.compute.amazonaws.com'; //Jon
let awsinstance = 'http://ec2-18-234-109-238.compute-1.amazonaws.com'; //Joe

export default function PlaylistPage (props)  {
  
  // const followPlaylist = async () =>{
  //   // console.log(props.data.id);
  //   // console.log(props.data.accessToken);
  //   const result = await fetch(encodeURI(awsinstance+':3456/followPlaylist?playlistID='+props.data.id+'&accessToken='+props.data.accessToken));
  //   const success = await result.json();
  // }

 return ( 
    <div>
    <div className="playlistHead">
      <div className="playlistHeadText">
      <h3 id="playlistHere">{props.data.playlist}</h3>
      <p id="playlistCreator">{props.data.creator}</p>
 {/* <button className="createBtn">Follow</button> */}
    </div>
    </div>
    <div className="recentlyMostPlayed">
        <h4 className="recentlyMostPlayedHead">Tracks</h4>
      <ol className = "songList">
        {props.data.tracks.map((p, i)=> (<li className ="songListItem" key={p.track.name + i}> <Song {...p.track}/> 
        <div className ="hiddenMetrics">
        Danceability: {props.data.metrics[i].danceability}   Energy: {props.data.metrics[i].energy}   Loudness: {props.data.metrics[i].loudness}   Speechiness: {props.data.metrics[i].speechiness}   Acousticness: {props.data.metrics[i].acousticness}
        </div>
        </li>))}
      </ol>
      </div> 
      {/* <div className="playlistContainer">
        <h4 className="playlistListTitle">Playlists</h4> */}
        {/* <a href = {redirect_uri} > */}
        {/* <ol className="playlist">
          {props.data.allPlaylists.map(p => (<li className ="playlistListItem" key={p.title+"PlaylistItem"}> <Playlist className={p.title} {...p}/></li>))}
        </ol> */}
        {/* </a> */}
      {/* </div> */}
      <style jsx>{`
      .hiddenMetrics{
        color: black;
        display: block;
      }

      .hiddenMetrics:hover {
        color: #1DB954;
      }

      .songListItem:hover .hiddenMetrics{
        color: #1DB954;
      }


      .playlistListTitle{
        margin:0;
        padding-bottom: 5px;
        padding-top: 5px;
        text-align:center;
        color: #1DB954;
      }
    .playlistContainer{
      font-family: console, monospace;
      margin: 0px;
      background: black;
      width: 75%;
      left: 0;
      position:absolute;
      top: calc(35vh + 230.4px);
    }
    .playlistListItem{
      margin:0px;
      padding-bottom: 10px;
      color:#FFF;
    }
    .playlistHead{
      width: 75vw;
      height: 35vh;
      // background: lightgrey;
      position: absolute;
      left:0;
      top: 0px;
      font-family: console, monospace;
    }
    .recentlyMostPlayed{
      background: black;
      color: #1DB954;
      // min-width:75v;
      width: 100%;
      position: absolute;
      top: calc(35vh);
      left:0;
      font-family: console, monospace;
    }
    .recentlyMostPlayedHead{
      margin: 0;
      padding-top: 5px;
      padding-bottom: 5px;
      text-align:center;
    }
    .createBtn{
        position: absolute;
        font-family: console, monospace;
        left: calc( 37.5vw - 142.19px / 2);
        // top: calc( 35vh - 55px);
        background:#1DB954;
        color: #FFF;
        font-size: 14px;
        border: none;
        border-radius: 500px;
        padding: 16px 48px 18px;
        -webkit-transition: background 0.4s;
      transition-duration: background 0.4s;
    }
    .playlistHeadText{
      margin: 0px;
      padding: 0px;
      text-align: center;
      position: relative;
      color: white;
      top: calc( 35vh - 155px);
      text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
    .songList{
      margin: 0px;
      // background: black;
      padding-bottom: 28px;
    }
    .songListItem{
      margin:0px;
      padding-bottom: 10px;
      // padding: 8px 0px 8px  10px;
      color: white;
      // border: 1px solid grey;
    }
    .createBtn:hover {
      background: black;
      color: #1DB954;     
    }
    .playlist{
      margin:0px;
      padding-bottom: 10px;
      // padding: 8px 0px 8px  10px;
      color: white;
      // border: 1px solid grey;
    }
  `}
  </style>
    </div>

 )
  }
  // );

  // document.getElementsByClassName("songListItem").addEventListener("mouseover", function(){
  //   document.getElementsByClassName("hiddenMetrics").style.display='block';
  // });

  // document.getElementsByClassName("songListItem").addEventListener("mouseout", function(){
  //   document.getElementsByClassName("hiddenMetrics").style.display='none';
  // });

