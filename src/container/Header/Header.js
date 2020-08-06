import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './Header.css';
import SearchBar from '../../components/SearchBar/SearchBar';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      searchText: ''
    };
  }

  handleChange = (e) => {
    this.setState({ searchText: e.target.value });
  };

  handleSubmit = (e) => {
    const { history } = this.props;
    e.preventDefault();
    history.push(`/search/users?q=${this.state.searchText}`, null);
  };

  render() {
    return (
      <header className="header">
        <div className="container clearfix">
          <h1 className="header__brand">
            <a href="/" className="header__link">
              Github Profiles
            </a>
          </h1>
          <div className="header__search">
            <SearchBar
              className="header__searchbar"
              handleChange={this.handleChange}
              title="Users "
              handleSubmit={this.handleSubmit}
            />
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
