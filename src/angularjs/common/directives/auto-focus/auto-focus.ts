import * as angular from 'angular';

// tslint:disable:member-ordering
class AutoFocus implements ng.IDirective<ng.IScope> {
  public restrict = 'A';

  public static $inject = [];

  constructor() {
  }

  public link = (_scope: ng.IScope, element: ng.IRootElementService, attr: ng.IAttributes,
                 $log: ng.ILogService): void => {

    const input = element.find('input');
    const textarea = element.find('textarea');

    if (input[0]) {
      if ('autoFocus' in attr.$attr) {
        input[0].focus();
      }
    } else if (textarea[0]) {
      if ('autoFocus' in attr.$attr) {
        textarea[0].focus();
      }
    } else {
      $log.error('Can not find element to focus');
    }
  }

  public static getInstance = (): () => AutoFocus => {
    const instance = (): AutoFocus =>
      new AutoFocus();
    instance.$inject = [];
    return instance;
  }
}

const autoFocus = angular.module('profitelo.directives.auto-focus', [])
  .directive('autoFocus', AutoFocus.getInstance())
  .name;

export default autoFocus;
