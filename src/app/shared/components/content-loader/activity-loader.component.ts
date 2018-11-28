import { Component } from '@angular/core';

import { ContentLoaderComponent } from './content-loader.component';

@Component({
  selector: 'plat-activity-loader',
  template: `
  <plat-content-loader class="activity-loader--mobile"
    [width]="widthMobile"
    [height]="heightMobile"
    [speed]="speed"
    [color]="color"
    [primaryOpacity]="primaryOpacity"
    [secondaryOpacity]="secondaryOpacity">
    <svg:rect x="0" y="0" rx="4" ry="4" width="20" height="20" />
    <svg:rect x="32" y="6" rx="4" ry="4" width="156" height="8" />
    <svg:rect x="32" y="38" rx="4" ry="4" width="309" height="8" />
    <svg:rect x="32" y="70" rx="4" ry="4" width="48" height="8" />
    <svg:rect x="301" y="70" rx="4" ry="4" width="40" height="8" />
    </plat-content-loader>
   <plat-content-loader class="activity-loader--tablet"
   [width]="widthTablet"
   [height]="heightTablet"
   [speed]="speed"
   [color]="color"
   [primaryOpacity]="primaryOpacity"
   [secondaryOpacity]="secondaryOpacity">
  <svg:rect x="0" y="0" rx="4" ry="4" width="20" height="20" />
   <svg:rect x="38" y="6" rx="4" ry="4" width="156" height="8" />
   <svg:rect x="38" y="38" rx="4" ry="4" width="392" height="8" />
   <svg:rect x="38" y="70" rx="4" ry="4" width="48" height="8" />
   <svg:rect x="680" y="70" rx="4" ry="4" width="40" height="8" />
  </plat-content-loader>
   <plat-content-loader class="activity-loader--desktop"
    [width]="widthDesktop"
    [height]="heightDesktop"
    [speed]="speed"
    [color]="color"
    [primaryOpacity]="primaryOpacity"
    [secondaryOpacity]="secondaryOpacity">
    <svg:rect x="0" y="2" rx="4" ry="4" width="20" height="20" />
    <svg:rect x="38" y="0" rx="4" ry="4" width="80" height="8" />
    <svg:rect x="38" y="16" rx="4" ry="4" width="48" height="8" />
    <svg:rect x="178" y="8" rx="4" ry="4" width="156" height="8" />
    <svg:rect x="382" y="8" rx="4" ry="4" width="392" height="8" />
    <svg:rect x="1110" y="8" rx="4" ry="4" width="40" height="8" />

  </plat-content-loader>
 `,
  styleUrls: ['activity-loader.component.sass'],
})
export class ActivityLoaderComponent extends ContentLoaderComponent {
  public readonly widthMobile = 341;
  public readonly heightMobile = 78;
  public readonly widthTablet = 720;
  public readonly heightTablet = 78;
  public readonly widthDesktop = 1152;
  public readonly heightDesktop = 24;
}
