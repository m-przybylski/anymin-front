// tslint:disable:no-duplicate-imports
import { async, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormUtilsService,
  AnymindComponentsModule, AnymindComponentsCoreModule
} from '@anymind-ng/components';
import { LoginContentComponent } from '../../../../shared/components/login-content/login-content.component';
import { LoginBackgroundComponent } from '../../../../shared/components/login-background/login-background.component';
import
{
  LoginMobileFooterComponent
} from '../../../../shared/components/login-mobile-footer/login-mobile-footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { PasswordViewComponent } from './password.view.component';
import { PasswordLoginStatus, PasswordViewService } from './password.view.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs/observable/of';
import { InputPasswordErrorsEnum } from '@anymind-ng/components';

// tslint:disable:no-floating-promises
// tslint:disable:no-unbound-method
describe('Component: PasswordViewComponent', () => {

  const logger: LoggerService = new LoggerService(1);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordViewComponent,
        LoginContentComponent,
        LoginBackgroundComponent,
        LoginMobileFooterComponent
      ],
      imports: [
        AnymindComponentsCoreModule.forRoot(),
        AnymindComponentsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        {provide: ActivatedRoute, useValue: createSpyObj('ActivatedRoute', ['params'])},
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
        {
          provide: FormUtilsService, useValue: createSpyObj('FormUtilsService', ['validateAllFormFields',
          'isFieldInvalid'])
        },
        {
          provide: PasswordViewService, useValue: createSpyObj('PasswordViewService',
          ['login'])
        }
      ]
    }).compileComponents();

    TestBed.get(LoggerFactory).createLoggerService.and.returnValue(logger);
  }));

  it('should number be equal router param', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    route.params = of({msisdn: mockMsisdnParam});

    component.ngOnInit();
    componentFixture.whenStable().then(() => {
      expect(component.msisdn).toEqual(mockMsisdnParam);
    });
  }));

  it('should not allow to send the invalid form', () => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const formsUtils = TestBed.get(FormUtilsService);
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    route.params = of({msisdn: mockMsisdnParam});

    component.ngOnInit();
    componentFixture.detectChanges();
    component.onFormSubmit(component.passwordForm);
    expect(formsUtils.validateAllFormFields).toHaveBeenCalledWith(component.passwordForm);
  });

  it('should send form successfully with correct value', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.SUCCESS));
    route.params = of({msisdn: mockMsisdnParam});
    spyOn(logger, 'warn');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);

    componentFixture.whenStable().then(() => {
      expect(logger.warn).toHaveBeenCalledWith('Handled password login status ', PasswordLoginStatus.SUCCESS);
    });
  }));

  it('should send form and invitation', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.SUCCESS_WITH_INVITATION));
    route.params = of({msisdn: mockMsisdnParam});
    spyOn(logger, 'warn');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);

    componentFixture.whenStable().then(() => {
      expect(logger.warn)
        .toHaveBeenCalledWith('Handled password login status ', PasswordLoginStatus.SUCCESS_WITH_INVITATION);
    });
  }));

  it('should send form and get error', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.ERROR));
    route.params = of({msisdn: mockMsisdnParam});
    spyOn(logger, 'warn');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);

    componentFixture.whenStable().then(() => {
      expect(logger.warn)
        .toHaveBeenCalledWith('Handled password login status ', PasswordLoginStatus.ERROR);
    });
  }));

  it('should send form and display error about wrong password', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    const mockPasswordService = TestBed.get(PasswordViewService);
    const formsUtils = TestBed.get(FormUtilsService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.WRONG_PASSWORD));
    route.params = of({msisdn: mockMsisdnParam});
    spyOn(logger, 'warn');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('WrongPassword123');
    component.onFormSubmit(component.passwordForm);
    componentFixture.whenStable().then(() => {
      expect(component.passwordForm.controls[component.passwordControlName]
        .getError(InputPasswordErrorsEnum.IncorrectPassword)).toBeTruthy();
      expect(formsUtils.validateAllFormFields).toHaveBeenCalledWith(component.passwordForm);
    });
  }));

  it('should send form and display error about too many attempts', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    const mockPasswordService = TestBed.get(PasswordViewService);
    const formsUtils = TestBed.get(FormUtilsService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.TOO_MANY_ATTEMPTS));
    route.params = of({msisdn: mockMsisdnParam});
    spyOn(logger, 'warn');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);
    componentFixture.whenStable().then(() => {
      expect(component.passwordForm.controls[component.passwordControlName]
        .getError(InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts)).toBeTruthy();
      expect(formsUtils.validateAllFormFields).toHaveBeenCalledWith(component.passwordForm);
    });
  }));

  it('should send form and log error about unhandled response status', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const route = TestBed.get(ActivatedRoute);
    const mockMsisdnParam = '+48555555555';
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve());
    route.params = of({msisdn: mockMsisdnParam});
    spyOn(logger, 'error');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);
    componentFixture.whenStable().then(() => {
      expect(logger.error)
        .toHaveBeenCalledWith('Unhandled PasswordLoginStatus', undefined);
    });
  }));
});
