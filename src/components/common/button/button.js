import React, { Component } from 'react';
import './button.css';

/**
 * Creates button element
 *
 * @param {Object} props Properties received in this function
 * @returns {Component}
 */
function Button(props) {
  return (
    <button className={`btn ${props.className || ''}`} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
