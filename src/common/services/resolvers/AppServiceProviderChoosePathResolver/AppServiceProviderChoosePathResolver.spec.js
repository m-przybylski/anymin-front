describe('Unit testing: profitelo.services.resolvers.app.service-provider-choose-path', () => {
  describe('for AppServiceProviderChoosePathResolver service >', () => {
    
    let url = 'awesomeURL'
    let mockState
    let AppServiceProviderChoosePathResolver
    let _User 
    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {}
      }

      module('profitelo.services.resolvers.app.service-provider-choose-path', function($provide) {
        $provide.value('$state', mockState)
      })

      inject(($injector) => {
        AppServiceProviderChoosePathResolver = $injector.get('AppServiceProviderChoosePathResolver')
      })
    })


    it('should have resolve function', () => {
      expect(AppServiceProviderChoosePathResolver.resolve).toBeDefined()
    })
    


  })
})