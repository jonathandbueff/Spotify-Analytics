import React from 'react'
import './ProfileCard.scss'
import { Icon } from 'semantic-ui-react'

export default class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        }
    }

    resizeProfileContainer() {
        this.setState({ expanded: !this.state.expanded })
    }
    
    render() {
        const user = this.props.user;
        const profileExpanded = this.state.expanded;
        return (
            <div className="profile-container text-primary" style={{ height: profileExpanded ? '600px' : '325px' }}>
                <img src={user.images[0].url} alt="profile picture" className="profile-img"></img>
                <p>{user.display_name}</p>
                <p>Followers: {user.followers.total}</p>
                {profileExpanded ?
                    <Icon
                        onClick={() => this.resizeProfileContainer()}
                        name='angle double up'
                        className='expanded-icon' /> :
                    <Icon
                        onClick={() => this.resizeProfileContainer()}
                        name='angle double down'
                        className='collapsed-icon' />
                }
            </div>
        )
    }
}