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

  /* @ngInject */
  constructor() {
  }

  public onLoadCounter = () => {
    const radius = 28
    const circumference = 2 * radius * Math.PI
    const maxScale = 100

    const currentCount = this.loadingProgress

    this.circleStyle = {
      r: radius + 'px',
      strokeDasharray: circumference + 'px',
    }

    this.circleStyleBackground = {
      r: radius + 'px',
      strokeDasharray: circumference + 'px',
    }

    this.circleProgressStyle = {
      r: radius + 'px',
      strokeDasharray: circumference + 'px',
      strokeDashoffset: -((circumference) * currentCount) / maxScale + 'px'
    }
  }

  $onChanges = () => {
    if (this.fileUploadInfo) {
      this.loadingProgress = Math.floor((this.fileUploadInfo.loaded / this.fileUploadInfo.total) * 100)
    }
    this.onLoadCounter()
  }
}
