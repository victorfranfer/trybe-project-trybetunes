import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    name: '',
  }

  componentDidMount = async () => {
    const userInfo = await getUser();
    this.setState({ name: userInfo.name });
  }

  render() {
    const { name } = this.state;
    return (
      <div data-testid="header-component">
        <h3>TrybeTunes</h3>
        {
          name.length > 1
            ? <span data-testid="header-user-name">{ name }</span>
            : 'Carregando...'
        }
        <nav>
          <Link data-testid="link-to-search" to="/search">Search</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
          <Link data-testid="link-to-profile" to="/profile">Profile</Link>
        </nav>
      </div>
    );
  }
}

export default Header;
