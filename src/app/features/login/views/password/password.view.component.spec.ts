// tslint:disable:no-duplicate-imports
import { async, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormUtilsService, AnymindComponentsCoreModule } from '@anymind-ng/core';
import { PasswordViewComponent } from './password.view.component';
import { PasswordLoginStatus, PasswordViewService } from './password.view.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { getCoreConfig } from '../../../../core/factories/core-config/core-config.facotry';
import { LoginHelperService } from '../../services/login-helper.service';
import { Deceiver } from 'deceiver-core';
import { provideMockFactoryLogger } from 'testing/testing';
import { cold } from 'jasmine-marbles';

describe('Component: PasswordViewComponent', () => {
  const activatedRouteMock: any = { snapshot: { params: { msisdn: '48555555555' } } };
  let passwordViewService: PasswordViewService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [AnymindComponentsCoreModule.forRoot(getCoreConfig), RouterTestingModule],
      providers: [
        provideMockFactoryLogger(),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        {
          provide: FormUtilsService,
          useValue: Deceiver(FormUtilsService, {
            validateAllFormFields: jest.fn(),
            isFieldInvalid: jest.fn(),
          }),
        },
        {
          provide: PasswordViewService,
          useValue: Deceiver(PasswordViewService, { login: jest.fn() }),
        },
        LoginHelperService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    passwordViewService = TestBed.get(PasswordViewService);
    (passwordViewService.login as jest.Mock).mockReturnValue(cold('-a|', { a: PasswordLoginStatus.SUCCESS }));
  });

  it('should number be equal router param', async(() => {
    const componentFixture = TestBed.createComponent(PasswordViewComponent);
    const component = componentFixture.componentInstance;
    const mockMsisdnParam = '+48555555555';

    component.ngOnInit();
    componentFixture.whenStable().then(() => {
      expect(component.msisdn).toEqual(mockMsisdnParam);
    });
  }));
});
