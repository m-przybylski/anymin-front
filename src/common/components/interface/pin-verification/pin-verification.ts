import * as angular from 'angular'
import '../../../directives/interface/focus-next/focus-next'
import '../../../directives/interface/pro-input/pro-input'

export interface IPinVerificationComponentBindings {
  onSendPinAgain: () => void
  onCompletePinInputs: (token: string, callback: () => void) => void
}

export class PinVerificationComponentController implements ng.IController, IPinVerificationComponentBindings {

  public onSendPinAgain: () => void
  public onCompletePinInputs: (token: string, callback: () => void) => void
  public isButtonDisable = false
  public counter: number = 0
  public pinInputModels = []
  public isPinInCorrect = false

  /* @ngInject */
  constructor(private $interval: ng.IIntervalService) {

  }

  public sendPinAgain = () => {
    this.isButtonDisable = true
    this.blockSendButtonForTime(30)
    this.onSendPinAgain()
  }

  public onInputChange = () => {
    if (this.checkAreInputsFilled(this.pinInputModels)) {
      this.isPinInCorrect = false
      this.onCompletePinInputs(this.pinInputModels.join(''), this.onWrongPrefix)
    } else {
      if (this.pinInputModels.length === 4) {
        this.isPinInCorrect = true
      }
    }
  }

  private blockSendButtonForTime = (seconds: number): void => {
    this.counter = seconds
    this.$interval(() => {
      this.counter--
      if (this.counter === 0) {
        this.isButtonDisable = false
      }
    }, 1000, seconds)
  }

  private onWrongPrefix = () => {
    this.isPinInCorrect = true
  }

  private checkAreInputsFilled = (arrayOfInputs: Array<string>): boolean =>
    (arrayOfInputs.every((input: string, _index: number, array: Array<string>) => {
      return array.length === 4 && angular.isDefined(input) && !!input
    }))
}

class PinVerificationComponent implements ng.IComponentOptions {

  controller: ng.Injectable<ng.IControllerConstructor> = PinVerificationComponentController
  template = require('./pin-verification.pug')()
  bindings: {[boundProperty: string]: string} = {
    onSendPinAgain: '<',
    onCompletePinInputs: '<'
  }
}

angular.module('profitelo.components.interface.pin-verification', [
  'pascalprecht.translate',
  'profitelo.directives.interface.focus-next',
  'profitelo.directives.interface.pro-input'
])
  .component('pinVerification', new PinVerificationComponent())
