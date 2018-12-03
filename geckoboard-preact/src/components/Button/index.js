import { h, render, Component } from 'preact';

function Button({ handleClick, txt}) {
  return <button onClick={handleClick}>{txt}</button>
}

export default Button;
