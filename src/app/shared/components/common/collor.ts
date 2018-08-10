// tslint:disable:no-any
import { ElementRef, Renderer2 } from '@angular/core';

export type Constructor<T> = new (...args: any[]) => T;
export interface IHasElementRef {
  _elementRef: ElementRef;
  _renderer: Renderer2;
}
export interface ICanColor {
  color: ThemePalette;
}
export type ThemePalette = 'primary' | 'secondary' | 'danger' | 'success' | undefined;

// tslint:disable-next-line:only-arrow-functions
export function mixinColor<T extends Constructor<IHasElementRef>>(
  base: T,
  defaultColor?: ThemePalette,
): Constructor<ICanColor> & T {
  return class extends base {
    private _color: ThemePalette;

    public get color(): ThemePalette {
      return this._color;
    }
    public set color(value: ThemePalette) {
      const colorPalette = value || defaultColor;

      if (colorPalette !== this._color) {
        if (this._color) {
          this._renderer.removeClass(this._elementRef.nativeElement, `plat-${this._color}`);
          // this._elementRef.nativeElement.classList.remove(`plat-${this._color}`);
        }
        if (colorPalette) {
          this._renderer.addClass(this._elementRef.nativeElement, `plat-${colorPalette}`);
          // this._elementRef.nativeElement.classList.add(`plat-${colorPalette}`);
        }
        this._color = colorPalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);
      this.color = defaultColor;
    }
  };
}
