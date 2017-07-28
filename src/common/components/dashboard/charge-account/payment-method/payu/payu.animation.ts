interface IPayuAnimation {
  enter: (element: JQuery) => ng.animate.IAnimateCssRunner,
  leave: (element: JQuery) => ng.animate.IAnimateCssRunner
}

/* @ngInject */
export function PayuAnimation($animateCss: ng.animate.IAnimateCssService): IPayuAnimation {

  return {
    enter: (element: JQuery): ng.animate.IAnimateCssRunner => {
      const height = element[0].offsetHeight

      return $animateCss(element, {
        addClass: 'animation-in',
        from: {height: '0px'},
        to: {height: height + 'px'},
      })
    },
    leave: (element: JQuery): ng.animate.IAnimateCssRunner => {
      const height = element[0].offsetHeight

      return $animateCss(element, {
        addClass: 'animation-out',
        to: {height: '0px'},
        from: {height: height + 'px'},
      })
    }
  }
}
