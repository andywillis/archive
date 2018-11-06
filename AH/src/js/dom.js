/**
 * Returns a node using document.querySelector
 * @param  {String} selector CSS selector
 * @return {Node}            Node collection
 */
export function qs(selector) {
  return document.querySelector(selector);
};

/**
 * Returns a node using document.querySelectorAll
 * @param  {String} selector CSS selector
 * @return {Node}            Node collection
 */
export function qsa(selector) {
  return document.querySelectorAll(selector);
};