(function() {
  /* @ngInject */
  function controller() {

    return this
  }

  const component = {
    bindings: {
      label: '@',
      name: '@',
      id: '@'
    },
    templateUrl: 'components/interface/radio/radio.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.radio', [])
    .component('radioBtn', component)

}())



