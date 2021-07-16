const Song = (props) => (
  <div className="songMain">
  <div className="container songBoxTop">
      <p className="titleHere">{props.name}</p>
      <p className="artistHere">{props.artists[0].name}</p>
      <p className="popularityHere">{props.popularity}</p>
  </div>
  <style jsx>{`
  .titleHere{
    display: inline-block;
    font-size: 16px;
  }
  .artistHere{
    font-size: 14px;
    margin:0;
    padding:0;
    display: inline-block;
    padding-left: 15px;
    color: #1DB954;
  }
  .popularityHere{
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
  .container:hover{
    background-color: #1DB954;
  }
  .container:hover .titleHere{
    color: black;
  }
  .container:hover .artistHere{
    color: white;
    
  }
  .container:hover .popularityHere{
    color: black;
  }
  .titleHere{
    padding: 0;
    margin: 0;
  }
  
  `}
  </style>
  </div>
  
);
export default Song;