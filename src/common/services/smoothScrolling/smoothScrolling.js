/* istanbul ignore next */
(function() {
  function smoothScrolling($timeout) {

    let _scrollTo = function(eID) {

      function currentYPosition() {
        // Firefox, Chrome, Opera, Safari
        if (self.pageYOffset) {
          return self.pageYOffset
        }
        // Internet Explorer 6 - standards mode
        if (document.documentElement && document.documentElement.scrollTop) {
          return document.documentElement.scrollTop
        }

        // Internet Explorer 6, 7 and 8
        if (document.body.scrollTop) {
          return document.body.scrollTop
        }
        return 0
      }

      function elmYPosition(id) {
        let elm = document.getElementById(id)
        let y = elm.offsetTop
        let node = elm
        while (node.offsetParent && node.offsetParent !== document.body) {
          node = node.offsetParent
          y += node.offsetTop
        } return y
      }

      let startY = currentYPosition()
      let stopY = elmYPosition(eID)
      let distance = stopY > startY ? stopY - startY : startY - stopY
      if (distance < 100) {
        scrollTo(0, stopY)
        return null
      }
      let speed = 3


      let step = Math.round(distance / 25)
      let leapY = stopY > startY ? startY + step : startY - step
      let timer = 0

      let scrollFunction = ()=> {

        if (stopY > leapY) {
          window.scrollTo(0, leapY)
          leapY += step
          if (leapY > stopY) {
            leapY = stopY
          }
          if (timer * speed < 30) {
            timer += 1
          }
          $timeout(() => {
            scrollFunction()
          }, speed * timer)
        }

      }
      scrollFunction()
    }

    function _simpleScrollingTo(element) {
      $( 'html, body').animate({
        scrollTop: $(element).offset().top
      }, 1000)
    }

    return {
      scrollTo: _scrollTo,
      simpleScrollTo: _simpleScrollingTo
    }

  }
  angular.module('profitelo.directives.services.smooth-scrolling', [])
    .service('smoothScrolling', smoothScrolling)
}())