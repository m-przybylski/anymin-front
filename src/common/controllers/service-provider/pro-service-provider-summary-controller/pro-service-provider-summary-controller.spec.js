describe('Unit tests: ProServiceProviderSummaryController >', () => {
  describe('Testing Controller: ProServiceProviderSummaryController', () => {

    var ProServiceProviderSummaryController
    let _vm


    beforeEach(() => {
      module('profitelo.common.controller.service-provider.pro-service-provider-summary-controller')
      inject(($rootScope, $controller) => {

        ProServiceProviderSummaryController = $controller('ProServiceProviderSummaryController', {
        })


      })
    })

    it('should exists', () => {
      return expect(!!ProServiceProviderSummaryController).toBe(true)
    })

    it('should call deleteAction when deleteConsultation triggered', () => {

      ProServiceProviderSummaryController.deleteAction = () => {}

      spyOn(ProServiceProviderSummaryController, 'deleteAction')

      ProServiceProviderSummaryController.deleteConsultation()

      expect(ProServiceProviderSummaryController.deleteAction).toHaveBeenCalled()


    })

    it('should call editAction when editConsultation triggered', () => {

      ProServiceProviderSummaryController.editAction = () => {}

      spyOn(ProServiceProviderSummaryController, 'editAction')

      ProServiceProviderSummaryController.editConsultation()

      expect(ProServiceProviderSummaryController.editAction).toHaveBeenCalled()


    })

  })
})