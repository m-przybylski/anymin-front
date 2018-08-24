// tslint:disable:no-duplicate-imports
import { async, TestBed } from '@angular/core/testing';
import createSpyObj = jasmine.createSpyObj;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormUtilsService, AnymindComponentsModule, AnymindComponentsCoreModule } from '@anymind-ng/core';
import { LoginContentComponent } from '../../../../shared/components/login-content/login-content.component';
import { LoginBackgroundComponent } from '../../../../shared/components/login-background/login-background.component';
import { LoginMobileFooterComponent } from '../../../../shared/components/login-mobile-footer/login-mobile-footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerFactory } from '@anymind-ng/core';
import { PasswordViewComponent } from './password.view.component';
import { PasswordLoginStatus, PasswordViewService } from './password.view.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { InputPasswordErrorsEnum } from '@anymind-ng/core';
import { getCoreConfig } from '../../../../core/factories/core-config/core-config.facotry';
import { LoginHelperService } from '../../services/login-helper.service';

// tslint:disable:no-unbound-method
describe('Component: PasswordViewComponent', () => {
  const logger: any = {
    info: jasmine.createSpy('info').and.stub(),
    warn: jasmine.createSpy('warn').and.stub(),
    error: jasmine.createSpy('error').and.stub(),
  };
  const loggerFactory = createSpyObj('LoggerFactory', ['createLoggerService']);
  loggerFactory.createLoggerService.and.returnValue(logger);

  const activatedRouteMock: any = { snapshot: { params: { msisdn: '48555555555' } } };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PasswordViewComponent,
        LoginContentComponent,
        LoginBackgroundComponent,
        LoginMobileFooterComponent,
      ],
      imports: [
        AnymindComponentsCoreModule.forRoot(getCoreConfig),
        AnymindComponentsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: LoggerFactory, useValue: loggerFactory },
        {
          provide: FormUtilsService,
          useValue: createSpyObj('FormUtilsService', ['validateAllFormFields', 'isFieldInvalid']),
        },
        {
          provide: PasswordViewService,
          useValue: createSpyObj('PasswordViewService', ['login']),
        },
        LoginHelperService,
      ],
    }).compileComponents();
  }));

  it('should number be equal router param', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockMsisdnParam = '+48555555555';

    component.ngOnInit();
    componentFixture.whenStable().then(() => {
      expect(component.msisdn).toEqual(mockMsisdnParam);
    });
  }));

  it('should not allow to send the invalid form', () => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const formsUtils = TestBed.get(FormUtilsService);

    component.ngOnInit();
    componentFixture.detectChanges();
    component.onFormSubmit(component.passwordForm);
    expect(formsUtils.validateAllFormFields).toHaveBeenCalledWith(component.passwordForm);
  });

  it('should send form successfully with correct value', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.SUCCESS));

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
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.SUCCESS_WITH_INVITATION));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);

    componentFixture.whenStable().then(() => {
      expect(logger.warn).toHaveBeenCalledWith(
        'Handled password login status ',
        PasswordLoginStatus.SUCCESS_WITH_INVITATION,
      );
    });
  }));

  it('should send form and get error', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.ERROR));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);

    componentFixture.whenStable().then(() => {
      expect(logger.warn).toHaveBeenCalledWith('Handled password login status ', PasswordLoginStatus.ERROR);
    });
  }));

  it('should send form and display error about wrong password', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockPasswordService = TestBed.get(PasswordViewService);
    const formsUtils = TestBed.get(FormUtilsService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.WRONG_PASSWORD));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('WrongPassword123');
    component.onFormSubmit(component.passwordForm);
    componentFixture.whenStable().then(() => {
      expect(
        component.passwordForm.controls[component.passwordControlName].getError(
          InputPasswordErrorsEnum.IncorrectPassword,
        ),
      ).toBeTruthy();
      expect(formsUtils.validateAllFormFields).toHaveBeenCalledWith(component.passwordForm);
    });
  }));

  it('should send form and display error about too many attempts', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockPasswordService = TestBed.get(PasswordViewService);
    const formsUtils = TestBed.get(FormUtilsService);

    mockPasswordService.login.and.returnValue(Promise.resolve(PasswordLoginStatus.TOO_MANY_ATTEMPTS));

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);
    componentFixture.whenStable().then(() => {
      expect(
        component.passwordForm.controls[component.passwordControlName].getError(
          InputPasswordErrorsEnum.ToManyUnsuccessfulAttempts,
        ),
      ).toBeTruthy();
      expect(formsUtils.validateAllFormFields).toHaveBeenCalledWith(component.passwordForm);
    });
  }));

  it('should send form and log error about unhandled response status', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockPasswordService = TestBed.get(PasswordViewService);

    mockPasswordService.login.and.returnValue(Promise.resolve());

    component.ngOnInit();
    componentFixture.detectChanges();
    component.passwordForm.controls[component.passwordControlName].setValue('Admin123');
    component.onFormSubmit(component.passwordForm);
    componentFixture.whenStable().then(() => {
      expect(logger.error).toHaveBeenCalledWith('Unhandled PasswordLoginStatus', undefined);
    });
  }));
});
