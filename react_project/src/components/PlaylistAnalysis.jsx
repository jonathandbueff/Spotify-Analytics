import React from 'react'
import './PlaylistAnalysis.scss'
import { Icon } from 'semantic-ui-react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default class PlaylistAnalysis extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            playlists: null
        }
    }

    componentDidMount() {
        fetch('http://localhost:3001/api/userPlaylists')
            .then(res => res.json())
            .then(response => {
                this.setState({ playlists: response.body.items });
            })
            .catch(err => console.log(err));

    }
    resizeProfileContainer() {
        this.setState({ expanded: !this.state.expanded })
    }

    render() {
        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 3 // optional, default to 1.
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2 // optional, default to 1.
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1 // optional, default to 1.
            }
        };

        const user = this.props.user;
        const playlists = this.state.playlists;
        const chartsExpanded = this.state.expanded;
        console.log(playlists);
        return (
            <div className="playlists-container" >
                <h2>Your Playlists</h2>
                {/* {chartsExpanded ?
                    <Icon
                        onClick={() => this.resizeProfileContainer()}
                        name='angle double up'
                        className='expanded-icon' /> :
                    <Icon
                        onClick={() => this.resizeProfileContainer()}
                        name='angle double down'
                        className='collapsed-icon' />
                } */}
                {playlists &&

                    <Carousel responsive={responsive}>
                        {playlists.map((playlist, index) =>
                            <div key={index}>
                                <img
                                    className="playlist-poster"
                                    src={playlist.images[0].url}
                                />
                                    <h5>{playlist.name}</h5>

                            </div>
                        )}
                    </Carousel>
                }
            </div>
        )
    }
}