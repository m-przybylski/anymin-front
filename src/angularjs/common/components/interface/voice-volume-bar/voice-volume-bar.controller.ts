// tslint:disable:curly
import { IVoiceVolumeBarComponentBindings } from './voice-volume-bar';
import { VolumeMeterService, IProcessor } from '../../../services/volume-meter/volume-meter.service';

// tslint:disable:member-ordering
export class VoiceVolumeBarComponentController implements IVoiceVolumeBarComponentBindings {

  private static readonly width = 1000;
  private static readonly height = 200;
  private static readonly fillBarColor = '#1DCE6C';
  private static readonly fillBarMultiplier = 1.4;
  private audioContext: AudioContext;
  private meter: IProcessor;
  private canvasContext: CanvasRenderingContext2D | null = null;
  private rafID: number;
  private mediaStreamSource: MediaStreamAudioSourceNode;
  public stream?: MediaStream;

  public static $inject = ['volumeMeter', '$window', '$element'];

    constructor(private volumeMeter: VolumeMeterService,
              private $window: ng.IWindowService,
              private $element: JQuery) {
  }

  public $onInit = (): void => {
    if (this.$element.find('#meter')) {
      const canvasElement: HTMLCanvasElement = <HTMLCanvasElement>this.$element.find('#meter')[0];
      this.canvasContext = canvasElement.getContext('2d');
      this.$window.AudioContext = this.$window.AudioContext || this.$window.webkitAudioContext;
      this.audioContext = new AudioContext();

      if (this.stream) {
        this.setStream(this.stream);
      }
    }
  }

  public $onDestroy = (): void => {
    // FIXME
    // tslint:disable-next-line:no-floating-promises
    if (this.audioContext) this.audioContext.close();
  }

  private setStream = (stream: MediaStream): void => {
    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    this.meter = this.volumeMeter.createAudioMeter(this.audioContext);
    this.mediaStreamSource.connect(this.meter);

    this.drawLoop();
  }

  private drawLoop = (): void => {
    if (this.canvasContext) {
      this.canvasContext.clearRect(0, 0, VoiceVolumeBarComponentController.width,
        VoiceVolumeBarComponentController.height);
      this.canvasContext.fillStyle = VoiceVolumeBarComponentController.fillBarColor;
      if (this.meter.volume)
        this.canvasContext.fillRect(0, 0, this.meter.volume * VoiceVolumeBarComponentController.width *
          VoiceVolumeBarComponentController.fillBarMultiplier, VoiceVolumeBarComponentController.height);
      this.rafID = this.$window.requestAnimationFrame(this.drawLoop);
    }
  }
}
