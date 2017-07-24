import * as angular from 'angular'
import {IPinVerificationComponentBindings} from './pin-verification';

export class PinVerificationComponentController implements ng.IController, IPinVerificationComponentBindings {

  public onSendPinAgain: () => void
  public onCompletePinInputs: (token: string, callback: () => void) => void
  public isButtonDisable = false
  public counter: number = 0
  public pinInputModels: string[] = []
  public isPinInCorrect = false

  /* @ngInject */
  constructor(private $interval: ng.IIntervalService) {

  }

  public sendPinAgain = (): void => {
    this.isButtonDisable = true
    this.blockSendButtonForTime(30)
    this.onSendPinAgain()
  }

  public onInputChange = (): void => {
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

  private onWrongPrefix = (): void => {
    this.isPinInCorrect = true
  }

  private checkAreInputsFilled = (arrayOfInputs: Array<string>): boolean =>
    (arrayOfInputs.every((input: string, _index: number, array: Array<string>) => {
      return array.length === 4 && angular.isDefined(input) && !!input
    }))
}
