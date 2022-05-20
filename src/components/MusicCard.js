import React from 'react';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
  }

  render() {
    const {
      previewUrl,
      trackName,
      trackId,
      checked,
      onChange,
    } = this.props;
    const { loading } = this.state;

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
              checked={ checked }
              onChange={ onChange }
            />
          </label>
          {loading && <Loading />}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MusicCard;
