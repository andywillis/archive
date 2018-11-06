define(['dateFormat'], function (dateFormat) {

  var formattedDate = dateFormat(new Date(), "dd mmm yyyy h:MM TT");

  function Logger() {
    this.type = 'log'
    this.store = []
  }

  Logger.prototype.add = function () {
    var arguments = arguments[0]
    arguments.date = formattedDate
    this.store.push(arguments)
  }

  Logger.prototype.view = function () {
    this.store.map(function(item){
      console.log(item)
    })
  }

  return Logger

})