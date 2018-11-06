/**
 * @function merge
 * @param  {object} obj1 Initial object
 * @param  {object} obj2 Object to be merged
 * @return {object} Final object
 */
export function merge(obj1, obj2) {
	return Object.assign(obj1, obj2);
}

/**
 * @function getRandomNumber
 * @return {string} The name of a button to be checked against the rules
 */
export function getRandomNumber(length) {
	return Math.floor(Math.random() * length);
}
