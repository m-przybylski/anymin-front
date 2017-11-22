import * as angular from 'angular'
import {ExpertCallService} from '../../components/communicator/call-services/expert-call.service'
import {CurrentExpertCall} from '../../components/communicator/models/current-expert-call'

class ToggleClassOnPullCallClass implements ng.IDirective<ng.IScope, ng.IScope> {
  public restrict: string = 'A'

  /* @ngInject */
  constructor(private expertCallService: ExpertCallService) {
  }

  public link = (_scope: ng.IScope,
                 element: ng.IRootElementService): void => {
    this.expertCallService.onCallPull((currentExpertCall: CurrentExpertCall) => {
      element.toggleClass('is-call-pending')
      currentExpertCall.onEnd(() => {
        element.removeClass('is-call-pending')
      })
    })

    this.expertCallService.onCallTaken(() => {
      element.toggleClass('is-call-pending')
    })
  }

  public static getInstance = (): (expertCallService: ExpertCallService) => ToggleClassOnPullCallClass => {
    const instance = (expertCallService: ExpertCallService): ToggleClassOnPullCallClass =>
      new ToggleClassOnPullCallClass(expertCallService)
    instance.$inject = ['expertCallService']
    return instance
  }
}

const toggleClassOnPullCall =  angular.module('profitelo.directives.toggle-class-on-pull-call', [])
.directive('toggleClassOnPullCall', ToggleClassOnPullCallClass.getInstance())
  .name

export default toggleClassOnPullCall
