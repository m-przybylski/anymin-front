import { GetInvitation, InvitationService } from '@anymind-ng/api';
import { inject, TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { AlertService, LoggerService } from '@anymind-ng/core';
import { InvitationsApiActions, InvitationsActions } from '../../actions/index';
import { InvitationsEffects } from '../invitations/invitations.effects';

import { provideMockFactoryLogger } from '../../../../testing/testing';

describe('InvitationsEffects', () => {
  let invitationsEffects: InvitationsEffects;
  let alertService: AlertService;
  let invitationService: InvitationService;
  let actions$: Observable<any>;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jest.fn(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        InvitationsEffects,
        {
          provide: InvitationService,
          useValue: Deceiver(InvitationService, {
            getInvitationsRoute: jest.fn(),
          }),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushDangerAlert: jest.fn(),
          }),
        },
        provideMockFactoryLogger(loggerService),
        provideMockActions(() => actions$),
      ],
    });
    invitationsEffects = TestBed.get(InvitationsEffects);
    invitationService = TestBed.get(InvitationService);
    alertService = TestBed.get(AlertService);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', inject([InvitationService], (service: InvitationService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a FetchApiInvitationsAction when success', () => {
    const invitationList: ReadonlyArray<GetInvitation> = [
      {
        id: 'id',
        serviceId: 'serviceId',
        serviceName: 'serviceName',
        serviceOwnerId: 'serviceOwnerId',
        email: 'test@anymind.com',
        msisdn: '555999005',
        employeeId: 'employeeId',
        status: 'NEW',
        displayedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const action = new InvitationsActions.FetchInvitationsAction();
    const result = new InvitationsApiActions.FetchApiInvitationsSuccessAction(invitationList.length);

    actions$ = hot('-a---', { a: action });
    const response = cold('-a|', { a: invitationList });
    const expected = cold('--b', { b: result });

    invitationService.getInvitationsRoute = jest.fn(() => response);
    expect(invitationsEffects.fetchInvitationsList$).toBeObservable(expected);
  });
  it('should return a InvitationsApiActions when error', () => {
    const action = new InvitationsActions.FetchInvitationsAction();
    const result = new InvitationsApiActions.FetchApiInvitationsErrorAction();

    actions$ = hot('-a---', { a: action });
    const response = cold('-#', {});
    const expected = cold('--b', { b: result });

    invitationService.getInvitationsRoute = jest.fn(() => response);
    expect(invitationsEffects.fetchInvitationsList$).toBeObservable(expected);
  });
});
