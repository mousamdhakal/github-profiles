import React from 'react';

import './Repo.css';
import findTimePassed from '../../utils/findTimePassed';

function Repo(props) {
  return (
    <div className="repo">
      <a href={props.repo.html_url} className="repo__link">
        {props.repo.name}
      </a>
      <div className="repo__info">
        {props.repo.description ? (
          <div className="repo__description">
            <p>{props.repo.description}</p>
          </div>
        ) : null}
        {props.repo.language ? (
          <span className="repo__language">
            <span className="repo__language-circle"></span> {props.repo.language}
          </span>
        ) : null}
        <span className="repo__updated">{findTimePassed(props.repo.updated_at)}</span>
      </div>
    </div>
  );
}

export default Repo;
