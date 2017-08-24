;(function() {
  var loggingFunction = null
  var loggingChunks = []
  var THRESHOLD = 10

  function collectEventData(e) {
    e = e || window.event
    if (!e) return
    // console.log(e)
    var eventLog = {}
    var charCode = e.keyCode || e.which
    var charStr = String.fromCharCode(charCode)
    eventLog.tag = e.target.tagName
    eventLog.rawEvent = e
    eventLog.keyCode = e.keyCode
    eventLog.which = e.which
    eventLog.currentKey = charStr
    eventLog.appName = window.navigator.appName
    eventLog.appCodeName = window.navigator.appCodeName
    eventLog.product = window.navigator.product
    eventLog.userAgent = window.navigator.userAgent
    eventLog.platform = window.navigator.platform
    eventLog.timestamp = new Date()
    eventLog.location = window.location

    loggingChunks.push(eventLog)

    if (loggingChunks.length >= THRESHOLD) {
      loggingFunction(loggingChunks) // push list of objects
      loggingChunks = []
    }
  }

  function consoleLog(events) {
    if (!events) return
    for (var event of events) {
      console.log(event)
    }
  }

  function addEventsForElements(tag, eventName) {
    var elements = document.getElementsByTagName(tag)
    if (!elements) return
    for (var element of elements) {
      addEvent(element, eventName, collectEventData)
    }
  }

  //thanks SO https://stackoverflow.com/a/16089470/1613200
  function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
      element.addEventListener(eventName, callback, false)
    } else if (element.attachEvent) {
      element.attachEvent('on' + eventName, callback)
    } else {
      element['on' + eventName] = callback
    }
  }

  //TODO allow adding event by element selector
  addEvent(document, 'keypress', collectEventData)
  addEventsForElements('input', 'change')

  function setLogger(f) {
    loggingFunction = f || consoleLog
  }

  function setThreshold(amount) {
    THRESHOLD = amount || THRESHOLD
  }

  //expose config
  KeyHoleLogger = { setLogger, setThreshold }
})()
