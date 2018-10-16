import * as angular from 'angular'
import { ModalsService } from './modals.service'
import modalsModule from './modals'
import dialogModule from '../dialog/dialog'
import { DialogService } from '../dialog/dialog.service'
import {
  GetClientActivity
} from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.services.modals >', () => {
  describe('for profitelo.services.modals >', () => {
    let modalsService: ModalsService;

    beforeEach(() => {
      angular.mock.module(modalsModule);
      angular.mock.module(dialogModule);
    });

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      modalsService = $injector.get<ModalsService>('modalsService');
    }));

    it('should have a dummy test', () => {
      expect(true).toBeTruthy();
    });

    it('should create createClientSUEActivityDetailsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createClientSUEActivityDetailsModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createClientComplainReportModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createClientComplainReportModal();

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createGeneralPhoneSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createGeneralPhoneSettingsModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createBasicAccountSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createBasicAccountSettingsModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createGeneralPhoneSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createGeneralPhoneSettingsModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createGeneralEmailSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createGeneralEmailSettingsModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createGeneralCountrySettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createGeneralCountrySettingsModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createSecurityChangePasswordSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createSecurityChangePasswordSettingsModal();

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createAddPaymentMethodControllerModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createAddPaymentMethodControllerModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should create createEditCompanyInvoiceControllerModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createEditCompanyInvoiceControllerModal(<any>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should open client charge details modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createClientChargeDetailsModal(<GetClientActivity>{});

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should open consultation modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');

      modalsService.createConsultationModal();

      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should open consultation form modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog');
      modalsService.createServiceFormModal(() => {}, <any>{});
      expect(dialogService.openDialog).toHaveBeenCalled();
    }));

    it('should open expert invite employees modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')
      modalsService.createExpertInviteEmployeesModal(() => {
      })
      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

  })
})
