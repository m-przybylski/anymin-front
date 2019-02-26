import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export interface IDropdownComponent {
  name: string;
  avatar?: string;
}

@Component({
  selector: 'plat-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.sass'],
})
export class DropdownComponent implements OnInit {
  @Input('label')
  public labelTrKey: string;

  @Input('placeholder')
  public placeholderTrKey: string;

  @Input()
  public controlName: string;

  @Input()
  public form: FormGroup;

  @Input()
  public isRequired = false;

  @Input()
  public isDisabled = false;

  @Input()
  public dropdownItems: ReadonlyArray<IDropdownComponent>;

  @Input()
  public isDropdownListVisible = false;

  @Input()
  public isDropdownListOnly = false;

  @Input()
  public isAvatarVisible = true;

  @Output()
  public onSelectItemEmiter = new EventEmitter<IDropdownComponent>();

  @Output()
  public onCloseEmiter = new EventEmitter<boolean>(true);

  @Output()
  public isListItemSelected = new EventEmitter<boolean>(false);

  public ngOnInit(): void {
    this.form.addControl(this.controlName, new FormControl('', []));
  }

  public onClickDropdown(): void {
    this.isDropdownListVisible = !this.isDropdownListVisible;
  }

  public isItemSelected(isSelectAnyItem: boolean): void {
    if (this.isListItemSelected) {
      this.isListItemSelected.emit(isSelectAnyItem);
    }
  }

  public onSelectItem(value: IDropdownComponent): void {
    if (this.isDropdownListOnly) {
      this.onSelectItemEmiter.emit(value);
    } else {
      this.form.controls[this.controlName].setValue(value.name);
    }

    this.isDropdownListVisible = false;
    this.placeholderTrKey = value.name;
  }

  public onToggleDropdown(isVisible: boolean): void {
    this.isDropdownListVisible = isVisible;
    this.onCloseDropdownList(isVisible);
  }

  public onCloseDropdownList(isVisible: boolean): void {
    if (this.onCloseEmiter) {
      this.onCloseEmiter.emit(isVisible);
    }
  }
}
