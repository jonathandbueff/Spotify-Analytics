import fetch from 'isomorphic-unfetch';
import Layout from '../comps/Layout';
import Router from 'next/router';
import absoluteUrl from "next-absolute-url";
import url from "url";
import Profile from '../comps/profile';
import Header from '../comps/header';
import SideBar from '../comps/sideBar';
import Footer from '../comps/footer';




let awsinstance = 'http://ec2-18-191-11-49.us-east-2.compute.amazonaws.com'; //Jon
// let awsinstance = 'http://ec2-18-234-109-238.compute-1.amazonaws.com'; //Joes

const homeStyle ={
  position: "absolute",
  background: "url('/12.png') no-repeat center fixed",
  backgroundSize: "cover",
  left: "0",
  top: "0",
  right: "0",
  height: "100%",
  width: "100%"
}

const Home = (props) => (
  <div style={homeStyle}>
	<Header className="homeHeader"/>
  <ul className ="mainProfileBox">
  <img className="profileImage" src={props.data.image} alt="profileimage"/>
  <img className="artistImage" src={props.data.topArtistUrl} alt="profileimage"/>
  <li className="homeProfile" ><Profile {...props} /></li>
  <li className = "sideBarProfile" ><SideBar {...props}></SideBar></li>
  </ul>
  <Footer className="homeFooter"/>
  <style jsx>{`
  .profileImage{
    position: absolute;
    top: 50px;
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
  .mainProfileBox{
    max-width: 75%;
    margin:0;
    list-style-type: none;
  }
  .homeHeader{
    margin:0;
    position:fixed;
  }
  .homeProfile{
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
let count = 0;
let accessToken;
let username;
Home.getInitialProps = async function(req){
  let code = req.query.code;
  let image;
  let topTracks;
  let topArtist;
  let topArtistImage;
  let allPlaylists;
  if (count == 0){
  const res = await fetch(awsinstance+':3456/getCode?code='+code);
  const data = await res.json();
  accessToken=data.accessToken; 
  username = data.username;
}

  const result = await fetch(awsinstance+':3456/getData?token='+accessToken+'&username='+username);
  const dataAll = await result.json();
  const result2 = await fetch(awsinstance+':3456/getOtherUsers?token='+accessToken+'&username='+username);
  const allUsers = await result2.json();
  // const ratingsData = await fetch(awsinstance+':3456/getRatings?token='+accessToken+'&username='+username);
  // const ratings = await ratingsData.json();
  let sum=0;

  let playlistObject=[];
  JSON.parse(dataAll[0].playlists).forEach((playlist,index)=>{

    // console.log(playlist);
    // sum = sum +ratings[index].rating;
    // playlistObject.push({playlist: playlist, rating: ratings[index].rating});
    playlistObject.push({playlist: playlist, accessToken: accessToken});

  });



  return{data: {
    image: dataAll[0].image,
    topArtistUrl: dataAll[0].topArtistUrl,
    topTracks: JSON.parse(dataAll[0].topTracks).items,
    allUsers: allUsers,
    accessToken: accessToken,
    // allPlaylists: JSON.parse(dataAll[0].playlists),
    allPlaylists: playlistObject,
    user: username,
    totalLikes: sum
  }};
}
export default Home;