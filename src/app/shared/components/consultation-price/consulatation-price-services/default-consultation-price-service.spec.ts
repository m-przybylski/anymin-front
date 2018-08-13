import { TestBed } from '@angular/core/testing';
import { DefaultConsultationPriceService } from './default-consultation-price.service';

describe('Service: DefaultConsultationPriceService', () => {

  const tax = 0.23;
  const commission = 0.15;
  const defaultConsultationPriceService = new DefaultConsultationPriceService(tax, commission);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DefaultConsultationPriceService
      ]
    });
  });

  it('should get price without commission', () => {
    const value = 6;
    const expectedValue = 4.24;
    expect(defaultConsultationPriceService.getPriceWithoutCommission(value)).toEqual(expectedValue);
  });

  it('should get min valid price without commission', () => {
    const expectedValue = 87;
    expect(defaultConsultationPriceService.getMinValidPriceWithoutCommission()).toEqual(expectedValue);
  });

  it('should get max valid price without commission', () => {
    const expectedValue = 6999;
    expect(defaultConsultationPriceService.getMaxValidPriceWithoutCommission()).toEqual(expectedValue);
  });

  it('should get min gross valid price', () => {
    const expectedValue = 123;
    expect(defaultConsultationPriceService.getMinGrossValidPrice()).toEqual(expectedValue);
  });

  it('should get nett price', () => {
    const value = 6;
    const expectedValue = 690;
    expect(defaultConsultationPriceService.getNettPrice(value)).toEqual(expectedValue);
  });

  it('should get gross price', () => {
    const value = 6;
    const expectedValue = 8.49;
    expect(defaultConsultationPriceService.getGrossPrice(value)).toEqual(expectedValue);
  });

});
