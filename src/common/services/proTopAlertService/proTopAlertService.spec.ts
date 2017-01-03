/*  TESTED IN ALERT DIRECTIVE: /src/common/directives/interface/pro-alert/pro-alert.spec.js */
describe('Unit testing: profitelo.services.pro-top-alert-service>', () => {
  describe('for proTopAlertService service >', () => {

    let proTopAlertService  = null

    beforeEach(() => {
    angular.mock.module('profitelo.services.pro-top-alert-service')

      inject(($injector) => {
        proTopAlertService = $injector.get('proTopAlertService')
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })


  })
})