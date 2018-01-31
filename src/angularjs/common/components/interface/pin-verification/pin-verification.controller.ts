import * as angular from 'angular';
import { IPinVerificationComponentBindings } from './pin-verification';

// tslint:disable:member-ordering
export class PinVerificationComponentController implements ng.IController, IPinVerificationComponentBindings {

  public onSendPinAgain: () => void;
  public onCompletePinInputs: (token: string, callback: () => void) => void;
  public isButtonDisable = false;
  public counter = 0;
  public pinInputModels: string[] = [];
  public isPinInCorrect = false;

  private static readonly disableSendButtonInSeconds = 30;
  private static readonly validPinLength = 4;

  public static $inject = ['$interval'];

    constructor(private $interval: ng.IIntervalService) {

  }

  public sendPinAgain = (): void => {
    this.isButtonDisable = true;
    this.blockSendButtonForTime(PinVerificationComponentController.disableSendButtonInSeconds);
    this.onSendPinAgain();
  }

  public onInputChange = (): void => {
    if (this.checkAreInputsFilled(this.pinInputModels)) {
      this.isPinInCorrect = false;
      this.onCompletePinInputs(this.pinInputModels.join(''), this.onWrongPrefix);
    } else {
      if (this.pinInputModels.length === PinVerificationComponentController.validPinLength) {
        this.isPinInCorrect = true;
      }
    }
  }

  private blockSendButtonForTime = (seconds: number): void => {
    const intervalTime = 1000;
    this.counter = seconds;
    this.$interval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.isButtonDisable = false;
      }
    }, intervalTime, seconds);
  }

  private onWrongPrefix = (): void => {
    this.isPinInCorrect = true;
  }

  private checkAreInputsFilled = (arrayOfInputs: string[]): boolean =>
    (arrayOfInputs.every((input: string, _index: number, array: string[]) =>
      array.length === PinVerificationComponentController.validPinLength && angular.isDefined(input) && !!input))
}
