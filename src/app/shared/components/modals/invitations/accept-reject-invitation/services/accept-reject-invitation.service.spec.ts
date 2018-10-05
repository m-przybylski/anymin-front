import { AcceptRejectInvitationService, IConsultationDetails } from './accept-reject-invitation.service';
import { InvitationService, ServiceService, GetService, GetServiceGrossPrice } from '@anymind-ng/api';
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

  beforeEach(() => {
    invitationService = Deceiver(InvitationService, {
      postInvitationAcceptRoute: jasmine.createSpy('postInvitationAcceptRoute'),
      postInvitationRejectRoute: jasmine.createSpy('postInvitationRejectRoute'),
    });
    alertService = Deceiver(AlertService, {
      pushSuccessAlert: jasmine.createSpy('pushSuccessAlert'),
      pushDangerAlert: jasmine.createSpy('pushDangerAlert'),
    });
    serviceService = Deceiver(ServiceService, {
      getServiceRoute: jasmine.createSpy('getServiceRoute'),
      getServiceGrossPriceRoute: jasmine.createSpy('getServiceGrossPriceRoute'),
      postServicesTagsRoute: jasmine.createSpy('postServicesTagsRoute'),
    });
    activeModal = Deceiver(NgbActiveModal, { close: jasmine.createSpy('close') });
  });
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockFactoryLogger(),
        AcceptRejectInvitationService,
        { provide: InvitationService, useValue: invitationService },
        { provide: AlertService, useValue: alertService },
        { provide: ServiceService, useValue: serviceService },
      ],
    });

    service = TestBed.get(AcceptRejectInvitationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should map data from correct calls', () => {
    const getService: Partial<GetService> = {
      isFreelance: true,
      price: { amount: 100, currency: 'PLN' },
      description: 'desc',
    };
    const getServiceGrossPrice: Partial<GetServiceGrossPrice> = { price: { amount: 123, currency: 'PLN' } };
    const postServicesTags: any = [{ tags: [{ name: 'asd' }, { name: 'sdf' }, { name: 'dfg' }] }];
    const result: IConsultationDetails = {
      isFreelance: true,
      grossPrice: { amount: 123, currency: 'PLN' },
      price: { amount: 100, currency: 'PLN' },
      serviceDescription: 'desc',
      tagList: ['asd', 'sdf', 'dfg'],
    };
    const getServiceRoute = cold('-(a|)', { a: getService });
    const getServiceGrossPriceRoute = cold('--(a|)', { a: getServiceGrossPrice });
    const postServicesTagsRoute = cold('--(a|)', { a: postServicesTags });
    const expected = cold('--(a|)', { a: result });

    const sessionService = TestBed.get(ServiceService);
    sessionService.getServiceRoute.and.returnValue(getServiceRoute);
    sessionService.getServiceGrossPriceRoute.and.returnValue(getServiceGrossPriceRoute);
    sessionService.postServicesTagsRoute.and.returnValue(postServicesTagsRoute);

    expect(service.getInvitationDetails({ id: '1234' } as any)).toBeObservable(expected);
  });

  describe('Accept/reject', () => {
    it('should call accept invite, close modal and show message', () => {
      const postInvitationAcceptRoute = cold('-(a|)', { a: undefined });
      const expected = cold('-(a|)', { a: undefined });
      (invitationService.postInvitationAcceptRoute as jasmine.Spy).and.returnValue(postInvitationAcceptRoute);

      expect(service.acceptInvitation('asdf', activeModal)).toBeObservable(expected);
      expect(activeModal.close).toHaveBeenCalledWith('asdf');
      expect(alertService.pushSuccessAlert).toHaveBeenCalledWith('INVITE_ACCEPT_REJECT.ACCEPT.SUCCESS');
    });

    it('should call not accept invite, not close modal and show message on error', () => {
      const postInvitationAcceptRoute = cold('-#', {});
      const expected = cold('-#', {});
      (invitationService.postInvitationAcceptRoute as jasmine.Spy).and.returnValue(postInvitationAcceptRoute);

      expect(service.acceptInvitation('asdf', activeModal)).toBeObservable(expected);
      expect(activeModal.close).not.toHaveBeenCalled();
      expect(alertService.pushDangerAlert).toHaveBeenCalledWith('INVITE_ACCEPT_REJECT.ACCEPT.FAILURE');
    });

    it('should call reject invite, close modal and show message', () => {
      const postInvitationAcceptRoute = cold('-(a|)', { a: undefined });
      const expected = cold('-(a|)', { a: undefined });
      (invitationService.postInvitationRejectRoute as jasmine.Spy).and.returnValue(postInvitationAcceptRoute);

      expect(service.rejectInvitation('asdf', activeModal)).toBeObservable(expected);
      expect(activeModal.close).toHaveBeenCalledWith('asdf');
      expect(alertService.pushSuccessAlert).toHaveBeenCalledWith('INVITE_ACCEPT_REJECT.REJECT.SUCCESS');
    });
  });
});
