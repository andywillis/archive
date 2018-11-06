/**
 * Renders a code block
 * @param  {String} data Stringyfied data
 * @return {[type]}      Code block HTML
 */
export function codeblock(data) {
  return '<pre><code>#{data}</code></pre>'.replace('#{data}', data);
};