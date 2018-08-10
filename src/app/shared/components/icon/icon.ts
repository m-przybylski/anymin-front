// tslint:disable:max-classes-per-file
import { Component, ElementRef, Renderer2, Input } from '@angular/core';
import { ICanColor, mixinColor } from '../common/collor';

class IconBase {
  constructor(public _elementRef: ElementRef, public _renderer: Renderer2) {}
}

const IconMixinBase = mixinColor(IconBase);

@Component({
  selector: '[plat-icon], span[plat-icon]',
  template: `<ng-template></ng-template>`,
  inputs: ['color'],
  styleUrls: ['icon.sass'],
})
export class IconComponent extends IconMixinBase implements ICanColor {
  @Input()
  public set iconClass(iconClassName: string) {
    this._renderer.addClass(this._elementRef.nativeElement, `icon-${iconClassName}`);
  }

  constructor(public _elementRef: ElementRef, public _renderer: Renderer2) {
    super(_elementRef, _renderer);
    this._renderer.addClass(this._elementRef.nativeElement, 'icon');
  }
}
