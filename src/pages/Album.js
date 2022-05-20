import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
// import addSong from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    songs: [],
    // favoriteSongs: [],
    loading: false,
  }

  componentDidMount = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const tracks = await getMusics(id);
    this.setState({
      artistName: tracks[0].artistName,
      albumName: tracks[0].collectionName,
    }, () => {
      this.setState({ songs: tracks.filter((song) => song.trackId) });
    });
  };

  render() {
    const {
      artistName,
      albumName,
      songs,
      loading,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <div data-testid="page-album">
        <Header />
        <h2 data-testid="artist-name">{ artistName }</h2>
        <h4 data-testid="album-name">{ albumName }</h4>
        {
          songs.map((song, index) => (
            <MusicCard
              key={ index }
              trackId={ song.trackId }
              trackName={ song.trackName }
              previewUrl={ song.previewUrl }
            />
          ))
        }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
