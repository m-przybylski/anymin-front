import { ConsultationFooterUserComponent, MiddlePanelStatusTypes } from './consultation-footer-user.component';
import { TestBed, async } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { PaymentCardModule } from '@platform/shared/components/pipes/payment-card';
import {
  CONSULTATION_FOOTER_DATA,
  IConsultationFooterData,
} from '@platform/shared/components/modals/consultation-details/consultation-footers/consultation-footer-helpers';
import { provideMockFactoryLogger } from 'testing/testing';

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
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;

    expect(consultationFooterUserComponent.middlePanel).toEqual(MiddlePanelStatusTypes.paymentCard);
  });

  it('should return false isExpertAvailable if userId is not provided', () => {
    data = {
      ownerId: 'asdf',
      expertsIdList: [] as any,
      isExpertAvailable: true,
      isFreelance: false,
      userId: undefined,
      price: { value: 100, currency: 'PLN' },
      defaultPaymentMethod: {},
      creditCards: [],
    };
    const componentFixture = TestBed.createComponent(ConsultationFooterUserComponent);
    consultationFooterUserComponent = componentFixture.componentInstance;

    expect(consultationFooterUserComponent.isExpertAvailable).toEqual(true);
  });
});
