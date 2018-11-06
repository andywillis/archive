!function (global) {

  /**
  * Add ECMA262-5 Array methods if not supported natively
  */
  if (!('every' in Array.prototype)) {
    Array.prototype.every = function (tester, that /*opt*/) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && !tester.call(that, this[i], i, this)) { return false; }
      }
      return true;
    };
  }


  /**
  * Add ECMA262-5 Array methods if not supported natively
  */
  if (!('filter' in Array.prototype)) {
    Array.prototype.filter = function (filter, that /*opt*/) {
      var other = [], v;
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && filter.call(that, v = this[i], i, this)) { other.push(v); }
      }
      return other;
    };
  }


  /**
   * Add ECMA262-5 Array methods if not supported natively
   */
  if (!('forEach' in Array.prototype)) {
    Array.prototype.forEach = function (action, that /*opt*/) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) { action.call(that, this[i], i, this); }
      }
    };
  }

  /**
   * Add ECMA262-5 Array methods if not supported natively
   */
  if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf = function (find, i /*opt*/) {
      var n;
      if (i === undefined) { i = 0; }
      if (i < 0) { i += this.length; }
      if (i < 0) { i = 0; }
      for (n = this.length; i < n; i++) {
        if (i in this && this[i] === find) { return i; }
      }
      return -1;
    };
  }

  /**
  * Add ECMA262-5 Array methods if not supported natively
  */
  if (!('map' in Array.prototype)) {
    Array.prototype.map = function (mapper, that /*opt*/) {
      var other = new Array(this.length);
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this) { other[i] = mapper.call(that, this[i], i, this); }
      }
      return other;
    };
  }

  /**
  * Add ECMA262-5 Array methods if not supported natively
  */
  if (!('some' in Array.prototype)) {
    Array.prototype.some = function (tester, that /*opt*/) {
      for (var i = 0, n = this.length; i < n; i++) {
        if (i in this && tester.call(that, this[i], i, this)) { return true; }
      }
      return false;
    };
  }

  /**
   * Custom event polyfill
   */
  if (typeof exports === 'object') {
    (function () {
      function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent('CustomEvent');
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
      }
      CustomEvent.prototype = window.CustomEvent.prototype;
      window.CustomEvent = CustomEvent;
    })();
  }


  /**
   * Add ECMA262-5 method binding if not supported natively
   * http://stackoverflow.com/q/2790001/1377002
   */
  if (!('bind' in Function.prototype)) {
    Function.prototype.bind = function (owner) {
      var _this = this, args;
      if (arguments.length <= 1) {
        return function () {
          return _this.apply(owner, arguments);
        };
      } else {
        args = Array.prototype.slice.call(arguments, 1);
        return function () {
          return _this.apply(owner, arguments.length === 0
            ? args
            : args.concat(Array.prototype.slice.call(arguments)));
        };
      }
    };
  }


  /**
  * Add ECMA262-5 Object methods if not supported natively
  */
  if (!('keys' in Object.prototype)) {
    Object.keys = function (obj) {
      var arr = [], prop;
      if (util.toType(obj) === 'object') {
        for (prop in obj) {
          if (obj.hasOwnProperty(prop)) {
            arr.push(prop);
          }
        }
      }
      return arr;
    };
  }

  /**
   * Add ECMA262-5 string trim if not supported natively.
   */
  if (!('trim' in String.prototype)) {
    String.prototype.trim = function () {
      return this.replace(/^\s+/, '').replace(/\s+$/, '');
    };
  }

}();
