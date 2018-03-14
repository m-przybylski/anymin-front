import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'radio-btn'
})
export class RadioButtonDirective extends UpgradeComponent {

  constructor(elementRef: ElementRef, injector: Injector) {
    super('radioBtn', elementRef, injector);
  }
}
