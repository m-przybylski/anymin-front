import * as angular from 'angular'
import {ExpertCallService} from '../../components/communicator/call-services/expert-call.service'
import {EventsService} from '../../services/events/events.service'

class ToggleClassOnPullCall implements ng.IDirective<ng.IScope> {
  public restrict: string = 'A'

  /* @ngInject */
  constructor(private expertCallService: ExpertCallService,
              private eventsService: EventsService) {
  }

  public link = (_scope: ng.IScope,
                 element: ng.IRootElementService): void => {
    this.expertCallService.onCallPull(() => {
      element.toggleClass('is-call-pending')
    })

    this.expertCallService.onCallEnd(() => {
      element.removeClass('is-call-pending')
    })

    this.expertCallService.onCallActive(() => {
      element.addClass('is-call-pending')
    })

    this.expertCallService.onCallTaken(() => {
      element.toggleClass('is-call-pending')
    })

    this.eventsService.on('logout', () =>  element.removeClass('is-call-pending'))
  }

  public static getInstance = (): (expertCallService: ExpertCallService,
                                   eventsService: EventsService) => ToggleClassOnPullCall => {
    const instance = (expertCallService: ExpertCallService, eventsService: EventsService): ToggleClassOnPullCall =>
      new ToggleClassOnPullCall(expertCallService, eventsService)
    instance.$inject = ['expertCallService', 'eventsService']
    return instance
  }
}

const toggleClassOnPullCall =  angular.module('profitelo.directives.toggle-class-on-pull-call', [])
.directive('toggleClassOnPullCall', ToggleClassOnPullCall.getInstance())
  .name

export default toggleClassOnPullCall
