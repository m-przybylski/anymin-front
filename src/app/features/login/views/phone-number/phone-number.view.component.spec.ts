// tslint:disable:no-empty
import { async, TestBed } from '@angular/core/testing';
import { PhoneNumberViewComponent } from './phone-number.view.component';
import { PhoneNumberViewService } from './phone-number.view.service';
import createSpyObj = jasmine.createSpyObj;
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  FormUtilsService,
  AnymindComponentsModule, AnymindComponentsCoreModule
} from '@anymind-ng/components';
import
{
  CommonSettingsService
} from '../../../../../angularjs/common/services/common-settings/common-settings.service';
import { LoginContentComponent } from '../../../../shared/components/login-content/login-content.component';
import { LoginBackgroundComponent } from '../../../../shared/components/login-background/login-background.component';
import
{
  LoginMobileFooterComponent
} from '../../../../shared/components/login-mobile-footer/login-mobile-footer.component';
import { BrowserModule } from '@angular/platform-browser';
import { of } from 'rxjs/observable/of';
import { LoggerFactory } from '@anymind-ng/core';

// tslint:disable:no-floating-promises
describe('Component: PhoneNumberViewComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PhoneNumberViewComponent,
        LoginContentComponent,
        LoginBackgroundComponent,
        LoginMobileFooterComponent
      ],
      imports: [
        AnymindComponentsCoreModule.forRoot(),
        AnymindComponentsModule,
        BrowserModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        CommonSettingsService,
        {provide: LoggerFactory, useValue: createSpyObj('LoggerFactory', ['createLoggerService'])},
        {
          provide: FormUtilsService, useValue: createSpyObj('FormUtilsService', ['validateAllFormFields',
            'isFieldInvalid'])
        },
        {
          provide: PhoneNumberViewService, useValue: createSpyObj('PhoneNumberViewService',
            ['getPhoneNumberFromInvitation', 'handlePhoneNumber'])
        }
      ]
    }).compileComponents();
    TestBed.get(LoggerFactory).createLoggerService.and.returnValue({
      warn: (): void => {
      },
      error: (): void => {
      }
    });
  }));

  it('should display validation error cause number is invalid', () => {
    const componentFixture = TestBed.createComponent(PhoneNumberViewComponent);
    const component = componentFixture.componentInstance;
    const mockFormUtilsService = TestBed.get(FormUtilsService);
    const mockPhoneNumberViewService = TestBed.get(PhoneNumberViewService);

    mockPhoneNumberViewService.getPhoneNumberFromInvitation.and.returnValue('');
    component.ngOnInit();
    componentFixture.detectChanges();
    component.ngAfterContentInit();
    component.onFormSubmit(component.msisdnForm);
    expect(component.msisdnForm.valid).toBeFalsy();
    expect(mockFormUtilsService.validateAllFormFields).toHaveBeenCalledWith(component.msisdnForm);
  });

  it('should valid phone number and send it to service', () => {
    const componentFixture = TestBed.createComponent(PhoneNumberViewComponent);
    const component = componentFixture.componentInstance;
    const mockPhoneNumberService = TestBed.get(PhoneNumberViewService);

    mockPhoneNumberService.handlePhoneNumber.and.returnValue(of({}));
    mockPhoneNumberService.getPhoneNumberFromInvitation.and.returnValue('');

    component.ngOnInit();
    componentFixture.detectChanges();
    component.ngAfterContentInit();
    component.msisdnForm.controls[component.msisdnControlName].setValue('555555555');
    component.onFormSubmit(component.msisdnForm);
    expect(component.msisdnForm.valid).toBeTruthy();
  });

});
