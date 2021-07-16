import OAuthLogin from '../comps/OAuthLogin';
// import Layout from '../comps/Layout';
import Header from '../comps/header';

const bodyStyle= {
  position: "absolute",
  background: "url('/12.png') no-repeat center fixed",
  backgroundSize: "cover",
  left: "0",
  top: "0",
  right: "0",
  height: "100%",
  width: "100%"
};
const Index = () => (
  <div style={bodyStyle}>
	<div className="headerBox"><Header/></div>
  <div className="loginBtnBox"><OAuthLogin/></div>
  <style jsx>{`
    .loginBtnBox{
      position: absolute;
      left:0;
      top:50%;
      left: calc(50% - 97.82px);
    }
  `}
  </style>
  </div>

);



export default Index;

