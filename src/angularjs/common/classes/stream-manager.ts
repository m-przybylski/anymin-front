import { MediaStreamConstraintsWrapper } from './media-stream-constraints-wrapper';
import { NavigatorWrapper } from './navigator-wrapper/navigator-wrapper';

// tslint:disable:member-ordering
export class StreamManager {

  private isAudio: boolean;
  private navigator: NavigatorWrapper;

  public static $inject = ['stream', 'constraints'];

  constructor(private stream: MediaStream, private constraints: MediaStreamConstraintsWrapper) {
    this.navigator = new NavigatorWrapper();
    this.isAudio = true;
  }

  public addAudio = (): Promise<MediaStream> => {
    this.constraints.addAudio();
    this.isAudio = true;
    return this.navigator.getUserMediaStream(this.constraints.getConstraints()).then((stream) => {
      this.stream = stream;
      return stream;
    });
  }

  public addVideo = (): Promise<MediaStream> => {
    this.constraints.addVideo();
    return this.navigator.getUserMediaStream(this.constraints.getConstraints()).then((stream) => {
      if (!this.isAudio) {
        this.disableAudioTracks(stream);
      }
      this.stream = stream;
      return stream;
    });
  }

  public removeAudio = (): MediaStream => {
    this.isAudio = false;
    this.disableAudioTracks(this.stream);
    return this.stream;
  }

  public removeVideo = (): Promise<MediaStream> => {
    this.constraints.removeVideo();
    return this.navigator.getUserMediaStream(this.constraints.getConstraints()).then((stream) => {
      if (!this.isAudio) {
        this.disableAudioTracks(stream);
      }
      this.stream = stream;
      return stream;
    });
  }

  public changeCamera = (): Promise<MediaStream> => {
    this.constraints.toggleCamera();
    return this.navigator.getUserMediaStream(this.constraints.getConstraints()).then((stream) => {
      if (!this.isAudio) {
        this.disableAudioTracks(stream);
      }
      this.stream = stream;
      return stream;
    });
  }

  private disableAudioTracks = (stream: MediaStream): void => {
    stream.getAudioTracks().forEach(t => { t.enabled = false; });
    stream.getAudioTracks().forEach(t => { t.stop(); });
  }

}
