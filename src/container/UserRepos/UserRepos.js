import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';

import * as reposActions from '../../actions/reposActions';
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
        this.setState({ pageNumber });
        return;
      }
      return;
    }
    if (direction === 'right') {
      let pageNumber =
        this.state.pageNumber * 10 >=
        (this.props.filteredRepos ? this.props.filteredRepos.length : this.props.repos.length)
          ? null
          : this.state.pageNumber + 1;
      if (pageNumber) {
        this.setState({ pageNumber });
        return;
      }
    }
  };

  /**
   * Hanldes the submit of search form for repos by filtering the search and setting apge number to 1 for search results
   *
   * @param {Object} e Event object
   */
  handleSubmit = (e) => {
    e.preventDefault();
    this.filterSearch(this.props.repos);
    this.setState({
      pageNumber: 1
    });
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
   * Filters the repos according to search result and returns it
   * @param {Array} repos List of repos
   */
  filterSearch = (repos) => {
    let filteredRepos = repos.filter((repo) => {
      let repoText = repo.name.toLowerCase();
      let searchText = this.state.searchQuery.toLowerCase();
      return repoText.includes(searchText);
    });
    this.props.setFilteredRepos(filteredRepos);
    return filteredRepos;
  };

  /**
   * Reset the repos and filteredrepos on redux store and fetch 30 repos from API on mounting of the component
   */
  componentDidMount() {
    this.props.setRepos(null);
    this.props.setFilteredRepos(null);
    if (!this.props.repos && this.props.info) {
      this.getRepos(this.props.info.public_repos);
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
            (this.props.filteredRepos ? this.props.filteredRepos : this.props.repos)
              .slice((this.state.pageNumber - 1) * 10, this.state.pageNumber * 10)
              .map((repo) => <Repo key={repo.id} repo={repo} />)
          )}
        </div>
        <div className="repos__nav">
          <Button className="btn-nav" onClick={() => this.handleClick('left')}>
            <i className="btn-icon fas fa-caret-left"></i>
          </Button>
          <span className="repos__page-number">{this.state.pageNumber}</span>
          <Button className="btn-nav" onClick={() => this.handleClick('right')}>
            <i className="btn-icon fas fa-caret-right"></i>
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { info: state.user.info, repos: state.repo.repos, filteredRepos: state.repo.filteredRepos };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setRepos: (repos) => {
      dispatch(reposActions.setRepos(repos));
    },
    setFilteredRepos: (repos) => {
      dispatch(reposActions.setFilteredRepos(repos));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRepos);
