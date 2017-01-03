describe('Unit testing: profitelo.services.modals >', () => {
  describe('for profitelo.services.modals >', () => {

    let modalsService

    beforeEach(() => {
    angular.mock.module('profitelo.services.modals')
    angular.mock.module('profitelo.services.dialog-service')
    })

    beforeEach(inject(($injector) => {
      modalsService = $injector.get('modalsService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should create IncomingCallModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createIncomingCallModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create NoFundsModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createNoFundsModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create ServiceUnavailableModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createServiceUnavailableModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientConsultationSummaryModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createClientConsultationSummaryModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createExpertConsultationSummaryModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createExpertConsultationSummaryModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientSUEActivityDetailsModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createClientSUEActivityDetailsModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))

    it('should create createClientComplainReportModal', inject((DialogService) => {
      spyOn(DialogService, 'openDialog')

      modalsService.createClientComplainReportModal({}, _ => _, _ => _)

      expect(DialogService.openDialog).toHaveBeenCalled()
    }))
  })
})
