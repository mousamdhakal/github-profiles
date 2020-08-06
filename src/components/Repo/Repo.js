import React, { Component } from 'react';

import './Repo.css';
import findTimePassed from '../../utils/findTimePassed';

/**
 * Display information about a particular repo
 *
 * @param {Object} repo Object with info of repo
 * @returns { Component }
 */
function Repo({ repo }) {
  return (
    <div className="repo">
      <a href={repo.html_url} className="repo__link">
        {repo.name}
      </a>
      <div className="repo__info">
        {repo.description ? (
          <div className="repo__description">
            <p>{repo.description}</p>
          </div>
        ) : null}
        {repo.language ? (
          <span className="repo__language">
            <span className="repo__language-circle"></span> {repo.language}
          </span>
        ) : null}
        <span className="repo__updated">{findTimePassed(repo.updated_at)}</span>
      </div>
    </div>
  );
}

export default Repo;
