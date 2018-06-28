// tslint:disable:readonly-array
// tslint:disable:strict-boolean-expressions
import * as ng from 'angular';

type EventName = 'login' | 'logout' | 'remote-session-deleted' | 'wizard-complete';

// tslint:disable:member-ordering
export class EventsService {

  public static $inject = ['$rootScope'];

  private eventScope: ng.IScope;

    constructor($rootScope: ng.IRootScopeService) {
    this.eventScope = $rootScope.$new();
  }

  public emit = (eventName: EventName): void => {
    this.eventScope.$emit(eventName);
  }

  public on = (eventName: EventName, callback: () => void, scope?: ng.IScope): void => {
    const eventHandler = this.eventScope.$on(eventName, callback);
    if (scope) {
      scope.$on('$destroy', eventHandler);
    }
  }
}
