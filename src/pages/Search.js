import React from 'react';
import Header from '../components/Header';
import Loading from './Loading';
import AlbumCard from '../components/AlbumCard';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artistName: '',
    buttonEnabled: false,
    searchingAPI: false,
    albumList: [],
    lastSearch: '',
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minChars = 2;
    this.setState({
      artistName: value,
      buttonEnabled: value.length >= minChars,
    });
  }

  handleClick = async () => {
    const { artistName } = this.state;
    this.setState(() => (
      { searchingAPI: true, lastSearch: artistName }));
    const albums = await searchAlbumsAPI(artistName);
    this.setState(() => ({
      artistName: '',
      searchingAPI: false,
      albumList: albums,
    }));
  }

  showResult = (artistName, albumList) => (
    <div>
      <h3>{`Resultado de álbuns de: ${artistName}`}</h3>
      <div>
        {albumList.map((artist, index) => (
          <AlbumCard
            key={ index }
            artistName={ artist.artistName }
            collectionId={ artist.collectionId }
            collectionName={ artist.collectionName }
            artworkUrl100={ artist.artworkUrl100 }
          />
        ))}
      </div>
    </div>
  )

  render() {
    const {
      artistName,
      buttonEnabled,
      searchingAPI,
      albumList,
      lastSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            value={ artistName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ !buttonEnabled }
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
        {
          searchingAPI && <Loading />
        }
        {
          !albumList.length > 0
            ? <h2>Nenhum álbum foi encontrado</h2>
            : this.showResult(lastSearch, albumList)
        }
      </div>
    );
  }
}

export default Search;
