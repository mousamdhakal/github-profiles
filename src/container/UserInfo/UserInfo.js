import React from 'react';
import { Link } from 'react-router-dom';

import './UserInfo.css';

function UserInfo(props) {
  return (
    <div className="user__info">
      <div className="user__personal-info clearfix">
        <img className="user__image" src={props.user.avatar_url} alt="Profile" />
        <div className="user__name-container">
          <h2>{props.user.name}</h2>
          <span>{props.user.login}</span>
        </div>
      </div>
      <p className="user__bio">{props.user.bio}</p>
      <div className="user__activity">
        <Link
          to={{
            pathname: `${props.user.login}/followers`,
            aboutProps: {
              title: 'Followers',
              name: props.user.name,
              link: props.user.followers_url
            }
          }}
          className="user__friends user__friends--followers"
        >
          <i className="fas fa-user-friends"></i>
          <span className="user__number">{props.user.followers} </span>
          followers
        </Link>
        <Link
          to={{
            pathname: `${props.user.login}/following`,
            aboutProps: {
              title: 'Following',
              name: props.user.name,
              link: props.user.following_url
            }
          }}
          className="user__friends user__friends--following"
        >
          <i className="fas fa-user-friends"></i>
          <span className="user__number">{props.user.following}</span>
          following
        </Link>
      </div>
      {props.user.location ? (
        <p className="user__location">
          <i className="fas fa-map-marker-alt"></i> {props.user.location}
        </p>
      ) : null}
    </div>
  );
}

export default UserInfo;
