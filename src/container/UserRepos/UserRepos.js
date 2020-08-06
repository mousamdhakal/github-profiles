import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import * as userActions from '../../actions/userActions';
import getItem from '../../services/getItem';
import Repo from '../../components/Repo/Repo';
import Button from '../../components/common/Button/Button';
import SearchBar from '../../components/common/SearchBar/SearchBar';

import './UserRepos.css';

/**
 * Display the repos of the user
 *
 * @returns { Component }
 */
class UserRepos extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      pageNumber: 1,
      searchQuery: ''
    };
  }

  /**
   * Toggle the loading flag in the state
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };

  /**
   * Fetches the repos from the API and sets the same on redux store
   * @param {Number} number Number of repos to fetch
   */
  getRepos = (number) => {
    getItem(
      `${this.props.info.repos_url}?page=${this.state.pageNumber}&per_page=${number}&sort=updated&direction=desc`,
      this.props.setRepos,
      this.toggleLoading
    );
  };

  /**
   * Handles the click of navigation buttons by moing to left or right
   * @param {String} direction Direction to move to in navigation , 'left' or 'right'
   */
  handleClick = (direction) => {
    if (direction === 'left') {
      let pageNumber = this.state.pageNumber < 2 ? null : this.state.pageNumber - 1;
      if (pageNumber) {
        this.setState({ pageNumber }, () => {
          this.getRepos();
        });
        return;
      }
      return;
    }
    if (direction === 'right') {
      let pageNumber = this.state.pageNumber * 30 >= this.props.info.public_repos ? null : this.state.pageNumber + 1;
      if (pageNumber) {
        this.setState({ pageNumber }, () => {
          this.getRepos();
        });
        return;
      }
    }
  };

  /**
   * Hanldes the submit of search form for repos by searching on all repos
   * @param {Object} e Event object
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.getRepos(this.props.info.public_repos);
    this.setState({ pageNumber: 'All results' });
  };

  /**
   * Handles the change of text in search form by setting the searchQuery in state to same
   * @param {Object} e Event Object
   */
  handleChange = (e) => {
    this.setState({
      searchQuery: e.target.value
    });
  };

  /**
   * If search form is submitted, filters the repos according to search text
   * @param {Array} repos List of repos
   */
  filterSearch = (repos) => {
    if (this.state.pageNumber === 'All results') {
      return repos.filter((repo) => {
        let repoText = repo.name.toLowerCase();
        let searchText = this.state.searchQuery.toLowerCase();
        return repoText.includes(searchText);
      });
    }

    return repos;
  };

  /**
   * Reset the repos on redux store and fetch 30 repos from API on mounting of the component
   */
  componentDidMount() {
    this.props.setRepos(null);
    if (!this.props.repos && this.props.info) {
      this.getRepos(30);
    }
  }

  render() {
    return (
      <div className="user__repos repos">
        <div className="repos__title">
          <h3>
            <span className="repos__icon">
              <i className="fas fa-save"></i>
            </span>
            Repositories
            <span className="repos__count">{this.props.info.public_repos}</span>
          </h3>
        </div>
        <div className="repos__search">
          <SearchBar
            className="repos__searchbar"
            title="repos "
            handleSubmit={this.handleSubmit}
            handleChange={this.handleChange}
          />
        </div>
        <div className="repos__list">
          {this.state.isLoading || !this.props.repos ? (
            <Loader type="TailSpin" color="#D40C7A" height={50} width={50} />
          ) : (
            this.filterSearch(this.props.repos).map((repo) => <Repo key={repo.id} repo={repo} />)
          )}
        </div>
        <div className="repos__nav">
          <Button className="btn-nav" onClick={() => this.handleClick('left')}>
            <i className="fas fa-caret-left"></i>
          </Button>
          <span className="repos__page-number">{this.state.pageNumber}</span>
          <Button className="btn-nav" onClick={() => this.handleClick('right')}>
            <i className="fas fa-caret-right"></i>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { info: state.user.info, repos: state.user.repos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRepos: (repos) => {
      dispatch(userActions.setRepos(repos));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRepos);
