(function() {
  /* @ngInject */
  function controller($window, $scope, smoothScrollingService) {

    this.flagController = {
      isShow: false,
      checkScrollWay: null
    }

    /* istanbul ignore next function*/
    angular.element($window).bind('scroll', () => {
      ($window.pageYOffset > this.flagController.checkScrollWay) ? this.flagController.isShow = true : this.flagController.isShow = false
      $scope.$digest()
      this.flagController.checkScrollWay = $window.pageYOffset
    })

    this.goToTop = () => {
      smoothScrollingService.simpleScrollTo('body')
    }

    return this
  }

  let goToTop = {
    templateUrl: 'components/interface/go-to-top/go-to-top.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.go-to-top', [
    'profitelo.services.smooth-scrolling'
  ])
    .component('goToTop', goToTop)

}())
