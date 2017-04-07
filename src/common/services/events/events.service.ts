import * as ng from 'angular'

type EventName = 'login' | 'logout' |'wizard-complete'

export class EventsService {

  private eventScope: ng.IScope

  /* @ngInject */
  constructor($rootScope: ng.IRootScopeService) {
    this.eventScope = $rootScope.$new()
  }

  public emit = (eventName: EventName) => {
    this.eventScope.$emit(eventName)
  }

  public on = (eventName: EventName, callback: () => void, scope?: ng.IScope) => {
    const eventHandler = this.eventScope.$on(eventName, callback)
    if (scope) {
      scope.$on('$destroy', eventHandler)
    }
  }
}
