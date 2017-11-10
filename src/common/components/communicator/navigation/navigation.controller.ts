import {RatelCallDetails} from 'profitelo-api-ng/model/models'
import {CurrentCall} from '../models/current-call';
import {isPlatformForExpert} from '../../../constants/platform-for-expert.constant'
import {ClientCallService} from '../call-services/client-call.service'
import {ExpertCallService} from '../call-services/expert-call.service'

export interface INavigationComponentBindings {
  isMessenger: boolean
  currentCall: CurrentCall
  isVideo: boolean
}

interface INavigationComponentController extends INavigationComponentBindings {
  areOptions: boolean
  isAudio: boolean
}

export class NavigationComponentController implements ng.IController, INavigationComponentController {

  areOptions = false
  isAudio = true
  isVideo: boolean
  isMessenger: boolean
  currentCall: CurrentCall
  public isPlatformForExpert: boolean = isPlatformForExpert

  /* @ngInject */
  constructor(clientCallService: ClientCallService,
              expertCallService: ExpertCallService) {
    clientCallService.onNewCall(this.clearButtonsState)
    expertCallService.onNewCall(this.clearButtonsState)
    expertCallService.onCallPull(this.clearButtonsState)
  }

  public hangupCall = (): ng.IPromise<RatelCallDetails> =>
    this.currentCall.hangup();

  public animateButtons = (elem: any): void => {
    if (elem.currentTarget.classList.contains('is-active')) {
      elem.currentTarget.classList.add('is-inactive')
      elem.currentTarget.classList.remove('is-active')
    } else {
      elem.currentTarget.classList.remove('is-inactive')
      elem.currentTarget.classList.add('is-active')
    }
  }

  public startAudio = (): void => {
    this.isAudio = true
    this.currentCall.startAudio().then().catch(() => {
      this.isAudio = false
    })
  }

  public stopAudio = (): void => {
    this.isAudio = false
    this.currentCall.stopAudio()
  }

  public stopVideo = (): void => {
    this.isVideo = false
    this.currentCall.stopVideo()
  }

  public startVideo = (elem: Element): void => {
    this.isVideo = true
    this.currentCall.startVideo().catch(() => {
      this.isVideo = false
    })
    this.animateButtons(elem)
  }

  public toggleOptions = (elem: Element): void => {
    this.animateButtons(elem)
    this.areOptions = !this.areOptions
  }

  public toggleMessenger = (elem: Element): void => {
    this.animateButtons(elem)
    this.isMessenger = !this.isMessenger
  }

  private clearButtonsState = (): void => {
    this.isAudio = true
    this.isVideo = false
  }
}
