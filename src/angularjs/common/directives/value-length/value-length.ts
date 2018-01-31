import * as angular from 'angular';

interface IValueLengthScope extends ng.IScope {
  valueLength: (inputValueLength: number) => void;
  inputValue: string;
}

class ValueLength implements ng.IDirective<ng.IScope> {

  public restrict: string = 'A';
  public scope = {
    valueLength: '=?',
    inputValue: '=?'
  };

  static $inject = [];

  constructor() {
  }

  public link = (scope: IValueLengthScope,
                 element: ng.IRootElementService): void => {

    if (scope.inputValue)
      scope.valueLength(scope.inputValue.length);

    element.bind('input', () => {
      scope.valueLength(element.val().length);
    });

    scope.$on('$destroy', (): void => {
      element.unbind('input');
    });

  }

  public static getInstance = (): () => ValueLength => {
    const instance = (): ValueLength =>
      new ValueLength();
    instance.$inject = [];
    return instance;
  }
}

const valueLength = angular.module('profitelo.directives.value-length', [])
  .directive('valueLength', ValueLength.getInstance())
    .name;

export default valueLength;
