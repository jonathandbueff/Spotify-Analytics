const Footer = props => (
  <div>
    <div className="footerBox">
      <p className="footerTitle">CSE 330 Creative Project</p>
      <p className="footerBody"> Created By: Jon Bueff and Joe Frazier</p>
    </div>
  <style jsx>{`
    .footerBox{
        background: black;  
        position: fixed;
        bottom: 0;
        width: 75%;    
        text-align: center;  
    }
    .footerTitle{
        font-size:12px;
        padding: 0;
        margin: 0;
        color: grey;
    }
    .footerBody{
        font-size:12px;
        padding: 0;
        margin: 0;
        color: grey;
    }
  `}
  </style>
  </div>
);

export default Footer;