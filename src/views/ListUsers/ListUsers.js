import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';

import * as userActions from '../../actions/userActions';
import getItem from '../../services/getItem';
import { BASE_URL } from '../../constants/endPoints';
import UserCard from '../../components/UserCard/UserCard';
import './ListUsers.css';

/**
 * List the users on the screen in card view
 *
 * @returns { Component }
 */
class ListUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  /**
   * Toggle the loading flag in state
   */
  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };

  /**
   * Show not found page on bad request
   */
  onLoadFail = () => {
    const { history } = this.props;
    history.push(`/error/notfound`, null);
  };

  /**
   * Get the users from the API and set it in redux store
   */
  getUsers = () => {
    getItem(
      `${BASE_URL}${!this.props.location.search ? '/users' : ''}${this.props.location.pathname}${
        this.props.location.search ? this.props.location.search : ''
      }`,
      this.props.setUsers,
      this.toggleLoading,
      this.props.location.search ? 'search' : null,
      this.onLoadFail
    );
  };

  /**
   * Reset previous users and get new users
   */
  componentDidMount() {
    this.props.setUsers(null);
    this.getUsers();
  }

  /**
   * Fetch users again on change in search query
   * @param { Object } prevProps Props of previous render
   */
  componentDidUpdate(prevProps) {
    if (prevProps.location.search !== this.props.location.search) {
      this.getUsers();
    }
  }

  render() {
    return (
      <section>
        <div className="container">
          {this.state.isLoading || !this.props.users ? (
            <div className="loader-div">
              <Loader type="Plane" color="#D40C7A" height={100} width={100} />
            </div>
          ) : (
            <div className="container">
              <div className="users clearfix">
                {this.props.location.aboutProps ? (
                  <h2 className="users__title">
                    {this.props.location.aboutProps.title} (of {this.props.location.aboutProps.name})
                  </h2>
                ) : null}
                <div className="users__list">
                  {this.props.users.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                  {this.props.location.search ? (
                    <p className="users__notice">
                      Try making your search more speicific if you can not find the user here.
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.user.users, info: state.user.info };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUsers: (users) => {
      dispatch(userActions.setUsers(users));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ListUsers));
