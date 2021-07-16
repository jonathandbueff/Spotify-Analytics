import Header from "./header";


const body = {
position: 'fixed',
top: '50px'
}

const Layout = props => (
  <div>
    <div>
      <Header />
    </div>
    <div style ={body}>{props.children}</div>
  </div>
);

export default Layout;