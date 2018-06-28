// tslint:disable:readonly-array
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import {
  IDropdownItem,
  IPrimaryDropdownListElement
} from '../../../../angularjs/common/components/interface/dropdown-primary/dropdown-primary';

@Directive({
  selector: 'dropdown-primary'
})
export class DropdownPrimaryDirective extends UpgradeComponent {

  @Input() public onSelectMain: (item: IDropdownItem) => void;
  @Input() public selectedItem: IDropdownItem;
  @Input() public label: string;
  @Input() public inputPlaceholder: string;
  @Input() public placeholder: string;
  @Input() public isDisabled: boolean;
  @Input() public mainList: IPrimaryDropdownListElement[];

  constructor(elementRef: ElementRef, injector: Injector) {
    super('dropdownPrimary', elementRef, injector);
  }
}
