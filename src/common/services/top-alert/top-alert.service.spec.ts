/*  TESTED IN ALERT DIRECTIVE: /src/common/directives/interface/pro-alert/pro-alert.spec.js */
describe('Unit testing: profitelo.services.pro-top-alert-service>', () => {
  describe('for topAlertService service >', () => {

    let topAlertService  = null

    beforeEach(() => {
    angular.mock.module('profitelo.services.top-alert')

      inject(($injector) => {
        topAlertService = $injector.get('topAlertService')
      })
    })

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })


  })
})