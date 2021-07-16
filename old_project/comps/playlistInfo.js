import fetch from 'isomorphic-unfetch';
import Layout from '../comps/Layout';
import Router from 'next/router';
import absoluteUrl from "next-absolute-url";
import url from "url";
import Header from '../comps/header';
import SideBar from '../comps/sideBar';
import Footer from '../comps/footer';

// let awsinstance = 'http://ec2-18-191-11-49.us-east-2.compute.amazonaws.com'; //JON
let awsinstance = "http://ec2-18-234-109-238.compute-1.amazonaws.com"; //JOE


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
      right: 25vw;
      max-width: calc( 75vw /2 );
      max-height: 35vh;
    }
    .mainProfileBox{
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
      width: 25vw;
      position:fixed;
      right: 0;
      top: 51px;
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