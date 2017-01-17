describe('Unit testing: profitelo.services.commonSettings >', () => {
  describe('for CommonSettingsService service >', () => {

    let CommonSettingsService = null

    beforeEach(() => {
      angular.mock.module('profitelo.services.commonSettings')

      inject(($injector) => {
        CommonSettingsService = $injector.get('CommonSettingsService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })
  })
})



