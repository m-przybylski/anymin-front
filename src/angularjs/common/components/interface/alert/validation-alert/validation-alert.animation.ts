interface IValidationAlertAnimation {
  enter: (element: JQuery) => ng.animate.IAnimateCssRunner,
  leave: (element: JQuery) => ng.animate.IAnimateCssRunner
}

export function ValidationAlertAnimation($animateCss: ng.animate.IAnimateCssService): IValidationAlertAnimation {

  return {
    enter: (element: JQuery): ng.animate.IAnimateCssRunner => {
      const height = String(element[0].offsetHeight)

      return $animateCss(element, {
        addClass: 'animation-in',
        from: {height: '0px'},
        to: {height: height + 'px'},
      })
    },
    leave: (element: JQuery): ng.animate.IAnimateCssRunner => {
      const height = String(element[0].offsetHeight)

      return $animateCss(element, {
        addClass: 'animation-out',
        to: {height: '0px'},
        from: {height: height + 'px'},
      })
    }
  }
}
