// tslint:disable:max-classes-per-file
import { Component, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { mixinColor, ICanColor } from '../common/collor';

const BUTTON_ATTRIBUTES: ReadonlyArray<string> = [
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
export function selectorBuilder(attributes: ReadonlyArray<string>): string {
  return attributes.map(combainetMapper).join(', ');
}

class ButtonBase {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}
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
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {
    super(elementRef, renderer);

    BUTTON_ATTRIBUTES.filter(attr => this.getHostElement().hasAttribute(attr)).forEach(attr => {
      this.getHostElement().classList.add(attr);
    });
  }

  private getHostElement = (): HTMLElement => this.elementRef.nativeElement;
}
