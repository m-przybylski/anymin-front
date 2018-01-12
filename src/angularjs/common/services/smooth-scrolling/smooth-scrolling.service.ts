export class SmoothScrollingService {

  private static readonly dividerOnHalf: number = 2

  static $inject = ['$timeout'];

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
    const minimumDistanceToScroll: number = 100
    if (distance < minimumDistanceToScroll) {
      scrollTo(0, stopY)
      return
    }
    const speed: number = 3
    const distanceDivider: number = 25
    const step: number = Math.round(distance / distanceDivider)
    let leapY: number = stopY > startY ? startY + step : startY - step
    let timer: number = 0

    const increaseTimer = (): void => {
      const maxSpeed: number = 30
      if (timer * speed < maxSpeed) {
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
    const navbarHeight: number = 80
    const topPaddingHeight: number = 32
    let scrollTop: number = $(element).offset().top
    if (isNavbar) {
      scrollTop -= navbarHeight + topPaddingHeight
    }

    $('html, body').animate({
      scrollTop
    }, time)

    $(window).on('wheel', () => {
      $('html, body').stop(true, false)
    })
  }

  public wizardScrollTo = (element: Element, wrapperHeight: number, windowHeight: number): void => {
    const scrollAnimationTime: number = 1000
    let scrollTop: number
    if (wrapperHeight < windowHeight) {
      scrollTop = ( $(element).offset().top - windowHeight / SmoothScrollingService.dividerOnHalf +
        wrapperHeight / SmoothScrollingService.dividerOnHalf)
    } else {
      scrollTop = ( $(element).offset().top )
    }

    $('html, body').animate({
      scrollTop
    }, scrollAnimationTime)
    $(window).on('wheel', () => {
      $('html, body').stop(true, false)
    })
  }

}
