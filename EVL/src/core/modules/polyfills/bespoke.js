!function (global) {

  /**
   * Add new array method
   */
  if (!('contains' in Array.prototype)) {
    Array.prototype.contains = function (v) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (this[i] === v) { return true; }
      }
      return false;
    };
  }

}();
