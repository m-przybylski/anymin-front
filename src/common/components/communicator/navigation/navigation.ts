import * as angular from 'angular'
import {CallService} from '../call.service'
import './navigation.sass'

export interface INavigationComponentBindings {
  isVideo: boolean
  isMessenger: boolean
}

interface INavigationComponentController extends INavigationComponentBindings {
  hangupCall: () => void
  areOptions: boolean
  isAudio: boolean
}

export class NavigationComponentController implements ng.IController, INavigationComponentController {

  areOptions = false
  isAudio = true
  isVideo: boolean
  isMessenger: boolean
  hangupCall: () => void

  /* @ngInject */
  constructor(private callService: CallService) {
    this.hangupCall = callService.hangupCall
  }

  public animateButtons = (elem: any) => {
    if (elem.currentTarget.classList.contains('is-active')) {
      elem.currentTarget.classList.add('is-inactive')
      elem.currentTarget.classList.remove('is-active')
    } else {
      elem.currentTarget.classList.remove('is-inactive')
      elem.currentTarget.classList.add('is-active')
    }
  }

  public startAudio = () => {
    this.callService.startAudio()
    this.isAudio = true
  }

  public stopAudio = () => {
    this.callService.stopAudio()
    this.isAudio = false
  }

  public stopVideo = () => {
    this.callService.stopVideo()
    this.isVideo = false
  }

  public startVideo = (elem: Element) => {
    this.callService.startVideo()
    this.isVideo = true
    this.animateButtons(elem)
  }

  public toggleOptions = (elem: Element) => {
    this.animateButtons(elem)
    this.areOptions = !this.areOptions
  }

  public toggleMessenger = (elem: Element) => {
    this.animateButtons(elem)
    this.isMessenger = !this.isMessenger
  }

}

class NavigationComponent implements ng.IComponentOptions {
  controller: ng.Injectable<ng.IControllerConstructor> = NavigationComponentController
  template = require('./navigation.pug')()
  bindings: { [boundProperty: string]: string } = {
    isVideo: '=',
    isMessenger: '='
  }
}

angular.module('profitelo.components.communicator.navigation', [
  'pascalprecht.translate'
])
.component('communicatorNav', new NavigationComponent)
