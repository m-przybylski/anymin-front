import {IOutputComponentBindings} from './output'

interface ITimeSecondsCounter {
  day: number
  min: number
}
export class OutputComponentController implements IOutputComponentBindings {
  public id: string
  public labelText: string
  public ngModel: boolean
  public value: number = 1
  public consultationCost: number = 1
  public time: number = 0
  public timecounter: string = ''
  public callback: (minTime: boolean) => void

  public hours: number = 0
  public minutes: number = 0
  public seconds: number = 0

  private timeSecondsCounter: ITimeSecondsCounter= {
    day: 3600,
    min: 60
  }

  /* @ngInject */
  constructor() {}

  $onChanges = () => {
    const digitValue = this.value.toString().replace(',', '.')
    this.value = Number(digitValue)
    this.moneyConverterToTime()
  }

  public minTimeRecharge = (minTimeValid: boolean): void => {
    this.callback(minTimeValid)
  }

  public moneyConverterToTime = () => {
    this.time = this.value / this.consultationCost * 60
    this.hours = Math.floor(this.time / this.timeSecondsCounter.day)
    this.time -= this.hours * this.timeSecondsCounter.day

    this.minutes = Math.floor(this.time / this.timeSecondsCounter.min)
    this.time -= this.minutes * this.timeSecondsCounter.min

    this.seconds = parseInt((this.time % this.timeSecondsCounter.min).toString(), 10)

    if (this.value !== 0) {
      this.timecounter = this.hours + ':' + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds)
    } else {
      this.timecounter = 'COMMUNICATOR.MODALS.PRECALL.LIMIT.NONE'
    }

    this.minTimeRecharge((!(this.hours < 1 && this.minutes < 2)) || this.value === 0)
  }

}
