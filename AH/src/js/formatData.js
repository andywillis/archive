/**
 * Format JSON with indentation
 * @param  {Object} data   JS object
 * @param  {Number} indent Spaces to indent the JSON by
 * @return {String}        Stringifed data
 */
export function formatJSON(data, indent) {
  return JSON.stringify(data, null, indent);
};

/**
 * Formatted XML for display
 * @param  {String} data XML string
 * @return {String}      Encoded XML for HTML display
 */
export function formatXML(data) {
  return data.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};