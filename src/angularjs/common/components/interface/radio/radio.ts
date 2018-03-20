(function (): void {

  function controller(): void {

    return this;
  }

  const component = {
    bindings: {
      label: '@',
      inputName: '@',
      inputId: '@',
      ngModel: '=?',
      onClick: '=?',
      value: '@'
    },
    template: require('./radio.html'),
    controllerAs: '$ctrl',
    controller: [controller]
  };

  angular.module('profitelo.components.interface.radio', [
    'pascalprecht.translate'
  ])
    .component('radioBtn', component);

}());
