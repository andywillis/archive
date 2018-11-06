!function () {

  var ScriptLoader = {

    /**
     * JSON loader
     * @param   {String}    path      JSON path
     * @param   {Function}  callback  Callback
     */
    loadJSON: function (path, callback) {
      var request;
      request = new XMLHttpRequest();
      request.open('GET', path, true);
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status >= 200 && this.status < 400) {
            callback(JSON.parse(this.responseText));
          } else {
            console.error('JSON error');
          }
        }
      };
      request.send();
      request = null;
    },

    /**
     * Process the modules object
     * @param   {Object}  scripts  List of scripts
     */
    processModules: function (scripts) {
      var sectionId, section, timer;

      sectionId = document.querySelector('meta[pageid]');
      section = sectionId.getAttribute('pageid') || 'main';

      $LAB
        .script(scripts.boot)
        .script(scripts.polyfills)
        .script(scripts.core)
        .wait(function () {

          function loadRest() {
            $LAB.script(scripts.section[section]);
          }

          (function loop() {
            if (window.Company.data.templates.main) {
              clearTimeout(timer);
              loadRest();
            } else {
              timer = setTimeout(loop, 20);
            }
          }());

        });
    }

  };

  var path = 'core/scriptloader/scriptlist.json';
  ScriptLoader.loadJSON(path, ScriptLoader.processModules);

}();
