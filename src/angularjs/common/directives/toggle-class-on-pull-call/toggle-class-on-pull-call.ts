import * as angular from 'angular';
import { ActiveCallBarService } from '../../components/communicator/active-call-bar/active-call-bar.service';
import activeCallBarModule from '../../components/communicator/active-call-bar/active-call-bar';

class ToggleClassOnPullCall implements ng.IDirective<ng.IScope> {
  public static $inject = ['activeCallBarService'];

  public restrict = 'A';

  constructor(private activeCallBarService: ActiveCallBarService) {
  }

  public static getInstance = (): (activeCallBarService: ActiveCallBarService) => ToggleClassOnPullCall => {
    const instance = (activeCallBarService: ActiveCallBarService): ToggleClassOnPullCall =>
      new ToggleClassOnPullCall(activeCallBarService);
    instance.$inject = ['activeCallBarService'];
    return instance;
  }

  public link = (_scope: ng.IScope,
                 element: ng.IRootElementService): void => {
    this.activeCallBarService.showCallBar$.subscribe(() => {
      element.addClass('is-call-pending');
    });

    this.activeCallBarService.hideCallBar$.subscribe(() => {
      element.removeClass('is-call-pending');
    });
  }
}

const toggleClassOnPullCall = angular.module('profitelo.directives.toggle-class-on-pull-call', [
  activeCallBarModule
])
  .directive('toggleClassOnPullCall', ToggleClassOnPullCall.getInstance())
  .name;

export default toggleClassOnPullCall;
