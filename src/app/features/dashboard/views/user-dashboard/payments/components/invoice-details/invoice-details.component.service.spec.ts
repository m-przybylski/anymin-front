import { async, TestBed } from '@angular/core/testing';
import { AccountService } from '@anymind-ng/api';
import { InvoiceDetailsComponentService } from './invoice-details.component.service';
import { Deceiver } from 'deceiver-core';

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
  // TODO FIX_NEW_FINANCE_MODEL
  // it('should get company invoice details', () => {
  //   const response: GetInvoiceDetails = {
  //     id: 'someId',
  //     accountId: 'someAccountId',
  //     vatNumber: '0000',
  //     companyName: 'Strzyżenie Psów sp z o.o.',
  //     invoiceDetailsType: InvoiceDetailsTypeEnum.COMPANY,
  //     address: {
  //       street: 'Wielka lapa',
  //       streetNumber: '8210',
  //       postalCode: '12-345',
  //       city: 'Sosnowiec',
  //       countryISO: 'sos',
  //     },
  //     createdAt: new Date(),
  //   };
  //   accountService.postCompanyDetailsRoute = jasmine
  //     .createSpy('getCompanyPayoutInvoiceDetailsRoute')
  //     .and.returnValue(cold('-a|', { a: response }));
  //   const service = new InvoiceDetailsComponentService(accountService);
  //
  //   const result: ICompanyInvoiceDetails = {
  //     vatNumber: '0000',
  //     companyName: 'Strzyżenie Psów sp z o.o.',
  //     address: 'Wielka lapa 69',
  //     city: 'Sosnowiec',
  //     postalCode: '12-345',
  //     email: 'szybkoTanioProfesjonalnie@psy.pl',
  //   };
  //   const expected = cold('-a|', { a: result });
  //
  //   expect(service.getInvoiceDetails()).toBeObservable(expected);
  // });
});
