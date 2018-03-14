import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'dropdown-primary'
})
export class DropdownPrimaryDirective extends UpgradeComponent {

  constructor(elementRef: ElementRef, injector: Injector) {
    super('dropdownPrimary', elementRef, injector);
  }
}
