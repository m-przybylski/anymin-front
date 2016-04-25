describe('Unit tests: CompanyPathController >', () => {
  describe('Testing Controller: CompanyPathController', () => {

    var CompanyPathController

    beforeEach(() => {
      module('profitelo.controller.dashboard.service-provider.company-path')
      inject(($rootScope, $controller) => {
        CompanyPathController = $controller('CompanyPathController', {
        })
      })
    })

    it('should exists', () => {
      return expect(!!CompanyPathController).toBe(true)
    })

  })
})
