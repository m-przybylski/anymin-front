import { NavigatorWrapper } from './models/navigator-wrapper';
// tslint:disable-next-line:import-blacklist
import { cloneDeep } from 'lodash';

export class MediaStreamVideoConstraintsWrapper {
  private actualConstraints: MediaStreamConstraints;
  private navigatorWrapper: NavigatorWrapper;
  private currentCamera: string = NavigatorWrapper.frontCamera;
  private currentCameraIndex = 0;

  constructor() {
    this.actualConstraints = cloneDeep(NavigatorWrapper.getVideoConstraints());
    this.navigatorWrapper = new NavigatorWrapper();
  }

  public toggleCamera = (): MediaStreamConstraints => {
    this.currentCameraIndex = this.nextCameraIndex(this.currentCameraIndex);
    this.currentCamera =
      this.currentCamera === NavigatorWrapper.frontCamera ? NavigatorWrapper.backCamera : NavigatorWrapper.frontCamera;

    this.actualConstraints.video = cloneDeep(
      this.navigatorWrapper.getAllConstraintsWithToggledCamera(this.currentCamera, this.currentCameraIndex).video,
    );

    return this.actualConstraints;
  };

  public getConstraints = (): MediaStreamConstraints => this.actualConstraints;

  private nextCameraIndex(currentIndex: number): number {
    const curIndex = currentIndex + 1;

    return curIndex >= this.navigatorWrapper.getVideoInputDevices().length ? 0 : curIndex;
  }
}
