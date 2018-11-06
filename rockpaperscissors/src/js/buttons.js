import { merge } from './utils';
import { getRuleSets } from './rules';

export const buttons = {
	player: ['Player vs Computer', 'Computer vs Computer']
}

/**
 * @function addRuleButtons
 * @param  {array} rulesets An array of the rule sets (default, spock)
 * @return {object} An object matching arrays of buttons to a set
 */
export function addRuleButtons(rules, rulesets) {
	return rulesets.reduce((p, c) => {
			p[c] = Object.keys(rules[c]);
			return p;
		}, {});
}

/**
 * @function getButtons
 * @param  {array} rulesets An array of rules
 * @return {array} A final array of buttons
 */
export function getButtons(rules) {
	const rulesets = getRuleSets(rules);
	const merged = merge(buttons, { rulesets: rulesets });
	return merge(merged, addRuleButtons(rules, rulesets));
}

/**
 * @function buttonHTML
 * @param  {arr} arr Array of button names
 * @return {string} HTML string
 */
export function buttonHTML(arr) {
	return arr.reduce((p, c) => {
		p.push(`<div role="button" class="button">${c}</div>`);
		return p;
	}, []).join('');
}

/**
 * @function buttonStripHTML
 * @param  {string} html HTML string
 * @param  {string} type Strip type}
 * @return {string} HTML string
 */
export function buttonStripHTML(html, type) {
	return `<div class="buttonStrip ${type}">${html}</div>`;
}
