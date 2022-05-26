import React from 'react';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  state = {
    isLoading: false,
    favoriteSongs: [],
  }

  handleClick = async ({ target }) => {
    const { checked } = target;
    const { trackId } = this.props;
    this.setState({
      // isChecked: checked,
      isLoading: true,
    });
    const getMusic = await getMusics(trackId);
    if (checked) {
      await addSong(getMusic);
    } else {
      await removeSong(getMusic);
    }
    this.setState({ isLoading: false });
  }

  // addFavoriteSong = (music) => {
  //   this.setState({ isLoading: true }, async () => {
  //     if (this.findFavorite(music)) {
  //       await removeSong(music);
  //     } else {
  //       await addSong(music);
  //     }
  //     const newFavorites = await getFavoriteSongs();
  //     this.setState({ isLoading: false, favoriteSongs: newFavorites });
  //   });
  // }

  isChecked = (song) => {
    const { favoriteSongs } = this.state;
    favoriteSongs.includes(song);
    return true;
  }

  // newFavoriteList = async () => {
  //   const list = await getFavoriteSongs();
  //   this.setState({ favoriteSongs: list });
  // }

  // handleChange = async () => {
  //   this.setState({ isLoading: false });
  //   const { song } = this.props;
  //   await addSong(song);
  //   await this.newFavoriteList();
  //   this.setState({ isLoading: false });
  // }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
      isChecked,
    } = this.props;
    const { isLoading } = this.state;

    return (
      <div>
        <h5>{ trackName }</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <div>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="favorite"
              data-testid={ `checkbox-music-${trackId} ` }
              checked={ isChecked }
              onClick={ this.handleClick }
            />
          </label>
          {isLoading && <Loading />}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  // song: PropTypes.objectOf().isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  // addFavoriteSong: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  // favorite: PropTypes.bool.isRequired,
};

export default MusicCard;
