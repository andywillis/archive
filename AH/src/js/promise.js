/**
 * Promise constructor
 */
function Promise() {
  this.resolved = [];
  this.rejected = [];
  this.stack = [];
  return this;
}

/**
 * Calls the next function in the stack
 */
Promise.prototype.next = function() {
  var fn = this.stack.shift();
  fn.call(this, this.resolved);
  return this;
}

/**
 * Accepts one or more deferred objects and processes them
 */
Promise.prototype.when = function() {
  var _this = this;
  var args = Array.isArray(arguments[0]) ? arguments[0] : [arguments[0]];
  function checkStatus() {
    if (_this.resolved.length + _this.rejected.length === args.length) {
      _this.next();
    } else {
      setTimeout(checkStatus, 50);
    }
  }
  this.stack.push(checkStatus);
  this.next();
  return this;
}

/**
 * Pushes a done callback into the stack
 * @param  {Function} callback Done callback
 */
Promise.prototype.done = function(callback) {
  this.stack.push(callback);
  return this;
}

/**
 * Returns a deferred object
 * @return {Object} Deferred object
 */
Promise.prototype.deferred = function() {
  var _this = this;
  return {
    resolve: function(data) {
      _this.resolved.push(data);
    },
    reject: function(data) {
      _this.rejected.push(data);
    }
  }
};

export default Promise;