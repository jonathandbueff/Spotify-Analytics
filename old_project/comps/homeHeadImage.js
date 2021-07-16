const HomeHeadImage = props => (
  <div>
    <div className="homeHeadImageBackground">
    </div>
    <style jsx>{`
    .homeHeadImageBackground{
      position: "absolute",
      backgroundImage: "url("+props.data.image+")",
      backgroundSize: "cover",
      left: "0",
      top: "0",
      right: "0",
      height: "100%",
      width: "100%"
    }
    
    `}
    </style>
  </div>
);

export default HomeHeadImage;