// tslint:disable:no-empty
import { Component, Input } from '@angular/core';
import { Animations } from '@anymind-ng/components';

export enum PreloaderContentSizeEnum {
  FULL_CONTENT
}

@Component({
  selector: 'plat-preloader-container',
  templateUrl: './preloader-container.component.html',
  styleUrls: ['./preloader-container.component.sass'],
  animations: Animations.preloaderAlertAnimation
})

export class PreloaderContainerComponent {
  @Input()
  public contentSizeClass?: PreloaderContentSizeEnum;

  @Input()
  public trMessage?: string;

  constructor() {
  }

  public setPreloaderSize = (): string => {
    switch (this.contentSizeClass) {
      case PreloaderContentSizeEnum.FULL_CONTENT:
        return 'preloader--full';

      default:
        return 'preloader--full';

    }
  }
}
