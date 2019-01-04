import { async, TestBed } from '@angular/core/testing';
import { AccountService, GetInvoiceDetails } from '@anymind-ng/api';
import { InvoiceDetailsComponentService } from './invoice-details.component.service';
import { Deceiver } from 'deceiver-core';
import { Store } from '@ngrx/store';
import * as fromCore from '@platform/core/reducers';
import { cold } from 'jasmine-marbles';
import { dispatchLoggedUser, importStore } from 'testing/testing';

describe('Service: InvoiceDetailsComponentService', () => {
  let store: Store<fromCore.IState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        InvoiceDetailsComponentService,
        {
          provide: AccountService,
          useValue: Deceiver(AccountService, {
            getInvoiceDetailsRoute: jest.fn(),
          }),
        },
      ],
    });
    store = TestBed.get(Store);
  }));

  it('should get invoice details', () => {
    dispatchLoggedUser(store, { isCompany: true });
    const service = TestBed.get(InvoiceDetailsComponentService);
    const accountService = TestBed.get(AccountService);
    const mockInvoiceDetails: GetInvoiceDetails = {
      id: 'invitationId',
      accountId: 'id',
      invoiceDetailsType: GetInvoiceDetails.InvoiceDetailsTypeEnum.COMPANY,
      companyName: 'Male Psy sp zoo',
      vatNumber: '000000000',
      address: {
        street: 'Mała Łapa',
        streetNumber: '69',
        city: 'Zagacie',
        postalCode: '12-345',
        countryISO: 'pl',
      },
      vatRateType: GetInvoiceDetails.VatRateTypeEnum.COMPANY0,
      createdAt: new Date(),
    };
    const expected = cold('-(b|)', {
      b: {
        invoiceDetails: mockInvoiceDetails,
        isCompanyProfile: true,
      },
    });

    (accountService.getInvoiceDetailsRoute as jest.Mock).mockReturnValue(cold('-a|', { a: mockInvoiceDetails }));
    expect(service.getInvoiceDetails()).toBeObservable(expected);
  });
});
