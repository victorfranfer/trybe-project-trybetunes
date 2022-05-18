import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from './Loading';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    userName: '',
    buttonEnabled: false,
    loading: false,
    logged: false,
  }

  handleChange = ({ target }) => {
    const { value } = target;
    const minChars = 3;
    this.setState({
      userName: value,
      buttonEnabled: value.length >= minChars,
    });
  }

  handleClick = async () => {
    const { userName } = this.state;
    this.setState(() => ({ loading: true }));
    await createUser({ name: userName });
    this.setState({ loading: false, logged: true });
  }

  render() {
    const { userName, buttonEnabled, loading, logged } = this.state;
    if (logged) return <Redirect to="/search" />;
    if (loading) return <Loading />;
    return (
      <div data-testid="page-login">
        <form>
          <label htmlFor="login-name-input">
            Insira seu nome
            <input
              type="text"
              name="login-name"
              id="login-name-input"
              data-testid="login-name-input"
              value={ userName }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            id="login-submit-button"
            data-testid="login-submit-button"
            onClick={ this.handleClick }
            disabled={ !buttonEnabled }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

export default Login;
