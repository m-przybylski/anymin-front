import { async, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormUtilsService,
  LoggerFactory,
  AnymindComponentsModule,
  AnymindComponentsCoreModule,
  AlertService,
  InputPinCodeErrorsEnum,
  Alerts,
} from '@anymind-ng/core';
import { LoginContentComponent } from '../../../../shared/components/login-content/login-content.component';
import { LoginBackgroundComponent } from '../../../../shared/components/login-background/login-background.component';
import { LoginMobileFooterComponent } from '../../../../shared/components/login-mobile-footer/login-mobile-footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { PinCodeViewComponent } from './pin-code.view.component';
import { PinCodeServiceStatus, PinCodeViewService } from './pin-code.view.service';
import { ActivatedRoute } from '@angular/router';
import { RegistrationService } from '@anymind-ng/api';
import { PinCodeTimerService } from '../../../../shared/services/pin-code-timer/pin-code.timer.service';
import { of } from 'rxjs';
import { getCoreConfig } from '../../../../core/factories/core-config/core-config.facotry';
import { LoginHelperService } from '../../services/login-helper.service';

// tslint:disable:no-unbound-method
describe('Component: Login PinCodeViewComponent', () => {
  const logger: any = {
    debug: jasmine.createSpy('debug').and.stub(),
    info: jasmine.createSpy('info').and.stub(),
    warn: jasmine.createSpy('warn').and.stub(),
    error: jasmine.createSpy('error').and.stub(),
  };
  const loggerFactory = createSpyObj('LoggerFactory', ['createLoggerService']);
  loggerFactory.createLoggerService.and.returnValue(logger);
  const mockPhoneNumber = '+48555555555';
  const mockTimeLeft = 30;
  const mockPinCodeViewService = createSpyObj('PinCodeViewService', ['handleRegistration']);

  const activatedRouteMock = {
    snapshot: {
      data: { registrationSession: {} },
      params: { msisdn: mockPhoneNumber },
      queryParams: { noPasswordRegistrationStatus: true },
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LoggerFactory, useValue: loggerFactory },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: RegistrationService, useValue: createSpyObj('RegistrationService', ['requestVerificationRoute']) },
        { provide: AlertService, useValue: createSpyObj('AlertService', ['pushDangerAlert']) },
        { provide: PinCodeTimerService, useValue: createSpyObj('PinCodeTimerService', ['getTimeLeft$']) },
        {
          provide: FormUtilsService,
          useValue: createSpyObj('FormUtilsService', ['validateAllFormFields', 'isFieldInvalid']),
        },
        LoginHelperService,
      ],
      declarations: [PinCodeViewComponent, LoginContentComponent, LoginBackgroundComponent, LoginMobileFooterComponent],
      imports: [
        AnymindComponentsCoreModule.forRoot(getCoreConfig),
        AnymindComponentsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
      ],
    })
      .overrideComponent(PinCodeViewComponent, {
        set: {
          providers: [
            {
              provide: PinCodeViewService,
              useValue: mockPinCodeViewService,
            },
          ],
        },
      })
      .compileComponents();
  }));

  it('should not allowed to submit form with invalid password', () => {
    const mockFormUtilsService = TestBed.get(FormUtilsService);
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.onFormSubmit(component.pinCodeForm);

    expect(mockFormUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.pinCodeForm);
  });

  it('should submit form successfully', () => {
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of(PinCodeServiceStatus.SUCCESS));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);
    expect(logger.debug).toHaveBeenCalledWith('Handled backend success status');
  });

  it('should submit form successfully', () => {
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of(PinCodeServiceStatus.ERROR));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);
    expect(logger.warn).toHaveBeenCalledWith('Handled backend error status');
  });

  it('should submit the form and get ERROR status', () => {
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of(PinCodeServiceStatus.ERROR));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);
    expect(logger.warn).toHaveBeenCalledWith('Handled backend error status');
  });

  it('should submit the form and display invalid pin code validation', () => {
    const mockFormUtilsService = TestBed.get(FormUtilsService);
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of(PinCodeServiceStatus.INVALID));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);

    expect(mockFormUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.pinCodeForm);
    expect(
      component.pinCodeForm.controls[component.pinCodeControlName].getError(InputPinCodeErrorsEnum.IncorrectPinCode),
    ).toBeTruthy();
  });

  it('should submit the form and display can not find token validation', () => {
    const mockFormUtilsService = TestBed.get(FormUtilsService);
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of(PinCodeServiceStatus.CAN_NOT_FIND_MSISDN_TOKEN));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);

    expect(mockFormUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.pinCodeForm);
    expect(
      component.pinCodeForm.controls[component.pinCodeControlName].getError(InputPinCodeErrorsEnum.IncorrectPinCode),
    ).toBeTruthy();
  });

  it('should submit the form and display incorrect msisdn validation', () => {
    const mockFormUtilsService = TestBed.get(FormUtilsService);
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(
      of(PinCodeServiceStatus.MSISDN_VERIFICATION_TOKEN_INCORRECT),
    );

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);

    expect(mockFormUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.pinCodeForm);
    expect(
      component.pinCodeForm.controls[component.pinCodeControlName].getError(InputPinCodeErrorsEnum.IncorrectPinCode),
    ).toBeTruthy();
  });

  it('should submit the form and display too many attempts validation', () => {
    const mockFormUtilsService = TestBed.get(FormUtilsService);
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of(PinCodeServiceStatus.TOO_MANY_MSISDN_TOKEN_ATTEMPTS));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);

    expect(mockFormUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.pinCodeForm);
    expect(
      component.pinCodeForm.controls[component.pinCodeControlName].getError(
        InputPinCodeErrorsEnum.ToManyUnsuccessfulAttempts,
      ),
    ).toBeTruthy();
  });

  it('should submit the form and display alert because unhandled backend status', () => {
    const pinCodeTimerService = TestBed.get(PinCodeTimerService);
    const componentFixture = TestBed.createComponent(PinCodeViewComponent);
    const component = componentFixture.componentInstance;
    const mockAlertsService = TestBed.get(AlertService);

    pinCodeTimerService.getTimeLeft$.and.returnValue(of(mockTimeLeft));
    mockPinCodeViewService.handleRegistration.and.returnValue(of({}));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.pinCodeForm.controls[component.pinCodeControlName].setValue('1234');
    component.onFormSubmit(component.pinCodeForm);
    expect(mockAlertsService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
  });
});
