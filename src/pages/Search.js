import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artistName: '',
    buttonEnabled: false,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minChars = 2;
    this.setState({
      artistName: value,
      buttonEnabled: value.length >= minChars,
    });
  }

  render() {
    const { artistName, buttonEnabled } = this.state;
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
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
