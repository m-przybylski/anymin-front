import { TestBed } from '@angular/core/testing';
import { ConsultationPriceComponentService } from './consultation-price.component.service';
import { Config } from '../../../../config';

describe('Service: DefaultConsultationPriceService', () => {
  const service = new ConsultationPriceComponentService('pl', {
    freelanceConsultationAnyMindCommission: 0.07,
    freelanceConsultationCompanyCommission: 0.1,
    employeeServiceAnyMindCommission: 0,
    percentDivider: 100,
    numberPrecision: 2,
    moneyDivider: Config.moneyDivider,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsultationPriceComponentService],
    });
  });

  it('should get price after AnyMind commission in freelance service', () => {
    const value = 6;
    expect(service.getPriceAfterAnyMindCommission(value, true)).toEqual('5,58');
  });

  it('should get price after AnyMind commission in employee service', () => {
    const value = 6;
    expect(service.getPriceAfterAnyMindCommission(value, false)).toEqual('6,00');
  });

  it('should get input price model when value is without decimals', () => {
    const val = 0;
    expect(service.createInputPriceModel(val)).toEqual('0,00');
  });

  it('should get input price model when value has decimals', () => {
    const val = 0.1;
    expect(service.createInputPriceModel(val)).toEqual('0,10');
  });

  it('should get input price model when value has hundredths', () => {
    const val = 0.01;
    expect(service.createInputPriceModel(val)).toEqual('0,01');
  });

  it('should get AnyMind commission for freelance consultation', () => {
    expect(service.getAnyMindCommission(true)).toEqual('- 7%');
  });

  it('should get AnyMind commission for employee consultation', () => {
    expect(service.getAnyMindCommission(false)).toEqual('- 0%');
  });

  it('should get freelancer profit', () => {
    const val = 2.3;
    expect(service.getFreelancerProfit(val)).toEqual('1,91');
  });
});
