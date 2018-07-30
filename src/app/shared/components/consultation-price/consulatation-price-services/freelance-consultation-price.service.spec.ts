import { TestBed } from '@angular/core/testing';
import { FreelanceConsultationPriceService } from './freelance-consultation-price.service';

describe('Service: FreelanceConsultationPriceService', () => {
  const tax = 0.23;
  const commission = 0.15;
  const freelanceConsultationPriceService = new FreelanceConsultationPriceService(tax, commission);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FreelanceConsultationPriceService],
    });
  });

  it('should get price without commission', () => {
    const value = 6;
    const expectedValue = 4.15;
    expect(freelanceConsultationPriceService.getPriceWithoutCommission(value)).toEqual(expectedValue);
  });

  it('should get min valid price without commission', () => {
    const expectedValue = 85;
    expect(freelanceConsultationPriceService.getMinValidPriceWithoutCommission()).toEqual(expectedValue);
  });

  it('should get max valid price without commission', () => {
    const expectedValue = 6841;
    expect(freelanceConsultationPriceService.getMaxValidPriceWithoutCommission()).toEqual(expectedValue);
  });

  it('should get min gross valid price', () => {
    const expectedValue = 123;
    expect(freelanceConsultationPriceService.getMinGrossValidPrice()).toEqual(expectedValue);
  });

  it('should get nett price', () => {
    const value = 6;
    const expectedValue = 706;
    expect(freelanceConsultationPriceService.getNettPrice(value)).toEqual(expectedValue);
  });

  it('should get gross price', () => {
    const value = 6;
    const expectedValue = 8.68;
    expect(freelanceConsultationPriceService.getGrossPrice(value)).toEqual(expectedValue);
  });
});
