export interface IProcessor extends ScriptProcessorNode {
  clipping?: boolean;
  lastClip?: number;
  volume?: number;
  clipLevel?: number;
  averaging?: number;
  clipLag?: number;
}

// tslint:disable:member-ordering
export class VolumeMeterService {

  public static $inject = ['$window'];
  private static readonly defaultClipLevel = 0.98;
  private static readonly defaultAveraging = 0.95;
  private static readonly defaultClipLag = 750;
  private static readonly bufferSize = 1024;

  public constructor(private $window: ng.IWindowService) {
  }

  public createAudioMeter = (audioContext: AudioContext,
                             clipLevel?: number, averaging?: number, clipLag?: number): IProcessor => {
    const processor: IProcessor = audioContext.createScriptProcessor(VolumeMeterService.bufferSize);
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || VolumeMeterService.defaultClipLevel;
    processor.averaging = averaging || VolumeMeterService.defaultAveraging;
    processor.clipLag = clipLag || VolumeMeterService.defaultClipLag;
    processor.onaudioprocess = (event: AudioProcessingEvent): void => this.volumeAudioProcess(processor, event);
    processor.connect(audioContext.destination);

    return processor;
  }

  private volumeAudioProcess = (processor: IProcessor, event: AudioProcessingEvent): void => {
    const buffer: Float32Array = event.inputBuffer.getChannelData(0);
    const bufferLength = buffer.length;
    let sum = 0;
    buffer.forEach((singleRecord: number) => {
      if (processor.clipLevel && Math.abs(singleRecord) >= processor.clipLevel) {
        processor.clipping = true;
        processor.lastClip = this.$window.performance.now();
      }
      sum += singleRecord * singleRecord;
    });
    if (typeof processor.volume !== 'undefined' && processor.averaging) {
      const squareRootOfSum = Math.sqrt(sum / bufferLength);
      processor.volume = Math.max(squareRootOfSum, processor.volume * processor.averaging);
    }
  }
}
