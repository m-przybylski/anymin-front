export class NavbarAvailbilityAnimation {

  /* @ngInject */
  constructor(private $animateCss: ng.animate.IAnimateCssService) {}

  private createAnimation = (): ng.animate.IAnimateCallbackObject => ({
    enter: (element: JQuery): ng.animate.IAnimateCssRunner => {
      const height: number = (element[0]) ? element[0].offsetHeight : 0

      return this.$animateCss(element, {
        addClass: 'animation-in',
        from: {height: '0px'},
        to: {height: height + 'px'}
      })
    },
    leave: (element: JQuery): ng.animate.IAnimateCssRunner => {
      const height: number = (element[0]) ? element[0].offsetHeight : 0

      return this.$animateCss(element, {
        addClass: 'animation-out',
        to: {height: '0px'},
        from: {height: height + 'px'}
      })
    }
  })

  public static getInstance = (): ($animateCss: ng.animate.IAnimateCssService) => ng.animate.IAnimateCallbackObject => {
    const instance = ($animateCss: ng.animate.IAnimateCssService): ng.animate.IAnimateCallbackObject =>
      new NavbarAvailbilityAnimation($animateCss).createAnimation()
    instance.$inject = ['$animateCss']
    return instance
  }
}
