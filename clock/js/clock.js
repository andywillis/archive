$(document).ready(function () {

  (function () {

    // Declare the various variables in use throughout the code
    // and grab the most used selectors for effeciency
    var $win = $(window), $outer = $('#outer'), $clock = $('#clock'), $display = $('#display'), $time = $('.time')
      , go, clockType = 'timer', time, step = 135
      , timeArr = ['hours','mins','secs'], resetArr = ['now', 'change', 'arr', 'prev', 'prevArr'];

    // Position the absolute digit divs 78 pixels apart.
    // Bind our resize function to the window to run if there are any changes.
    // Fade in the centered clock.
    reset('all', 0);
    $time.each(function(d) { $(this).css({left: d * 78 + 'px'}) });
    $win.bind('resize', toCenter);
    toCenter(function(){ $outer.fadeIn(500); });

    // Click the start button - uses an setInterval rather than a setTimeout for clarity.
    // Use anonymous function to allow parameters to be passed to the setInterval
    $('#start').live('click', function () {
      go = setInterval(processTime, 1000);
      $(this).html('Stop').attr({'id': 'stop'});
    })

    // Click the stop button - clear the setInterval
    $('#stop').live('click', function () {
      clearInterval(go);
      $(this).html('Start').attr({'id': 'start'});
    })

    // Click the reset button, reset the vars.
    // True is a parameter passed to processTime
    // to let it know to not increment the secs var on the first pass
    $('#reset').live('click', function () {
      reset('display', 0)
      processTime(true)
    })

    // CLick the current time button.
    // This toggles the display from 'timer' to 'clock'
    $('#toggle').live('click', function() {
      if ($(this).hasClass('toggleOn')) {
        clockType = 'timer'
        $(this).removeClass('toggleOn')
        processTime();
      } else {
        $(this).addClass('toggleOn')
        clockType = 'clock'
        processTime();
      }
    })

    // Reset vars
    function reset(type, value) {
      resetArr = (type === 'all') ? resetArr : resetArr.slice(0,3)
      if (type === 'all') time = { now: {}, change: {}, prev: {}, arr: {}, prevArr: {} }
      for (var el in resetArr) { var e = resetArr[el]; time[e].hours = value; time[e].mins = value; time[e].secs = value }
    }

    // Reposition the display
    function toCenter(callback) {
      var el = $outer, top = ($win.height() - el.height())/2.5, left = ($win.width() - $display.width())/2.5;
      el.animate({marginTop: top, marginLeft: left}, 500);
      setTimeout(callback, 100)
    };

    // Resposition the digit div with the appropriate number
    function updateTime(slide, digit) {

      // Move the div down one step
      if (digit != 0) {
        $(slide).animate({
          marginBottom: '-' + parseInt((digit * step), 10) + 'px'
        }, 250, 'linear');
      }

      // Reset the div back to it's original position
      if (digit == 0) {
        var getmargin = parseInt(($(slide).css('margin-bottom')), 10);
        $(slide).animate({
          marginBottom: parseInt((getmargin - step), 10) + 'px'
        }, 250, 'linear', function () {
          $(this).css('margin-bottom', '0px')
        })
      };
    };

    // Determine the correct display based on the previous time and current time
    // then call updateTime to alter the display
    function processTime(reset) {

      // Calc updates the left and right hand digits respectively
      function calc(type) {
        time.prev[type] = time.prev[type] + ''
        arr = time.change[type].split('');
        prevArr = time.prev[type].split('');
        if (prevArr[0] != arr[0]) updateTime('#' + type + 'l', arr[0]);
        if (prevArr[1] != arr[1]) updateTime('#' + type + 'r', arr[1]);
        time.prev[type] = time.change[type]
      }

      // Determine the display type and calculate the time
      if (clockType === 'clock') {
        now = new Date(), time.now.hours = now.getHours(), time.now.mins = now.getMinutes(), time.now.secs = now.getSeconds()
      } else {
        if (!reset) time.now.secs++
        if (time.now.secs === 60) { time.now.secs = 0; time.now.mins++ }
        if (time.now.mins === 60) { time.now.mins = 0; time.now.hours++ }
      }

      // For each hours, mins and secs, stringify the value.
      // If it's changed from its previous value run calc()
      for (var t = 0, len = timeArr.length; t < len; t++) {
        var v = timeArr[t]
        time.change[v] = (time.now[v] < 10) ? '0' + time.now[v] : time.now[v] + ''
        if (time.change[v] != time.prev[v]) calc([v]);
      }

    };

  }())

});