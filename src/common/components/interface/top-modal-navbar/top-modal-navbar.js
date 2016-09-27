(function() {
  /* @ngInject */
  function topModalNavController($window, $scope) {
    this.isHided = false
    let checkScrollWay = null

    /* istanbul ignore next function*/
    angular.element($window).bind('scroll', () => {
      ($window.pageYOffset > checkScrollWay) ? this.isHided = true : this.isHided = false

      $scope.$apply()
      checkScrollWay = $window.pageYOffset
    })

    return this
  }

  let topModalNavbar = {
    templateUrl: 'components/interface/top-modal-navbar/top-modal-navbar.tpl.html',
    controllerAs: '$ctrl',
    controller: topModalNavController,
    replace: true,
    transclude: true,
    bindings: {
      title:  '@'
    }
  }


  angular.module('profitelo.components.interface.top-modal-navbar', [
  ])
    .component('topModalNavbar', topModalNavbar)

}())
