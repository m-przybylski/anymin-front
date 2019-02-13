import { GetClientComplaint, ServiceUsageEventService } from '@anymind-ng/api';
import { dispatchLoggedUser, importStore, provideMockFactoryLogger } from 'testing/testing';
import { TestBed } from '@angular/core/testing';
import { Deceiver } from 'deceiver-core';
import { cold } from 'jasmine-marbles';
import { Alerts, AlertService, LoggerService } from '@anymind-ng/core';
import { Store } from '@ngrx/store';
import { ComplaintDetailsComponentService } from './complaint-details.component.service';

describe('ComplaintDetailsComponentService', () => {
  let service: ComplaintDetailsComponentService;
  let store: Store<any>;
  let serviceUsageEventService: ServiceUsageEventService;
  let alertService: AlertService;

  const loggerService: LoggerService = Deceiver(LoggerService, {
    warn: jest.fn(),
    error: jest.fn(),
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [importStore()],
      providers: [
        ComplaintDetailsComponentService,
        {
          provide: ServiceUsageEventService,
          useValue: Deceiver(ServiceUsageEventService),
        },
        {
          provide: AlertService,
          useValue: Deceiver(AlertService, {
            pushSuccessAlert: jest.fn(),
            pushDangerAlert: jest.fn(),
          }),
        },
        provideMockFactoryLogger(loggerService),
      ],
    });
  });

  beforeEach(() => {
    store = TestBed.get(Store);
    service = TestBed.get(ComplaintDetailsComponentService);
    serviceUsageEventService = TestBed.get(ServiceUsageEventService);
    alertService = TestBed.get(AlertService);
    (loggerService.warn as jest.Mock).mockClear();
    (loggerService.error as jest.Mock).mockClear();
  });

  it('should show success alert when accept complaint succeed', () => {
    serviceUsageEventService.postExpertAcceptComplaintRoute = jest.fn().mockReturnValue(cold('-a|', { a: undefined }));
    const expected = cold('-a|', { a: undefined });

    expect(service.acceptComplaint('someId')).toBeObservable(expected);
    expect(alertService.pushSuccessAlert).toHaveBeenCalledWith(
      'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.EXPERT_DECISION.ACCEPT.SUCCESS',
    );
  });

  it('should show danger alert and log warn message when accept complaint fails', () => {
    serviceUsageEventService.postExpertAcceptComplaintRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    const expected = cold('-|', {});

    expect(service.acceptComplaint('someId')).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
    expect(loggerService.warn).toHaveBeenCalledWith('error when accept complaint', 'someError');
  });

  it('should show success alert when reject complaint succeed', () => {
    serviceUsageEventService.postExpertRejectComplaintRoute = jest.fn().mockReturnValue(cold('-a|', { a: undefined }));
    const expected = cold('-a|', { a: undefined });

    expect(service.rejectComplaint('someId', 'someReason')).toBeObservable(expected);
    expect(alertService.pushSuccessAlert).toHaveBeenCalledWith(
      'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.EXPERT_DECISION.REJECT.SUCCESS',
    );
  });

  it('should show danger alert and log warn message when reject complaint fails', () => {
    serviceUsageEventService.postExpertRejectComplaintRoute = jest.fn().mockReturnValue(cold('-#', {}, 'someError'));
    const expected = cold('-|', {});

    expect(service.rejectComplaint('someId', 'someReason')).toBeObservable(expected);
    expect(alertService.pushDangerAlert).toHaveBeenCalledWith(Alerts.SomethingWentWrong);
    expect(loggerService.warn).toHaveBeenCalledWith('error when reject complaint', 'someError');
  });

  it('should get user account id', () => {
    dispatchLoggedUser(store, { account: { id: 'accountId' } });
    const expected = cold('(a|)', { a: 'accountId' });

    expect(service.getUserAccountId()).toBeObservable(expected);
  });

  describe('get reason translation key', () => {
    it('should return tr key when complaint type is IMPOLITEEXPERT', () => {
      expect(service.getReasonTrKey(GetClientComplaint.ComplaintTypeEnum.IMPOLITEEXPERT)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.IMPOLITE',
      );
    });

    it('should return tr key when complaint type is INCOMPETENTEXPERT', () => {
      expect(service.getReasonTrKey(GetClientComplaint.ComplaintTypeEnum.INCOMPETENTEXPERT)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.INCOMPETENT',
      );
    });

    it('should return tr key when complaint type is TECHNICALISSUES', () => {
      expect(service.getReasonTrKey(GetClientComplaint.ComplaintTypeEnum.TECHNICALISSUES)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.TECHNICAL',
      );
    });

    it('should return tr key when complaint type is OTHER', () => {
      expect(service.getReasonTrKey(GetClientComplaint.ComplaintTypeEnum.OTHER)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.REASON.OTHER',
      );
    });

    it('should log error when there is unhandled complaint type', () => {
      const wrongComplaintType = 'undefined' as GetClientComplaint.ComplaintTypeEnum;
      service.getReasonTrKey(wrongComplaintType);
      expect(loggerService.error).toHaveBeenCalledWith('unhandled complaint type:', 'undefined');
    });
  });

  describe('get status translation key', () => {
    it('should return tr key when complaint status is ACCEPTEDBYADMIN', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.ACCEPTEDBYADMIN, true)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.ACCEPTED_BY_ADMIN',
      );
    });

    it('should return tr key when complaint status is ACCEPTEDBYEXPERT', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.ACCEPTEDBYEXPERT, true)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.ACCEPTED_BY_EXPERT',
      );
    });

    it('should return tr key when complaint status is IGNOREDBYEXPERT', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.IGNOREDBYEXPERT, true)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_BY_ADMIN',
      );
    });

    it('should return tr key when complaint status is REJECTEDBYEXPERT', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.REJECTEDBYEXPERT, true)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_BY_ADMIN',
      );
    });

    it('should return tr key when complaint status is NEW and is expert', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.NEW, true)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_IN_PROGRESS',
      );
    });

    it('should return tr key when complaint status is NEW and is not expert', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.NEW, false)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_BY_EXPERT',
      );
    });

    it('should return tr key when complaint status is REJECTEDBYADMIN', () => {
      expect(service.getStatusTrKey(GetClientComplaint.StatusEnum.REJECTEDBYADMIN, true)).toBe(
        'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.REJECTED',
      );
    });

    it('should log error when there is unhandled complaint status', () => {
      const wrongComplaintStatus = 'undefined' as GetClientComplaint.StatusEnum;
      service.getStatusTrKey(wrongComplaintStatus, false);
      expect(loggerService.error).toHaveBeenCalledWith('unhandled complaint status:', 'undefined');
    });
  });
});
