import * as angular from 'angular'
import {IWindowService} from '../../../services/window/window.service'

/* @ngInject */
function controller($window: IWindowService, $scope: ng.IScope, $state: ng.ui.IStateService): void {
  this.isHidden = false
  let checkScrollWay: number = 0

  const onClose = (): void => {
    if (angular.isFunction(this.onClose)) {
      this.onClose()
    } else {
      $state.go('app.dashboard.client.favourites')
    }
  }

  this.onCloseClick = (): void => {
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
  template: require('./top-modal-navbar.pug'),
  controller,
  bindings: {
    onClose: '<'
  }
}

angular.module('profitelo.components.interface.top-modal-navbar', [])
  .component('topModalNavbar', component)
