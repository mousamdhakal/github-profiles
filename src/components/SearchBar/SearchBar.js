import React from 'react';
import './SearchBar.css';

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
