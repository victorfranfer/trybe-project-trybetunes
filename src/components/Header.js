import React from 'react';
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
      </div>
    );
  }
}

export default Header;
