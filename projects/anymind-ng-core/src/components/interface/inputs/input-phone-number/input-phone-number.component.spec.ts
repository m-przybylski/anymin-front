import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPhoneNumberComponent } from './input-phone-number.component';

describe('InputPhoneNumberComponent', () => {
  let component: InputPhoneNumberComponent;
  let fixture: ComponentFixture<InputPhoneNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputPhoneNumberComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPhoneNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
