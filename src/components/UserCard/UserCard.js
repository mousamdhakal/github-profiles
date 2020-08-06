import React from 'react';
import { Link } from 'react-router-dom';

import './UserCard.css';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <Link className="clearfix user-card__link" to={{ pathname: `/${user.login}` }}>
        <img src={user.avatar_url} alt="User Image" className="user-card__img" />
        <div className="user-card__name-container">
          <h3 className="user-card__text">{user.login}</h3>
        </div>
      </Link>
    </div>
  );
}

export default UserCard;
