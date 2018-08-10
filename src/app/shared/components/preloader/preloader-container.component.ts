// tslint:disable:no-empty
import { Component, Input } from '@angular/core';
import { Animations } from '@anymind-ng/core';

export enum PreloaderContentSizeEnum {
  FULL_CONTENT,
  NONE,
}

@Component({
  selector: 'plat-preloader-container',
  templateUrl: './preloader-container.component.html',
  styleUrls: ['./preloader-container.component.sass'],
  animations: Animations.preloaderAlertAnimation,
})
export class PreloaderContainerComponent {
  @Input() public contentSizeClass?: PreloaderContentSizeEnum;

  @Input() public isLoading = true;

  @Input() public trMessage?: string;

  public preloaderClass: typeof PreloaderContentSizeEnum = PreloaderContentSizeEnum;

  constructor() {}
}
