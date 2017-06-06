export class SmoothScrollingService {

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }

  public scrollTo = (eID: string) => {

    const currentYPosition = () => {
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

    const elmYPosition = (id: string) => {
      const elm = document.getElementById(id)

      if (!elm) {
        throw new Error(`Elem ${id} not found`)
      }

      let y = elm.offsetTop
      let node = elm
      while (node.offsetParent && node.offsetParent !== document.body) {
        node = <HTMLElement>node.offsetParent
        y += node.offsetTop
      }
      return y
    }

    const startY = currentYPosition()
    const stopY = elmYPosition(eID)
    const distance = stopY > startY ? stopY - startY : startY - stopY
    if (distance < 100) {
      scrollTo(0, stopY)
      return null
    }
    const speed = 3

    const step = Math.round(distance / 25)
    let leapY = stopY > startY ? startY + step : startY - step
    let timer = 0

    const scrollFunction = () => {

      if (stopY > leapY) {
        window.scrollTo(0, leapY)
        leapY += step
        if (leapY > stopY) {
          leapY = stopY
        }
        if (timer * speed < 30) {
          timer += 1
        }
        this.$timeout(() => {
          scrollFunction()
        }, speed * timer)
      }

    }
    scrollFunction()
    return true
  }

  public simpleScrollTo = (element: Element | string, isNavbar?: boolean, time = 1000) => {
    let scrollTop = $(element).offset().top
    if (isNavbar) {
      scrollTop -= 80 + 32
    }

    $('html, body').animate({
      scrollTop: scrollTop
    }, time)

    $(window).on('wheel', () => {
      $('html, body').stop(true, false)
    })
  }

  public wizardScrollTo = (element: Element, wrapperHeight: number, windowHeight: number) => {
    let scrollTop: number
    if (wrapperHeight < windowHeight) {
      scrollTop = ( $(element).offset().top - windowHeight / 2 + wrapperHeight / 2)
    } else {
      scrollTop = ( $(element).offset().top )
    }

    $('html, body').animate({
      scrollTop: scrollTop
    }, 1000)
    $(window).on('wheel', () => {
      $('html, body').stop(true, false)
    })
  }

}
