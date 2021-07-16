import Link from "next/link";
// async function

const Playlist = props => (
    <div className="playlistMain">
    <Link href={"/playlistDisplay?playlist="+props.playlist.title+"&creator="+props.playlist.creator+"&id="+props.playlist.id+"&accessToken="+props.accessToken}>
    <div className="container playlistBox">
        <p className="titleHere">{props.playlist.title}</p>
        <p className="creatorHere">{props.playlist.creator}</p>
        {/* <p className="ratingHere">Likes: {props.rating}</p> */}
        {/* <button onClick={} className="like">Like</button> */}
    </div>
    </Link>
    <style jsx>{`
    .titleHere{
      display: inline-block;
    }
    .creatorHere{
      font-size: 14px;
      margin:0;
      padding:0;
      display: inline-block;
      padding-left: 15px;
      color: #1DB954;
    }
    .ratingHere{
      margin:0;
      padding:0;
      float:right;
      padding-right: 10px;
    }
    .container{
      padding:0;
      margin:0;
      border-radius: 10px;
      padding-left: 2px;
    }
    .titleHere{
      padding: 0;
      margin: 0;
    }
    .container:hover{
      background-color: #1DB954;
    }
    .container:hover .titleHere{
      color: black;
    }
    .container:hover .creatorHere{
      color: white;
      
    }
    .container:hover .ratingHere{
      color: black;
    }
    .playlistBox{
        font-family: console, monospace;
        padding-bottom: 5px;
    }
    .like{
      // position: absolute;
        font-family: console, monospace;
        float: right;
        margin-right: 5px;
        background:#1DB954;
        color: #FFF;
        // font-size: 14px;
        border: none;
        border-radius: 500px;
        margin-top: 2px;
        -webkit-transition: background 0.4s;
        transition-duration: background 0.4s;

    }
    .like:hover {
      background: black;
      color: #1DB954;  
    }
    `}
    </style>
    </div>
    
  );
  
  export default Playlist;