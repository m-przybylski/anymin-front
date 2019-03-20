// tslint:disable:max-classes-per-file
import { Component, ElementRef, ViewEncapsulation, Renderer2 } from '@angular/core';
import { mixinColor, ICanColor } from '../common/collor';
import { mixinDisable } from '@platform/shared/components/atomic-components/common/disable';

const BUTTON_ATTRIBUTES: ReadonlyArray<string> = [
  'plat-icon-button',
  'plat-stroked-button',
  'plat-mini-flat-fab',
  'plat-flat-fab',
  'plat-flat',
  'plat-button',
  'plat-button-primary',
  'plat-button-link',
  'plat-large-icon-button',
  'plat-large-button',
  'plat-stroked-large-button',
];

class ButtonBase {
  constructor(public elementRef: ElementRef, public renderer: Renderer2) {}
}

const ButtonMixinBase = mixinDisable(mixinColor(ButtonBase));

@Component({
  selector: `button[plat-icon-button], button[plat-stroked-button],
             button[plat-button], button[plat-mini-flat-fab],
             button[plat-flat-fab], button[plat-flat],
             button[plat-large-button], button[plat-stroked-large-button],
             [plat-icon-button], [plat-stroked-button],
             [plat-button], [plat-button-primary], [plat-mini-flat-fab],
             [plat-flat-fab], [plat-flat], [plat-button-link],
             [plat-large-icon-button], [plat-large-button],
             [plat-stroked-large-button]
             `,
  templateUrl: './button.html',
  styleUrls: ['./button.sass'],
  inputs: ['color', 'disabled'],
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
