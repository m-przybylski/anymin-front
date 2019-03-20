// tslint:disable:no-any
// tslint:disable:readonly-array
import { ElementRef, Renderer2 } from '@angular/core';

export type Constructor<T> = new (...args: any[]) => T;

export interface IHasElementRef {
  elementRef: ElementRef;
  renderer: Renderer2;
}

export interface IDisabled {
  disabled: boolean;
}

export type DisableState = true | false | undefined;

// tslint:disable-next-line:only-arrow-functions
export function mixinDisable<T extends Constructor<IHasElementRef>>(
  base: T,
  isDisabled?: DisableState,
): Constructor<IDisabled> & T {
  return class extends base {
    private disable: boolean;

    public get disabled(): boolean {
      return this.disable || false;
    }

    public set disabled(value: boolean) {
      if (value) {
        this.renderer.addClass(this.elementRef.nativeElement, `disabled`);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, `disabled`);
      }
    }

    constructor(...args: any[]) {
      super(...args);
      this.disabled = isDisabled || false;
    }
  };
}
