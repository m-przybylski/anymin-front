import { ConsultationFooterUserComponent, MiddlePanelStatusTypes } from './consultation-footer-user.component';
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { PaymentCardModule } from '@platform/shared/components/pipes/payment-card';
import {
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { provideMockFactoryLogger } from 'testing/testing';
import { Router } from '@angular/router';
import { Deceiver } from 'deceiver-core';
import { ExpertAvailabilityService } from '@platform/features/dashboard/components/expert-availability/expert-availablity.service';
import { cold } from 'jasmine-marbles';
import { CallStatusService } from '@platform/shared/components/modals/consultation-details/call-status.service';
import { Observable } from 'rxjs';

@Pipe({
  name: 'translate',
})
class PipeName implements PipeTransform {
  // tslint:disable-next-line:typedef
  public transform = (_: any) => _;
}

describe('ConsultationFooterUserComponent', () => {
  let consultationFooterUserComponent: ConsultationFooterUserComponent;
  let data: IConsultationFooterData = {} as any;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [PaymentCardModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ConsultationFooterUserComponent, PipeName],
      providers: [
        {
          provide: CONSULTATION_FOOTER_DATA,
          useFactory: (): IConsultationFooterData => data,
        },
        {
          provide: Router,
          useValue: Deceiver(Router, { navigate: jest.fn() }),
        },
        {
          provide: ExpertAvailabilityService,
          useValue: Deceiver(ExpertAvailabilityService, { getExpertPresence: jest.fn() }),
        },
        {
          provide: CallStatusService,
          useValue: Deceiver(CallStatusService, { callStatus$: new Observable<boolean>() }),
        },
        provideMockFactoryLogger(),
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;
    expect(consultationFooterUserComponent).toBeTruthy();
  });
  it('should return MiddlePanelStatusTypes.notAvailable when expert is not available ', () => {
    data = {
      ownerId: 'asdf',
      expertsIdList: [] as any,
      isExpertAvailable: false,
      isFreelance: false,
      userId: '1234',
      price: { value: 100, currency: 'PLN' },
      defaultPaymentMethod: {
        creditCardId: 'id',
      },
      creditCards: [],
      getCommissions: {
        profileAmount: { value: 100, currency: 'PLN' },
      },
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;

    expect(consultationFooterUserComponent.middlePanel).toEqual(MiddlePanelStatusTypes.notAvailable);
  });
  it('should return MiddlePanelStatusTypes.freeMinute when user is not logged', () => {
    data = {
      ownerId: 'asdf',
      expertsIdList: [] as any,
      isExpertAvailable: true,
      isFreelance: false,
      price: { value: 123, currency: 'PLN' },
      defaultPaymentMethod: {
        creditCardId: 'id',
      },
      creditCards: [],
      getCommissions: {
        profileAmount: { value: 123, currency: 'PLN' },
      },
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;

    expect(consultationFooterUserComponent.middlePanel).toEqual(MiddlePanelStatusTypes.freeMinute);
  });
  it('should return MiddlePanelStatusTypes.freeMinute when user is not logged', () => {
    data = {
      ownerId: 'asdf',
      expertsIdList: ['asdf'] as any,
      isExpertAvailable: true,
      isFreelance: false,
      price: { value: 123, currency: 'PLN' },
      defaultPaymentMethod: {
        creditCardId: 'id',
      },
      creditCards: [],
      getCommissions: {
        profileAmount: { value: 123, currency: 'PLN' },
      },
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;

    expect(consultationFooterUserComponent.middlePanel).toEqual(MiddlePanelStatusTypes.freeMinute);
  });

  it('should return MiddlePanelStatusTypes.paymentCard when user has card assigned', () => {
    data = {
      ownerId: 'asdf',
      expertsIdList: [] as any,
      isExpertAvailable: true,
      isFreelance: false,
      userId: '123',
      price: { value: 123, currency: 'PLN' },
      defaultPaymentMethod: {
        creditCardId: 'id',
      },
      creditCards: [],
      getCommissions: {
        profileAmount: { value: 123, currency: 'PLN' },
      },
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;

    expect(consultationFooterUserComponent.middlePanel).toEqual(MiddlePanelStatusTypes.paymentCard);
  });

  it('should return true isExpertAvailable if userId is not provided', () => {
    data = {
      ownerId: 'asdf',
      expertsIdList: [] as any,
      isExpertAvailable: true,
      isFreelance: false,
      userId: undefined,
      price: { value: 100, currency: 'PLN' },
      defaultPaymentMethod: {},
      creditCards: [],
      getCommissions: {
        profileAmount: { value: 100, currency: 'PLN' },
      },
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;
    consultationFooterUserComponent.ngOnInit();
    componentFixture.detectChanges();
    expect(componentFixture).toMatchSnapshot();
  });
});
