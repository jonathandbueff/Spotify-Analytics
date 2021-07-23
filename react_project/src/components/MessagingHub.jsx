import React from 'react'
// import './MessagingHub.scss'
import { Icon } from 'semantic-ui-react'

export default class MessagingHub extends React.Component {
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
        const hubExpanded = this.state.expanded;
        return (
            <div className="messaging-hub-container" style={{ height: hubExpanded ? '600px' : '325px' }}>
                {hubExpanded ?
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