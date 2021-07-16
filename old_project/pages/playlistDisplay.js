import fetch from 'isomorphic-unfetch';
import Layout from '../comps/Layout';
import Router from 'next/router';
import absoluteUrl from "next-absolute-url";
import url from "url";
import Profile from '../comps/profile';
import Header from '../comps/header';
import SideBar from '../comps/sideBar';
import Footer from '../comps/footer';
import PlaylistPage from '../comps/playlistPage';
import MetricsChart from '../comps/metricsChart';
let awsinstance = 'http://ec2-18-191-11-49.us-east-2.compute.amazonaws.com'; //Jon
// let awsinstance = 'http://ec2-18-234-109-238.compute-1.amazonaws.com'; //Joe
const homeStyle ={
  position: "absolute",
  background: "url('/12.png') repeat center fixed",
  backgroundSize: "cover",
  left: "0",
  top: "0",
  right: "0",
  height: "100%",
  width: "100%"
}
const mainPlaylistBoxStyle={
  margin:"0",
  listStyleType: "none",
  position: "relative",
  background: "url('/12.png') repeat center fixed",
  backgroundSize: "cover",
  left: "0",
  top: "52px",
  right: "0",
  height: "100%",
  width: "calc( 75% - 40px)"
}
const PlaylistDisplay = props => (
  <div style={homeStyle}>
	<Header className="homeHeader"/>
  <div className="metricsChartBoxWrapper">
  <div className="metricsChartBox">
    <MetricsChart {...props}/>
  </div>
  </div>
  <ul className ="mainPlaylistBox" style={mainPlaylistBoxStyle}>
  <img className="playlistImage" src={props.data.image} alt="playlistimage"/>
  <div>
    {/* <h2>{console.log(props.data.metrics)}</h2> */}
  </div>
  {/* <img className="artistImage" src={props.data.topArtistUrl} alt="profileimage"/> */}
  <li className="playlistPage" ><PlaylistPage {...props} /></li>
  <li className = "sideBarProfile" ><SideBar {...props}></SideBar></li>
  </ul>
  <Footer className="homeFooter"/>
  <style jsx>{`
  .metricsChartBoxWrapper{
    position: relative;
    background: black;
    width:75%;
    left:0px;
    top: 52px;
    // height: 45vh;
    // max-height: 45vh;
  }
  .playlistImage{
    position: absolute;
    top: 0px;
    left: 0px;
    max-width: calc( 75vw /2 );
    max-height: 35vh;
  }
  .artistImage{
    position: absolute;
    top: 50px;
    right: 25%;
    max-width: calc( 75vw /2 );
    max-height: 35vh;
  }
  // .mainPlaylistBox{
  //  
  //   margin:0;
  //   list-style-type: none;
  //   position: relative;
  //   // top: calc( 35vh + 52px);
  // }
  .homeHeader{
    margin:0;
    position:fixed;
  }
  .playlistPage{
    margin:0;
    display: inline-block;
  }
  .sideBarProfile{
    display: inline-block;
    width: 25%;
    position:fixed;
    right: 0;
    top: 51px;
    padding:0;
  }
  .homefooter{
    position: fixed;
    left: 0px;
    bottom: 0px;
    width:100vw;
  }
  `}
  </style>
  </div>
  );
  PlaylistDisplay.getInitialProps = async function(req){
    let accessToken= req.query.accessToken;
    let playlistID = req.query.id;
    let playlist = req.query.playlist;
    let creator =req.query.creator;
    let username = creator;
    const result = await fetch(encodeURI(awsinstance+':3456/getPlaylistData?username='+username+'&title='+playlist));
    const dataAll = await result.json();
    const result2 = await fetch(awsinstance+':3456/getOtherUsers?token='+accessToken+'&username='+username);
    const allUsers = await result2.json();
    let metricsArray = JSON.parse(dataAll.metrics).audio_features;
    let imageArray = dataAll.image;
    let playlistTitle = dataAll.playlist;
    let tracksArray=null;
    if(dataAll.tracks != undefined){
      tracksArray = JSON.parse(dataAll.tracks);}


    let image = JSON.parse(imageArray)[0].url;

    return {data:{
    image: image,
    allUsers: allUsers,
    playlist: playlistTitle,
    creator: dataAll.creator,
    tracks: tracksArray,
    metrics: metricsArray,
    id: playlistID,
    accessToken: accessToken
    }};
  }
  
  export default PlaylistDisplay;