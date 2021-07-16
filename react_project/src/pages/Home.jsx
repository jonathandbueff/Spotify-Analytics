import React from 'react'
import './Home.scss'
import Header from '../components/Header'


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
    }
  }

  // CoomponentDidMount gets ran upon loading component
  // fetches user information at url and then saves it to the state.
  // whenever a property of the state changes, the render function gets called.
  componentDidMount() {
    fetch('http://localhost:3001/userinfo')
      .then(res => res.json())
      .then(response => {
        this.setState({ user: response.body });
      })
      .catch(err => console.log(err));
  }

  render() {

    const user = this.state.user;
    return (
      <div>
        {user ?
          <p>{user.display_name}</p> :
          <p>Please login</p>
        }
      </div>
    )
  }
}