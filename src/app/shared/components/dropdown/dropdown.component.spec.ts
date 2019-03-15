import { TestBed } from '@angular/core/testing';

import { DropdownComponent, IDropdownComponent } from './dropdown.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { EventEmitter, NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('Component: DropdownComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent, DropdownListComponent, UserAvatarComponent],
      imports: [TranslateModule.forRoot(), ReactiveFormsModule, FormsModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
  });

  it('should call onClickDropdown', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;

    component.onClickDropdown();
    expect(component.isDropdownListVisible).toBe(true);
  });

  it('should call onToggleDropdown', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;

    const isVisible = false;
    jest.spyOn(component, 'onCloseDropdownList');
    component.onToggleDropdown(isVisible);
    expect(component.onCloseDropdownList).toHaveBeenCalledWith(isVisible);
    expect(component.isDropdownListVisible).toBe(isVisible);
  });

  it('should call onCloseDropdownList', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    component.closeEmiter = new EventEmitter<boolean>();
    const isVisible = false;

    const spy = jest.spyOn(component.closeEmiter, 'emit');
    component.onCloseDropdownList(isVisible);
    expect(spy).toHaveBeenCalledWith(isVisible);
  });

  it('should call onSelectItem when dropdown list only', () => {
    const mockValue: IDropdownComponent = {
      name: 'Jan',
    };
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    component.isDropdownListOnly = true;

    const spy = jest.spyOn(component.selectItemEmiter, 'emit');
    component.onSelectItem(mockValue);
    expect(spy).toHaveBeenCalledWith(mockValue);
  });

  it('should call onSelectItem when dropdown not list only', () => {
    const mockValue: IDropdownComponent = {
      name: 'Jan',
    };
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    component.form = new FormGroup({});
    component.controlName = 'controlName';
    component.form.addControl(component.controlName, new FormControl());
    component.isDropdownListOnly = false;

    component.form.controls[component.controlName].setValue(mockValue.name);

    const spy = jest.spyOn(component.form.controls[component.controlName], 'setValue');
    component.onSelectItem(mockValue);
    expect(spy).toHaveBeenCalledWith(mockValue.name);
    expect(component.isDropdownListVisible).toBe(false);
    expect(component.placeholderTrKey).toBe(mockValue.name);
  });
});
