import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom';

import getItem from '../../services/getItem';
import * as userActions from '../../actions/userActions';
import UserInfo from '../../container/UserInfo/UserInfo';
import UserRepos from '../../container/UserRepos/UserRepos';
import './UserProfile.css';

class UserProfile extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false
    };
  }

  toggleLoading = () => {
    this.setState({
      isLoading: !this.state.isLoading
    });
  };

  onLoadFail = () => {
    const { history } = this.props;
    history.push(`/error/notfound`, null);
  };

  componentDidMount() {
    let userToFetch = this.props.match.params.user_id ? this.props.match.params.user_id : this.props.defaultUser;
    getItem(userToFetch, this.props.setInfo, this.toggleLoading, 'user', this.onLoadFail);
  }

  render() {
    return (
      <section>
        <div className="container">
          {this.state.isLoading || !this.props.info ? (
            <div className="loader-div">
              <Loader type="Plane" color="#D40C7A" height={100} width={100} />
            </div>
          ) : (
            <div className="container">
              <div className="user clearfix">
                <UserInfo user={this.props.info} />
                <UserRepos user={this.props.info} />
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return { info: state.user.info };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setInfo: (info) => {
      dispatch(userActions.setInfo(info));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserProfile));
