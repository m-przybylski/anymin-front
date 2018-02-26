import * as angular from 'angular'
import { ModalsService } from './modals.service'
import modalsModule from './modals'
import dialogModule from '../dialog/dialog'
import { DialogService } from '../dialog/dialog.service'
import { GetExpertSueDetails, GetClientActivity, GetExpertServiceDetails, GetProfile,
  GetService } from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.services.modals >', () => {
  describe('for profitelo.services.modals >', () => {

    let modalsService: ModalsService

    beforeEach(() => {
      angular.mock.module(modalsModule)
      angular.mock.module(dialogModule)
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      modalsService = $injector.get<ModalsService>('modalsService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should create IncomingCallModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createIncomingCallModal(<GetExpertSueDetails>{}, () => {
      }, () => {
      })

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create NoFundsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createNoFundsModal(() => {
      }, () => {
      })

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create ServiceUnavailableModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createServiceUnavailableModal(() => {
      }, () => {
      })

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createExpertConsultationSummaryModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createExpertConsultationSummaryModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientSUEActivityDetailsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientSUEActivityDetailsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientComplainReportModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientComplainReportModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralPhoneSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralPhoneSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createBasicAccountSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createBasicAccountSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralPhoneSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralPhoneSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralEmailSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralEmailSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralCountrySettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralCountrySettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createSecurityChangePasswordSettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createSecurityChangePasswordSettingsModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createSecurityPinSecuritySettingsModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createSecurityPinSecuritySettingsModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createAddPaymentMethodControllerModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createAddPaymentMethodControllerModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createEditCompanyInvoiceControllerModal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createEditCompanyInvoiceControllerModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open rtc detector blocked modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createRtcDetectorBlockedModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open client charge details modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientChargeDetailsModal(<GetClientActivity>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open rtc detector modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createRtcDetectorModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open browser does not support rtc modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createBrowserDoesNotSupportRtcModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open consultation modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createConsultationModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open consultation form modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')
      modalsService.createServiceFormModal(() => {}, <GetExpertServiceDetails>{})
      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open expert invite employees modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')
      modalsService.createExpertInviteEmployeesModal(() => {})
      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should open precall modal', inject((dialogService: DialogService) => {
      spyOn(dialogService, 'openDialog')
      modalsService.createPrecallModal(<GetService>{}, <GetProfile>{}, <MediaStream>{})
      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

  })
})
