// tslint:disable:no-invalid-this
import * as angular from 'angular';
import textareaModule from '../textarea/textarea';

(function (): void {

  function controller(): void {
    this.isCollapsed = false;

    this.onClick = (): void => {
      if (this.ngModel) {
        this.isCollapsed = true;
      } else {
        this.isCollapsed = false;
      }
    };

    return this;
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
    template: require('./radio-text.html'),
    controllerAs: '$ctrl',
    controller: [controller]
  };

  angular.module('profitelo.components.interface.radio-text', [
    textareaModule
  ])
  .component('radioBtnText', component);
}());
