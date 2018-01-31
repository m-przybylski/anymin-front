import * as ng from 'angular';

type EventName = 'login' | 'logout' | 'remote-session-deleted' | 'wizard-complete';

export class EventsService {

  private eventScope: ng.IScope;

  static $inject = ['$rootScope'];

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
