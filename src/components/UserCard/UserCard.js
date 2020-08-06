import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';

/**
 * Display user Info card
 *
 * @param {Object} user User whose inforamtion is to be displayed
 * @returns {Component}
 */
function UserCard({ user }) {
  return (
    <div className="user-card">
      <Link className="clearfix user-card__link" to={{ pathname: `/${user.login}` }}>
        <img src={user.avatar_url} alt="User" className="user-card__img" />
        <div className="user-card__name-container">
          <h3 className="user-card__text">{user.login}</h3>
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
