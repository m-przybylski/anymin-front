import { TestBed } from '@angular/core/testing';

import { DropdownComponent, IDropdownComponent } from './dropdown.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getCoreConfig } from '../../../../core/factories/core-config/core-config.facotry';
import { BrowserModule } from '@angular/platform-browser';
import { AnymindComponentsCoreModule, AnymindComponentsModule } from '@anymind-ng/core';
import { DropdownListComponent } from './dropdown-list/dropdown-list.component';
import { UserAvatarComponent } from '../../user-avatar/user-avatar.component';
import { EventEmitter } from '@angular/core';

describe('Component: DropdownComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownComponent, DropdownListComponent, UserAvatarComponent],
      imports: [
        AnymindComponentsCoreModule.forRoot(getCoreConfig),
        AnymindComponentsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
      ]
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
    spyOn(component, 'onCloseDropdownList');
    component.onToggleDropdown(isVisible);
    expect(component.onCloseDropdownList).toHaveBeenCalledWith(isVisible);
    expect(component.isDropdownListVisible).toBe(isVisible);
  });

  it('should call onCloseDropdownList', () => {
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    component.onCloseEmiter = new EventEmitter<boolean>();
    const isVisible = false;

    spyOn(component.onCloseEmiter, 'emit');
    component.onCloseDropdownList(isVisible);
    expect(component.onCloseEmiter.emit).toHaveBeenCalledWith(isVisible);
  });

  it('should call onSelectItem when dropdown list only', () => {
    const mockValue: IDropdownComponent = {
      name: 'Jan'
    };
    const fixture = TestBed.createComponent(DropdownComponent);
    const component = fixture.componentInstance;
    component.isDropdownListOnly = true;

    spyOn(component.onSelectItemEmiter, 'emit');
    component.onSelectItem(mockValue);
    expect(component.onSelectItemEmiter.emit).toHaveBeenCalledWith(mockValue);
  });
});
