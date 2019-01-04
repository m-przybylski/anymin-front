import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { PhoneNumberViewComponent } from './phone-number.view.component';
import { PhoneNumberViewService, PhoneNumberServiceStatus } from './phone-number.view.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUtilsService, InputPhoneNumberService } from '@anymind-ng/core';
import { LoginContentComponent } from '../../../../shared/components/login-content/login-content.component';
import { LoginBackgroundComponent } from '../../../../shared/components/login-background/login-background.component';
import { of, throwError } from 'rxjs';
import { LoginHelperService } from '../../services/login-helper.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputsModule } from '@platform/shared/components/inputs/inputs.module';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger } from 'testing/testing';

describe('Component: PhoneNumberViewComponent', () => {
  let componentFixture: ComponentFixture<PhoneNumberViewComponent>;
  let component: PhoneNumberViewComponent;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PhoneNumberViewComponent, LoginContentComponent, LoginBackgroundComponent],
      imports: [ReactiveFormsModule, FormsModule, TranslateModule.forRoot(), InputsModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        LoginHelperService,
        provideMockFactoryLogger(),
        {
          provide: InputPhoneNumberService,
          useValue: Deceiver(InputPhoneNumberService, { getValidators: jest.fn() }),
        },
        {
          provide: FormUtilsService,
          useValue: Deceiver(FormUtilsService, { validateAllFormFields: jest.fn(), isFieldInvalid: jest.fn() }),
        },
        {
          provide: PhoneNumberViewService,
          useValue: Deceiver(PhoneNumberViewService, {
            getPhoneNumberFromInvitation: jest.fn().mockReturnValue(of({})),
            handlePhoneNumber: jest.fn(),
          }),
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    componentFixture = TestBed.createComponent(PhoneNumberViewComponent);
    component = componentFixture.componentInstance;
    componentFixture.detectChanges();
  });

  it('should display validation error cause number is invalid', () => {
    const formUtilsService: FormUtilsService = TestBed.get(FormUtilsService);
    const phoneNumberViewService: PhoneNumberViewService = TestBed.get(PhoneNumberViewService);
    (phoneNumberViewService.handlePhoneNumber as jest.Mock).mockReturnValue(
      throwError(PhoneNumberServiceStatus.MSISDN_INVALID),
    );

    component.ngOnInit();
    component.onFormSubmit(component.msisdnForm);
    expect(component.msisdnForm.valid).toBeFalsy();
    expect(formUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.msisdnForm);
  });

  it('should populate not value from locale storage when empty', () => {
    const phoneNumberViewService: PhoneNumberViewService = TestBed.get(PhoneNumberViewService);
    (phoneNumberViewService.getPhoneNumberFromInvitation as jest.Mock).mockReturnValue(undefined);
    component.ngOnInit();
    expect(component.msisdnForm.controls[component.msisdnControlName].value).toBeFalsy();
  });

  it('should populate value from locale storage', () => {
    const phoneNumberViewService: PhoneNumberViewService = TestBed.get(PhoneNumberViewService);
    (phoneNumberViewService.getPhoneNumberFromInvitation as jest.Mock).mockReturnValue('666666666');
    component.ngOnInit();
    expect(component.msisdnForm.controls[component.msisdnControlName].value).toEqual('666666666');
  });

  it('should valid phone number and send it to service', () => {
    const phoneNumberViewService: PhoneNumberViewService = TestBed.get(PhoneNumberViewService);
    (phoneNumberViewService.handlePhoneNumber as jest.Mock).mockReturnValue(of(PhoneNumberServiceStatus.SUCCESS));

    component.ngOnInit();
    component.msisdnForm.controls[component.msisdnControlName].setValue('555555555');
    component.onFormSubmit(component.msisdnForm);
    expect(component.msisdnForm.valid).toBeTruthy();
    expect(phoneNumberViewService.handlePhoneNumber).toHaveBeenCalledWith('+48555555555');
  });
});
