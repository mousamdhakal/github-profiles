import React from 'react';
import './SearchBar.css';

/**
 * Search form component
 * @param {Object} props Properties object containing handleSubmit and handleChange funcitons and optional title and className
 * @returns { Component }
 */
function SearchBar(props) {
  let placeHolder = `Search ${props.title ? props.title : ''}here`;
  return (
    <form className="search" onSubmit={props.handleSubmit}>
      <input
        className={`search__input ${props.className || ''}`}
        type="text"
        onChange={props.handleChange}
        placeholder={placeHolder}
      />
    </form>
  );
}

export default SearchBar;
