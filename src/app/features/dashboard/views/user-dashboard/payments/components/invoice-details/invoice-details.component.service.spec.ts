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
  let service: InvoiceDetailsComponentService;
  let accountService: AccountService;

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
    service = TestBed.get(InvoiceDetailsComponentService);
    accountService = TestBed.get(AccountService);
    dispatchLoggedUser(store, { isCompany: true, session: { country: 'mockIsoCode' } });
  }));

  it('should get initial data', () => {
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
        countryISO: 'mockIsoCode',
      },
      vatRateType: GetInvoiceDetails.VatRateTypeEnum.COMPANY0,
      createdAt: new Date(),
    };
    const expected = cold('-(b|)', {
      b: {
        invoiceDetails: mockInvoiceDetails,
        isCompanyProfile: true,
        countryIsoCode: 'mockIsoCode',
      },
    });

    (accountService.getInvoiceDetailsRoute as jest.Mock).mockReturnValue(cold('-a|', { a: mockInvoiceDetails }));
    expect(service.getInitialData()).toBeObservable(expected);
  });

  it('should throw error when get invoice details failed', () => {
    const err = {
      code: 500,
      error: {},
      message: 'errorMessage',
    };
    const expected = cold('-#', '', err);

    (accountService.getInvoiceDetailsRoute as jest.Mock).mockReturnValue(cold('-#', {}, err));
    expect(service.getInitialData()).toBeObservable(expected);
  });

  it('should get initial data even get invoice details would be not found', () => {
    const err = {
      status: 404,
      error: {},
      message: 'errorMessage',
    };
    const expected = cold('-(b|)', {
      b: {
        invoiceDetails: undefined,
        isCompanyProfile: true,
        countryIsoCode: 'mockIsoCode',
      },
    });

    (accountService.getInvoiceDetailsRoute as jest.Mock).mockReturnValue(cold('-#', {}, err));
    expect(service.getInitialData()).toBeObservable(expected);
  });
});
