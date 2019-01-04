import { AcceptRejectInvitationService, IConsultationDetails } from './accept-reject-invitation.service';
import { InvitationService, ServiceService, FinancesService, GetService } from '@anymind-ng/api';
import { Deceiver } from 'deceiver-core';
import { TestBed } from '@angular/core/testing';
import { provideMockFactoryLogger } from 'testing/testing';
import { cold } from 'jasmine-marbles';
import { AlertService } from '@anymind-ng/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('AcceptRejectInvitationService', () => {
  let service: AcceptRejectInvitationService;

  let invitationService: InvitationService;
  let alertService: AlertService;
  let serviceService: ServiceService;
  let activeModal: NgbActiveModal;
  let financesService: FinancesService;

  beforeEach(() => {
    invitationService = Deceiver(InvitationService, {
      postInvitationAcceptRoute: jest.fn(),
      postInvitationRejectRoute: jest.fn(),
    });
    alertService = Deceiver(AlertService, {
      pushSuccessAlert: jest.fn(),
      pushDangerAlert: jest.fn(),
    });
    serviceService = Deceiver(ServiceService, {
      getServiceRoute: jest.fn(),
      postServicesTagsRoute: jest.fn(),
    });
    activeModal = Deceiver(NgbActiveModal, { close: jest.fn() });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockFactoryLogger(),
        AcceptRejectInvitationService,
        { provide: InvitationService, useValue: invitationService },
        { provide: AlertService, useValue: alertService },
        { provide: ServiceService, useValue: serviceService },
        { provide: FinancesService, useValue: FinancesService },
      ],
    });

    service = TestBed.get(AcceptRejectInvitationService);
    financesService = TestBed.get(FinancesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map data from correct calls', () => {
    const getService: Partial<GetService> = {
      isFreelance: true,
      price: { value: 100, currency: 'PLN' },
      description: 'desc',
    };
    const postServicesTags: any = [{ tags: [{ name: 'asd' }, { name: 'sdf' }, { name: 'dfg' }] }];
    const result: IConsultationDetails = {
      isFreelance: true,
      price: { value: 100, currency: 'PLN' },
      serviceDescription: 'desc',
      tagList: ['asd', 'sdf', 'dfg'],
      getCommissions: {
        profileAmount: { value: 100, currency: 'PLN' },
      },
    };
    const getServiceRoute = cold('-(a|)', { a: getService });
    const postServicesTagsRoute = cold('--(a|)', { a: postServicesTags });
    const postCommissions = cold('(a|)', { a: { profileAmount: { value: 100, currency: 'PLN' } } });
    const expected = cold('--(a|)', { a: result });
    const sessionService: ServiceService = TestBed.get(ServiceService);
    sessionService.getServiceRoute = jest.fn(() => getServiceRoute);
    sessionService.postServicesTagsRoute = jest.fn(() => postServicesTagsRoute);
    financesService.postCommissionsRoute = jest.fn(() => postCommissions);

    expect(service.getInvitationDetails({ id: '1234' } as any)).toBeObservable(expected);
  });

  describe('Accept/reject', () => {
    it('should call accept invite, close modal and show message', () => {
      const postInvitationAcceptRoute = cold('-(a|)', { a: undefined });
      const expected = cold('-(a|)', { a: undefined });
      (invitationService.postInvitationAcceptRoute as jest.Mock).mockReturnValue(postInvitationAcceptRoute);

      expect(service.acceptInvitation('asdf', activeModal)).toBeObservable(expected);
      expect(activeModal.close).toHaveBeenCalledWith('asdf');
      expect(alertService.pushSuccessAlert).toHaveBeenCalledWith('INVITE_ACCEPT_REJECT.ACCEPT.SUCCESS');
    });

    it('should call not accept invite, not close modal and show message on error', () => {
      const postInvitationAcceptRoute = cold('-#', {});
      const expected = cold('-#', {});
      (invitationService.postInvitationAcceptRoute as jest.Mock).mockReturnValue(postInvitationAcceptRoute);

      expect(service.acceptInvitation('asdf', activeModal)).toBeObservable(expected);
      expect(activeModal.close).not.toHaveBeenCalled();
      expect(alertService.pushDangerAlert).toHaveBeenCalledWith('INVITE_ACCEPT_REJECT.ACCEPT.FAILURE');
    });

    it('should call reject invite, close modal and show message', () => {
      const postInvitationAcceptRoute = cold('-(a|)', { a: undefined });
      const expected = cold('-(a|)', { a: undefined });
      (invitationService.postInvitationRejectRoute as jest.Mock).mockReturnValue(postInvitationAcceptRoute);

      expect(service.rejectInvitation('asdf', activeModal)).toBeObservable(expected);
      expect(activeModal.close).toHaveBeenCalledWith('asdf');
      expect(alertService.pushSuccessAlert).toHaveBeenCalledWith('INVITE_ACCEPT_REJECT.REJECT.SUCCESS');
    });
  });
});
