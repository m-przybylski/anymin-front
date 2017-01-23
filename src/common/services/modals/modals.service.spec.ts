describe('Unit testing: profitelo.services.modals >', () => {
  describe('for profitelo.services.modals >', () => {

    let modalsService

    beforeEach(() => {
    angular.mock.module('profitelo.services.modals')
    angular.mock.module('profitelo.services.dialog')
    })

    beforeEach(inject(($injector) => {
      modalsService = $injector.get('modalsService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should create IncomingCallModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createIncomingCallModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create NoFundsModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createNoFundsModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create ServiceUnavailableModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createServiceUnavailableModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientConsultationSummaryModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientConsultationSummaryModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createExpertConsultationSummaryModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createExpertConsultationSummaryModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientSUEActivityDetailsModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientSUEActivityDetailsModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientComplainReportModal', inject((dialogService) => {
      spyOn(dialogService, 'openDialog')

      modalsService.createClientComplainReportModal({}, _ => _, _ => _)

      expect(dialogService.openDialog).toHaveBeenCalled()
    }))
  })
})
