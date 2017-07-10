export class SmoothScrollingService {

  /* @ngInject */
  constructor(private $timeout: ng.ITimeoutService) {
  }

  public scrollTo = (eID: string): void => {

    const currentYPosition = (): number => {
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

    const elmYPosition = (id: string): number => {
      const elm: HTMLElement | null = document.getElementById(id)

      if (!elm) {
        throw new Error(`Elem ${id} not found`)
      }

      let y: number = elm.offsetTop
      let node: HTMLElement = elm
      while (node.offsetParent && node.offsetParent !== document.body) {
        node = <HTMLElement>node.offsetParent
        y += node.offsetTop
      }
      return y
    }

    const startY: number = currentYPosition()
    const stopY: number = elmYPosition(eID)
    const distance: number = stopY > startY ? stopY - startY : startY - stopY
    if (distance < 100) {
      scrollTo(0, stopY)
      return
    }
    const speed: number = 3

    const step: number = Math.round(distance / 25)
    let leapY: number = stopY > startY ? startY + step : startY - step
    let timer: number = 0

    const increaseTimer = (): void => {
      if (timer * speed < 30) {
        timer += 1
      }
      this.$timeout(() => {
        scrollFunction()
      }, speed * timer)
    }

    const scrollFunction = (): void => {

      if (stopY > leapY) {
        window.scrollTo(0, leapY)
        leapY += step
        if (leapY > stopY) {
          leapY = stopY
        }
        increaseTimer()
        return
      } else if (stopY < leapY) {
        window.scrollTo(0, leapY)
        leapY -= step
        if (leapY < stopY) {
          leapY = stopY
        }
        increaseTimer()
        return
      }

    }
    scrollFunction()
    return
  }

  public simpleScrollTo = (element: Element | string, isNavbar?: boolean, time = 1000): void => {
    let scrollTop: number = $(element).offset().top
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

  public wizardScrollTo = (element: Element, wrapperHeight: number, windowHeight: number): void => {
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
