import React from 'react';
import { Link } from 'react-router-dom';

import './UserInfo.css';

/**
 * Displays the user info
 * @param {Object} user User passed to Userinfo object
 */
function UserInfo({ user }) {
  return (
    <div className="user__info">
      <div className="user__personal-info clearfix">
        <img className="user__image" src={user.avatar_url} alt="Profile" />
        <div className="user__name-container">
          <h2>{user.name}</h2>
          <span>{user.login}</span>
        </div>
      </div>
      <p className="user__bio">{user.bio}</p>
      <div className="user__activity">
        <Link
          to={{
            pathname: `${user.login}/followers`,
            aboutProps: {
              title: 'Followers',
              name: user.name,
              link: user.followers_url
            }
          }}
          className="user__friends user__friends--followers"
        >
          <i className="fas fa-user-friends"></i>
          <span className="user__number">{user.followers} </span>
          followers
        </Link>
        <Link
          to={{
            pathname: `${user.login}/following`,
            aboutProps: {
              title: 'Following',
              name: user.name,
              link: user.following_url
            }
          }}
          className="user__friends user__friends--following"
        >
          <i className="fas fa-user-friends"></i>
          <span className="user__number">{user.following}</span>
          following
        </Link>
      </div>
      {user.location ? (
        <p className="user__location">
          <i className="fas fa-map-marker-alt"></i> {user.location}
        </p>
      ) : null}
    </div>
  );
}

export default UserInfo;
