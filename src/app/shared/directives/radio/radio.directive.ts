import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
  selector: 'radio-btn',
})
export class RadioButtonDirective extends UpgradeComponent {
  @Input() public ngModel: string;
  @Input() public value: string;
  @Input() public id: string;
  @Input() public inputName: string;
  @Input() public inputId: string;
  @Input() public label: string;
  @Input() public onClick: (model: string) => void;

  constructor(elementRef: ElementRef, injector: Injector) {
    super('radioBtn', elementRef, injector);
  }
}
