import React from 'react'
import './Home.scss'
import Header from '../components/Header'
import ProfileCard from '../components/ProfileCard'
import MessagingHub from '../components/MessagingHub'
import PlaylistAnalysis from '../components/PlaylistAnalysis'

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      playlistInfo: null,
      recentlyPlayed: null,
    }
  }

  // CoomponentDidMount gets ran upon loading component
  // fetches user information at url and then saves it to the state.
  // whenever a property of the state changes, the render function gets called.
  componentDidMount() {
    fetch('http://localhost:3001/api/userInfo')
      .then(res => res.json())
      .then(response => {
        this.setState({ user: response.body });
      })
      .catch(err => console.log(err));
  }

  getAudioFeatures(playlists) {
    let ids = playlists.map(item => item.track.id);
    fetch('http://localhost:3001/api/getAudioFeaturesForTracks', {
      method: 'POST',
      body: JSON.stringify({
        ids: ids
      }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(res => {
        console.log(res.audio_features)
      })
      .catch(err => console.log(err));
    //   // console.log(audioFeatures);
    // })
  }

  render() {

    const user = this.state.user;
    const playlists = this.state.playlistInfo;
    console.log(playlists);
    playlists && this.getAudioFeatures(playlists);
    // const recentlyPlayed = this.state.recentlyPlayed;

    return (
      <div>
        <Header>
        </Header>
        <div className="background-container">
          {user ?
            <div className="home-container">
              <ProfileCard
                user={user}>
              </ProfileCard>

              {/* <MessagingHub
                  user={user}>
                </MessagingHub> */}
              <PlaylistAnalysis
                show={3}
                user={user}>
              </PlaylistAnalysis>
              {/* <Friends>

              </Friends> */}
            </div> :
            <p>Please login</p>
          }
        </div>
      </div>
    )
  }
}