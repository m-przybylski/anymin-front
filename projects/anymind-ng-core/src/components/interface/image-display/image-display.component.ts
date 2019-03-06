import { Component, Inject, Input, OnInit } from '@angular/core';
import { Config } from '../../../config';
import { COMPONENTS_CONFIG } from '../../../shared/injection-tokens/injection-tokens';

@Component({
  selector: 'am-core-image-display',
  templateUrl: './image-display.component.html',
  styleUrls: ['./image-display.component.sass'],
})
export class ImageDisplayComponent implements OnInit {
  public urlIcons = this.config.assetsUrl.icons;
  public urlIconsTablet = this.config.assetsUrl.iconsTablet;
  public urlIconsSmallDesktop = this.config.assetsUrl.iconsSmallDesktop;
  public urlIconsDesktop = this.config.assetsUrl.iconsDesktop;

  @Input()
  public imgName = '';

  @Input()
  public altDescription = '';

  @Input()
  public imgFormat = 'png';

  @Input()
  public mobileImgName?: string;

  @Input()
  public tabletImgName?: string;

  @Input()
  public smallDesktopImgName?: string;

  @Input()
  public desktopImgName?: string;

  @Input()
  public isWidget = false;

  private widgetPath = '/widget';

  constructor(@Inject(COMPONENTS_CONFIG) private config: Config) {}

  public ngOnInit(): void {
    this.changeAssetsPath();
  }

  private changeAssetsPath(): void {
    if (this.isWidget) {
      this.urlIcons = this.widgetPath + this.config.assetsUrl.icons;
      this.urlIconsTablet = this.widgetPath + this.config.assetsUrl.iconsTablet;
      this.urlIconsSmallDesktop = this.widgetPath + this.config.assetsUrl.iconsSmallDesktop;
      this.urlIconsDesktop = this.widgetPath + this.config.assetsUrl.iconsDesktop;
    }
  }
}
