(function(window) {

  var core = {}
  
  core.isEmpty = function(obj) {
    return Object.keys(obj).length === 0 ? true : false
  }

  if (!window.core) window.core = core;

}(window))