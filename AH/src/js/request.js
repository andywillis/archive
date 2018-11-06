/**
 * Updated from Quirksmode XMLHTTPRequest example
 * @param  {String} url      URL
 * @param  {Object} deferred Deferred object
 */
function request(url, callback) {

  let req = new XMLHttpRequest();

  if (!req) return;

  let method = 'GET';
  req.open(method, url, true);
  req.setRequestHeader('User-Agent','XMLHTTP/1.0');
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (req.status === 200) {
        callback(req);
      } else {
        callback(new Error('Rejected request'));
      }
    }
  }

  req.send();

}

export default request;