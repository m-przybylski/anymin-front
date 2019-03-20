// tslint:disable:no-any
// tslint:disable:readonly-array
import { ElementRef, Renderer2 } from '@angular/core';

export type Constructor<T> = new (...args: any[]) => T;

export interface IHasElementRef {
  elementRef: ElementRef;
  renderer: Renderer2;
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
    private colorProp: ThemePalette;

    public get color(): ThemePalette {
      return this.colorProp;
    }

    public set color(value: ThemePalette) {
      const colorPalette = value || defaultColor;

      if (colorPalette !== this.colorProp) {
        if (this.colorProp) {
          this.renderer.removeClass(this.elementRef.nativeElement, `plat-${this.colorProp}`);
        }
        if (colorPalette) {
          this.renderer.addClass(this.elementRef.nativeElement, `plat-${colorPalette}`);
        }
        this.colorProp = colorPalette;
      }
    }

    constructor(...args: any[]) {
      super(...args);
      this.color = defaultColor;
    }
  };
}
