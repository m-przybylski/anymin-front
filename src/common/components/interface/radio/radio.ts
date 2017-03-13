(function() {
  /* @ngInject */
  function controller() {

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
    template: require('./radio.jade')(),
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.radio', [
    'pascalprecht.translate'
  ])
    .component('radioBtn', component)

}())



