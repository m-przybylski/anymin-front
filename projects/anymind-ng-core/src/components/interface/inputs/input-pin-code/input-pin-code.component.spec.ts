import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPinCodeComponent } from './input-pin-code.component';

describe('InputPinCodeComponent', () => {
  let component: InputPinCodeComponent;
  let fixture: ComponentFixture<InputPinCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputPinCodeComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPinCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
