describe('Unit testing: profitelo.services.resolvers.app.service-provider-image-resolver', () => {
  describe('for AppServiceProviderChoosePathResolver service >', () => {

    let url = 'awesomeURL'
    let mockState
    let AppServiceProviderImageResolver

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

      module('profitelo.services.resolvers.app.service-provider-image-resolver', function($provide) {
        $provide.value('$state', mockState)
      })

      inject(($injector) => {
        AppServiceProviderImageResolver = $injector.get('AppServiceProviderImageResolver')
      })
    })


    it('should have resolve function', () => {
      expect(AppServiceProviderImageResolver.resolve).toBeDefined()
    })



  })
})