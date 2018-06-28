// tslint:disable:no-mixed-interface
// tslint:disable:readonly-array
// tslint:disable:prefer-method-signature
// tslint:disable:only-arrow-functions
// tslint:disable:no-require-imports
// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
import * as angular from 'angular';
import { TopAlertService } from '../../../services/top-alert/top-alert.service';
import topAlertModule from '../../../services/top-alert/top-alert';
import { IDirective } from 'angular';

export interface IProAlertScope extends ng.IScope {
  alerts: any[];
  destroyAlert: (id: number) => void;
}

function proAlert(topAlertService: TopAlertService): IDirective<ng.IScope> {

  function linkFunction(scope: IProAlertScope, _element: ng.IRootElementService, _attr: ng.IAttributes): void {
    scope.alerts = [];
    const addAlert = (alerts: any[]): void => {
      scope.alerts = alerts;
    };

    scope.destroyAlert = (alertId: number): void => {
      topAlertService.destroyAlert(alertId);
    };

    topAlertService.bindAlert(addAlert);

  }

  return {
    template: require('./pro-alert.html'),
    restrict: 'E',
    replace: true,
    link: linkFunction,
    scope: {}
  };
}

angular.module('profitelo.directives.interface.pro-alert', [
  topAlertModule
])
  .directive('proAlert', ['topAlertService', proAlert]);
