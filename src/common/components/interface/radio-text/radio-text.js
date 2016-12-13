(function() {
  /* @ngInject */
  function controller() {
    this.isRadioSelected = true

    return this
  }

  const component = {
    transclude: true,
    bindings: {
      label: '@',
      name: '@',
      id: '@',
      labelDescription: '@'
    },
    templateUrl: 'components/interface/radio-text/radio-text.tpl.html',
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.radio-text', [])
    .component('radioBtnText', component)

}())



