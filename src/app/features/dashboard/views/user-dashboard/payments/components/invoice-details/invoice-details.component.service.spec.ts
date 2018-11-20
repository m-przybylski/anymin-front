import { async, TestBed } from '@angular/core/testing';
import { AccountService, GetCompanyInvoiceDetails } from '@anymind-ng/api';
import { InvoiceDetailsComponentService } from './invoice-details.component.service';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { ICompanyInvoiceDetails } from './components/company-invoice-details/company-invoice-details.component';

describe('Service: InvoiceDetailsComponentService', () => {
  const accountService: AccountService = Deceiver(AccountService);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        InvoiceDetailsComponentService,
        {
          provide: AccountService,
          useValue: accountService,
        },
      ],
    });
  }));

  it('should get company invoice details', () => {
    const response: GetCompanyInvoiceDetails = {
      id: 'someId',
      accountId: 'someAccountId',
      vatNumber: '0000',
      companyName: 'Strzyżenie Psów sp z o.o.',
      vat: 0,
      address: {
        address: 'Wielka lapa 69',
        postalCode: '12-345',
        city: 'Sosnowiec',
        countryISO: 'sos',
      },
      email: 'szybkoTanioProfesjonalnie@psy.pl',
      createdAt: new Date(),
    };
    accountService.getCompanyPayoutInvoiceDetailsRoute = jasmine
      .createSpy('getCompanyPayoutInvoiceDetailsRoute')
      .and.returnValue(cold('-a|', { a: response }));
    const service = new InvoiceDetailsComponentService(accountService);

    const result: ICompanyInvoiceDetails = {
      vatNumber: '0000',
      companyName: 'Strzyżenie Psów sp z o.o.',
      address: 'Wielka lapa 69',
      city: 'Sosnowiec',
      postalCode: '12-345',
      email: 'szybkoTanioProfesjonalnie@psy.pl',
    };
    const expected = cold('-a|', { a: result });

    expect(service.getInvoiceDetails()).toBeObservable(expected);
  });
});
