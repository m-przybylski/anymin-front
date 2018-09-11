import {
  ConsultationFooterWrapperComponent,
  LeftPanelStatusTypes,
  RightPanelStatusTypes,
  MiddlePanelStatusTypes,
} from './consultation-footer-wrapper.component';
import { ICommission } from '@platform/core/commission';
import { Deceiver } from 'deceiver-core';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
describe('ConsultationFooterWrapperComponent', () => {
  let component: ConsultationFooterWrapperComponent;
  const loggerFactory: LoggerFactory = Deceiver(LoggerFactory, {
    createLoggerService: jasmine.createSpy('createLoggerService').and.returnValue(Deceiver(LoggerService)),
  });
  const commissionConfig: ICommission = {
    freelanceConsultationAnyMindCommission: 0.25,
    freelanceConsultationCompanyCommission: 0.25,
    employeeServiceAnyMindCommission: 0.15,
    percentDivider: 100,
    numberPrecision: 2,
  };
  beforeEach(() => {
    component = new ConsultationFooterWrapperComponent(commissionConfig, loggerFactory);
  });
  describe('leftPanel', () => {
    it('should return showAmount in most cases xD', () => {
      expect(component.leftPanel).toEqual(LeftPanelStatusTypes.showAmount);
    });

    it(`should return hideAmount if
        consulatation belongs to organization
        and user is an expert
        and consulataion is not freelance`, () => {
      component.payload = {
        ownerId: 'asd',
        userId: 'asdg',
        isFreelance: false,
        expertsIdList: ['asdg', 'aaaa', 'bbb'],
      } as any;
      expect(component.leftPanel).toEqual(LeftPanelStatusTypes.hideAmount);
    });
  });
  describe('rightPanel', () => {
    it('should return canEdit when user is the owner of consultation', () => {
      component.payload = {
        userId: 'asdf',
        ownerId: 'asdf',
      } as any;
      expect(component.rightPanel).toEqual(RightPanelStatusTypes.canEdit);
    });

    it('should return canLeave when user is on the list of experts', () => {
      component.payload = {
        userId: 'asdf',
        expertsIdList: ['buka', 'luka', 'asdf'],
      } as any;
      expect(component.rightPanel).toEqual(RightPanelStatusTypes.canLeave);
    });

    it('should return canCall when expert is available', () => {
      component.payload = {
        ownerId: 'aaa',
        expertsIdList: [],
        isExpertAvailable: true,
      } as any;
      expect(component.rightPanel).toEqual(RightPanelStatusTypes.canCall);
    });

    it('should return canNotify when expert expert is not available', () => {
      component.payload = {
        ownerId: 'aaa',
        expertsIdList: [],
        isExpertAvailable: false,
      } as any;
      expect(component.rightPanel).toEqual(RightPanelStatusTypes.canNotify);
    });
  });
  describe('middlePanel', () => {
    it('should return freeMinute when user is not logged', () => {
      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.freeMinute);
    });
    it(`should return notAvailable when
        expert is not avaibale
        and consultation does not belong to user
        and user is not on experts list`, () => {
      component.payload = {
        isExpertAvailable: false,
        userId: 'aaa',
        expertsIdList: [],
        isFreelance: false,
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.notAvailable);
    });
    it('should return paymentAnyMind when no card is added', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        expertsIdList: [],
        defaultPayment: {},
        isFreelance: false,
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.paymentAnyMind);
    });
    it('should return paymentCard when credit card is added is added', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        expertsIdList: [],
        defaultPayment: {
          card: {
            isDefault: true,
            maskedNumber: '** 4940',
            id: 'asdfff',
            expiryDate: 'now',
            cardType: 'AMEX',
            createdAt: Date.now(),
          },
        },
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.paymentCard);
    });
    it('should return isOrganization when user is an expert and not owner and not freelance', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        ownerId: 'bbb',
        expertsIdList: ['ggg', 'aaa', 'asdf'],
        isFreelance: false,
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.isOrganization);
    });
    it('should return isOrganizationEdit when user is an owner consultations is freelance', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        ownerId: 'aaa',
        expertsIdList: ['ggg', 'asdf'],
        isFreelance: true,
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.isOrganizationEdit);
    });
    it('should return isFreelance when consultations is freelance', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        ownerId: 'bbb',
        expertsIdList: ['aaa'],
        isFreelance: true,
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.isFreelance);
    });
    it('should return isFreelance when user is an expert in freelance consultation', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        ownerId: 'aaa',
        expertsIdList: ['aaa'],
        isFreelance: true,
      } as any;

      expect(component.middlePanel).toEqual(MiddlePanelStatusTypes.isFreelance);
    });
  });
  describe('comissionCalculation', () => {
    it('should calculate duration and commision', () => {
      const ten = 10;
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        expertsIdList: [],
        price: {
          grossPrice: {
            amount: 100,
            currency: 'PLN',
          },
          price: {
            amount: 200,
            currency: 'PLN',
          },
        },
        accountBalance: {
          amount: 1000,
          currency: 'PLN',
        },
        defaultPayment: {
          card: {
            isDefault: true,
            maskedNumber: '** 4940',
            id: 'asdfff',
            expiryDate: 'now',
            cardType: 'AMEX',
            createdAt: Date.now(),
          },
        },
      } as any;

      // duration is account balance amount devicec by gross price
      expect(component.duration).toBe(ten);
      // organization cut is calcylated by commission input
      expect(component.organizationPrice).toBe('0,50');
      // expert cut is a difference between net price and organization plus AnyMind cut
      expect(component.expertPrice).toBe('1,00');
    });
    it('should calculate duration as 0 when consultation is free', () => {
      component.payload = {
        isExpertAvailable: true,
        userId: 'aaa',
        expertsIdList: [],
        price: {
          grossPrice: {
            amount: 0,
            currency: 'PLN',
          },
          price: {
            amount: 200,
            currency: 'PLN',
          },
        },
        accountBalance: {
          amount: 1000,
          currency: 'PLN',
        },
      } as any;
      expect(component.duration).toBe(0);
    });
  });
});
