/**
 * @function tmpl
 * @param  {array} strings Template strings
 * @param  {array} rest Other arguments
 * @return {string} Filled template
 */
export function resultMessage (strings, ...rest) {
  let player = null;
  if (!rest[0]) {
    player = rest[1] === 1 ? 'Computer #1 wins' : 'Computer #2 wins';
  } else {
    player = rest[1] === 1 ? 'You win' : 'The computer wins';
  }
  return player + '<br/>' + rest.slice(2).join(' ');
}

