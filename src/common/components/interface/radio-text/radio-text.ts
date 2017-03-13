(function() {
  /* @ngInject */
  function controller() {
    this.isCollapsed = true

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
    },
    template: require('./radio-text.jade')(),
    controllerAs: '$ctrl',
    controller: controller
  }


  angular.module('profitelo.components.interface.radio-text', [])
    .component('radioBtnText', component)

}())



