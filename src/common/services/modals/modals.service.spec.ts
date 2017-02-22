namespace profitelo.services.modals {

  import IDialogService = profitelo.services.dialog.IDialogService
  import GetService = profitelo.api.GetService

  describe('Unit testing: profitelo.services.modals >', () => {
  describe('for profitelo.services.modals >', () => {

    let modalsService: IModalsService

    beforeEach(() => {
    angular.mock.module('profitelo.services.modals')
    angular.mock.module('profitelo.services.dialog')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      modalsService = $injector.get<IModalsService>('modalsService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should create IncomingCallModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createIncomingCallModal(<GetService>{}, () => {}, () => {})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create NoFundsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createNoFundsModal(() => {}, () => {})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create ServiceUnavailableModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createServiceUnavailableModal(() => {}, () => {})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientConsultationSummaryModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientConsultationSummaryModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createExpertConsultationSummaryModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createExpertConsultationSummaryModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientSUEActivityDetailsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientSUEActivityDetailsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientComplainReportModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientComplainReportModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralPhoneSettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralPhoneSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createBasicAccountSettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createBasicAccountSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralPhoneSettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralPhoneSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralEmailSettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralEmailSettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createGeneralCountrySettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createGeneralCountrySettingsModal(<any>{})

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createSecurityChangePasswordSettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createSecurityChangePasswordSettingsModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createSecurityPinSecuritySettingsModal', inject((dialogService: IDialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createSecurityPinSecuritySettingsModal()

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

  })
})
}
