import React from 'react';

/**
 * Show page not found
 *
 * @returns {Component}
 */
function NotFound() {
  return (
    <div className="container">
      <div className="not-found">
        <h3>Oops!</h3>
        <p className="not-found__text">The page you're looking for is not found</p>
      </div>
    </div>
  );
}

export default NotFound;
