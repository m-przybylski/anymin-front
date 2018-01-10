import {ILoaderComponentBindings} from './loader'

interface ICircleStyle {
  r: string,
  strokeDasharray: string,
  strokeDashoffset: string
}

interface ICircleBackgroundStyle {
  r: string,
  strokeDasharray: string
}

export class LoaderComponentController implements ng.IController, ILoaderComponentBindings {
  public loadingProgress: number = 0
  public fileUploadInfo: any

  public circleStyle: ICircleBackgroundStyle
  public circleStyleBackground: ICircleBackgroundStyle
  public circleProgressStyle: ICircleStyle
  public fileUploadError: boolean = false

  private static readonly multiplierByTwo: number = 2
  private static readonly loadingProgressMultiplier: number = 100

  constructor() {
  }

  public onLoadCounter = (): void => {
    const radius = 28
    const circumference = LoaderComponentController.multiplierByTwo * radius * Math.PI
    const maxScale = 100

    const currentCount = this.loadingProgress

    this.circleStyle = {
      r: String(radius) + 'px',
      strokeDasharray: String(circumference) + 'px',
    }

    this.circleStyleBackground = {
      r: String(radius) + 'px',
      strokeDasharray: String(circumference) + 'px',
    }

    this.circleProgressStyle = {
      r: String(radius) + 'px',
      strokeDasharray: String(circumference) + 'px',
      strokeDashoffset: String(-((circumference) * currentCount) / maxScale) + 'px'
    }
  }

  $onChanges = (): void => {
    if (this.fileUploadInfo) {
      this.loadingProgress = Math.floor(
        (this.fileUploadInfo.loaded / this.fileUploadInfo.total) * LoaderComponentController.loadingProgressMultiplier)
    }
    this.onLoadCounter()
  }
}
