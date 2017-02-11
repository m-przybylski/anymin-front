namespace profitelo.services.commonSettings {
describe('Unit testing: profitelo.services.commonSettings >', () => {
  describe('for CommonSettingsService service >', () => {

    let CommonSettingsService: ICommonSettingsService

    beforeEach(() => {
      angular.mock.module('profitelo.services.commonSettings')

      inject(($injector: ng.auto.IInjectorService) => {
        CommonSettingsService = $injector.get<ICommonSettingsService>('CommonSettingsService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })
  })
})



}
