(function() {
  /* istanbul ignore next function*/
  function PrintService() {

    let htmlPrintTemplate =  (imgSrc) => {

      return '<html><head>' +
      '</head>' +
      '<body>'+
      '<img style="display: block; margin-left: auto; margin-right: auto" src="" + imgSrc + ""/>' +
      '</body>'
    }

    function _closePrint() {
      document.body.removeChild(this.__container__)
    }

    function _setPrint() {
      this.contentWindow.__container__ = this
      this.contentWindow.onbeforeunload = _closePrint
      this.contentWindow.onafterprint = _closePrint
      this.contentWindow.focus() // Required for IE
      this.contentWindow.print()
    }

    function _printPage(imgSrc) {
      var oHiddFrame = document.createElement('iframe')
      oHiddFrame.onload = _setPrint
      oHiddFrame.style.visibility = 'hidden'
      oHiddFrame.style.position = 'fixed'
      oHiddFrame.style.right = '0'
      oHiddFrame.style.bottom = '0'
      oHiddFrame.src = htmlPrintTemplate(imgSrc)
      document.body.appendChild(oHiddFrame)
    }

    return {
      print: (src) => {
        _printPage(src)
      }
    }
  }

  angular.module('profitelo.services.print-service', [
    'ui.bootstrap'
  ])
    .service('PrintService', PrintService)

}())