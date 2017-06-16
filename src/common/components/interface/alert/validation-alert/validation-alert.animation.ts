/* @ngInject */
export function ValidationAlertAnimation($animateCss: ng.animate.IAnimateCssService) {

  return {
    enter: (element: JQuery) => {
      const height = element[0].offsetHeight

      return $animateCss(element, {
        addClass: 'animation-in',
        from: {height: '0px'},
        to: {height: height + 'px'},
      })
    },
    leave: (element: JQuery) => {
      const height = element[0].offsetHeight

      return $animateCss(element, {
        addClass: 'animation-out',
        to: {height: '0px'},
        from: {height: height + 'px'},
      })
    }
  }
}
