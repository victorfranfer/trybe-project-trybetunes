import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from './Loading';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  state = {
    artistName: '',
    albumName: '',
    songs: [],
    favoriteSongs: [],
    isLoading: false,
    isChecked: false,
  }

  fetchSongsFromAPI = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    // console.log(match);
    // console.log(params);
    // console.log(id);
    // this.setState({ isLoading: true });
    const tracks = await getMusics(id);
    this.setState({
      artistName: tracks[0].artistName,
      albumName: tracks[0].collectionName,
    }, () => {
      this.setState({ songs: tracks.filter((song) => song.trackId) });
    });
  };

  isChecked = (song) => {
    const { favoriteSongs } = this.state;
    favoriteSongs.includes(song);
    this.setState({ isChecked: true });
  };

  componentDidMount = () => {
    this.setState({ isLoading: true }, async () => {
      const favorites = await getFavoriteSongs();
      console.log(favorites);
      this.setState({ favoriteSongs: favorites, isLoading: false });
    });
    this.isChecked();
    this.fetchSongsFromAPI();
  }

  findFavorite = (music) => {
    const { favoriteSongs } = this.state;
    return favoriteSongs.find((song) => song.trackId === music.trackId);
  }

  handleClick = () => this.setState({ isLoading: true });

  addFavoriteSong = (music) => {
    this.setState({ isLoading: true }, async () => {
      if (this.findFavorite(music)) {
        await removeSong(music);
      } else {
        await addSong(music);
      }
      const newFavorites = await getFavoriteSongs();
      this.setState({ isLoading: false, favoriteSongs: newFavorites });
    });
  }

  render() {
    const {
      artistName,
      albumName,
      songs,
      isLoading,
      isChecked,
    } = this.state;

    return (
      <div data-testid="page-album">
        <Header />
        {isLoading === true ? <Loading /> : (
          <>
            <h2 data-testid="artist-name">{ artistName }</h2>
            <h4 data-testid="album-name">{ albumName }</h4>
            {
              songs.map((song, index) => (
                <MusicCard
                  key={ index }
                  trackId={ song.trackId }
                  trackName={ song.trackName }
                  onClick={ isChecked === true && this.isChecked }
                  previewUrl={ song.previewUrl }
                />
              ))
            }
          </>
        ) }

      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
