/**
 * @function appendHTML
 * @param  {object} node   The element to which we append HTML
 * @param  {array} html   An array of HTML
 * @param  {boolean} clear The HTML string
 */
export function appendHTML(node, html, clear) {
	if (clear) clearHTML(node);
	html.forEach(el => node.insertAdjacentHTML('beforeend', el));
}

/**
 * @function clearHTML
 * @param  {object} node The element to be cleared
 */
export function clearHTML(node) {
	node.innerHTML = '';
}

/**
 * @function qs
 * @param  {string} selector Selector to be used
 * @return {object} Single element matching the selector
 */
export function QS(selector) {
  return document.querySelector(selector);
}
