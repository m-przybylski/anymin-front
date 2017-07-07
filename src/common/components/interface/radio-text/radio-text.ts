import * as angular from 'angular'
import textareaModule from '../textarea/textarea'

(function () {
  /* @ngInject */
  function controller() {
    this.isCollapsed = false

    this.onClick = () => {
      if (this.ngModel) {
        this.isCollapsed = true
      } else {
        this.isCollapsed = false
      }
    }

    return this
  }

  const component = {
    transclude: true,
    bindings: {
      label: '@',
      name: '@',
      id: '@',
      labelDescription: '@',
      ngModel: '=',
      value: '@',
      isDescriptive: '<'
    },
    template: require('./radio-text.pug')(),
    controllerAs: '$ctrl',
    controller: controller
  }

  angular.module('profitelo.components.interface.radio-text', [
    textareaModule
  ])
  .component('radioBtnText', component)
}())
