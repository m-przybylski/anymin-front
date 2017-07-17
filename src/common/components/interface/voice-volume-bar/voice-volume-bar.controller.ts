import {IVoiceVolumeBarComponentBindings} from './voice-volume-bar'
import {VolumeMeterService, IProcessor} from '../../../services/volume-meter/volume-meter.service'
export class VoiceVolumeBarComponentController implements IVoiceVolumeBarComponentBindings {

  private static readonly width: number = 1000
  private static readonly height: number = 200
  private static readonly fillBarColor: string = '#1DCE6C'
  private static readonly fillBarMultiplier: number = 1.4
  private audioContext: AudioContext
  private meter: IProcessor
  private canvasContext: CanvasRenderingContext2D | null = null
  private rafID: number
  private mediaStreamSource: MediaStreamAudioSourceNode
  public stream?: MediaStream

  /* @ngInject */
  constructor(private volumeMeter: VolumeMeterService,
              private $window: ng.IWindowService,
              private $element: JQuery) {
  }

  $onInit = () => {
    if (this.$element.find('#meter')) {
      const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>this.$element.find('#meter')[0]
      this.canvasContext = canvasElement.getContext('2d')
      this.$window.AudioContext = this.$window.AudioContext || this.$window.webkitAudioContext
      this.audioContext = new AudioContext()

      if (this.stream) {
        this.setStream(this.stream)
      }
    }
  }

  private setStream = (stream: MediaStream): void => {
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream)
    this.meter = this.volumeMeter.createAudioMeter(this.audioContext)
    this.mediaStreamSource.connect(this.meter)

    this.drawLoop()
  }

  private drawLoop = () => {
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, VoiceVolumeBarComponentController.width,
        VoiceVolumeBarComponentController.height)
      this.canvasContext.fillStyle = VoiceVolumeBarComponentController.fillBarColor
      if (this.meter.volume)
        this.canvasContext.fillRect(0, 0, this.meter.volume * VoiceVolumeBarComponentController.width *
          VoiceVolumeBarComponentController.fillBarMultiplier, VoiceVolumeBarComponentController.height)
      this.rafID = this.$window.requestAnimationFrame(this.drawLoop)
    }
  }
}
