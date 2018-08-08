// tslint:disable:max-classes-per-file
import { Component, ElementRef, Renderer2, Input } from '@angular/core';
import { ICanColor, mixinColor } from '../common/collor';

class IconBase {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}
}

const IconMixinBase = mixinColor(IconBase);

@Component({
  selector: '[plat-icon], span[plat-icon]',
  template: `<ng-template></ng-template>`,
  inputs: ['color'],
  styleUrls: ['icon.sass'],
})
export class IconComponent extends IconMixinBase implements ICanColor {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {
    super(elementRef, renderer);
    this.renderer.addClass(this.elementRef.nativeElement, 'icon');
  }
  @Input()
  public set iconClass(iconClassName: string) {
    this.renderer.addClass(this.elementRef.nativeElement, `icon-${iconClassName}`);
  }
}
