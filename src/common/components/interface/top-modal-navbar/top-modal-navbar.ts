(function() {
  /* @ngInject */
  function controller($window, $scope, $state) {
    this.isHidden = false
    let checkScrollWay = null

    const onClose = () => {
      if (angular.isFunction(this.onClose)) {
        this.onClose()
      } else {
        $state.go('app.dashboard.client.favourites')
      }
    }

    this.onLogoClick = () => {
      $state.go('app.home')
      onClose()
    }

    this.onCloseClick = () => {
      onClose()
    }

    /* istanbul ignore next function*/
    angular.element($window).bind('scroll', () => {
      this.isHidden = ($window.pageYOffset > checkScrollWay)

      $scope.$apply()
      checkScrollWay = $window.pageYOffset
    })

    return this
  }

  const component = {
    templateUrl: 'components/interface/top-modal-navbar/top-modal-navbar.tpl.html',
    controller: controller,
    bindings: {
      title:  '@',
      onClose: '<'
    }
  }


  angular.module('profitelo.components.interface.top-modal-navbar', [
  ])
    .component('topModalNavbar', component)

}())
