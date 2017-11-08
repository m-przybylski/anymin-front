import {ExpertCallService} from '../call-services/expert-call.service'
import {CurrentExpertCall} from '../models/current-expert-call'

export class ActiveCallBarComponentController implements ng.IController {

  public isCallPendingOnOtherDevice: boolean

  /* @ngInject */
  constructor(private expertCallService: ExpertCallService) {
    expertCallService.onCallPull(this.onPullCall)
    expertCallService.onCallTaken(this.onCallTaken)
  }

  private onPullCall = (currentExpertCall: CurrentExpertCall): void => {
    this.isCallPendingOnOtherDevice = false
    currentExpertCall.onEnd(() => {
      this.isCallPendingOnOtherDevice = false
    })
  }

  private onCallTaken = (): void => {
    this.isCallPendingOnOtherDevice = true
  }

  public pullCall = (): void => {
    this.expertCallService.pullCall()
  }
}
