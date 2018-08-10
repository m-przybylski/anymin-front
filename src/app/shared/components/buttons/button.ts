// tslint:disable:max-classes-per-file
import { Component, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { mixinColor, ICanColor } from '../common/collor';

const BUTTON_ATTRIBUTES = [
  'plat-icon-button',
  'plat-stroked-button',
  'plat-button',
  'plat-mini-flat-fab',
  'plat-flat-fab',
];

const buttonMapper = (className: string): string => `button[${className}]`;
const plainMapper = (className: string): string => `[${className}]`;
const combainetMapper = (className: string): string =>
  [buttonMapper, plainMapper].map(mapper => mapper(className)).join(', ');

// tslint:disable-next-line:only-arrow-functions
export function selectorBuilder(attributes: string[]): string {
  return attributes.map(combainetMapper).join(', ');
}

class ButtonBase {
  constructor(public _elementRef: ElementRef, public _renderer: Renderer2) {}
}

const ButtonMixinBase = mixinColor(ButtonBase);
@Component({
  selector: selectorBuilder(BUTTON_ATTRIBUTES),
  templateUrl: './button.html',
  styleUrls: ['./button.sass'],
  inputs: ['color'],
  encapsulation: ViewEncapsulation.None,
})
export class ButtonComponent extends ButtonMixinBase implements ICanColor {
  constructor(public _elementRef: ElementRef, public _renderer: Renderer2) {
    super(_elementRef, _renderer);

    BUTTON_ATTRIBUTES.filter(attr => this._getHostElement().hasAttribute(attr)).forEach(attr => {
      this._getHostElement().classList.add(attr);
    });
  }

  private _getHostElement = (): HTMLElement => this._elementRef.nativeElement;
}
