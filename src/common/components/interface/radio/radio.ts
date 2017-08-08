(function(): void {
  /* @ngInject */
  function controller(): void {

    return this
  }

  const component = {
    bindings: {
      label: '@',
      name: '@',
      id: '@',
      ngModel: '=?',
      value: '@'
    },
    template: require('./radio.pug')(),
    controllerAs: '$ctrl',
    controller
  }

  angular.module('profitelo.components.interface.radio', [
    'pascalprecht.translate'
  ])
    .component('radioBtn', component)

}())
