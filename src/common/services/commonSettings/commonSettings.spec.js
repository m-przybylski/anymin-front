describe('Unit testing: profitelo.services.commonSettings >', () => {
  describe('for CommonSettingsService service >',() => {

    let CommonSettingsService  = null

    beforeEach(() => {
      module('profitelo.services.commonSettings')

      inject(($injector) => {
        CommonSettingsService = $injector.get('CommonSettingsService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should have get function', () => {
      CommonSettingsService.get('pinPattern')
      expect(CommonSettingsService.get).toBeDefined()
    })


  })
})



