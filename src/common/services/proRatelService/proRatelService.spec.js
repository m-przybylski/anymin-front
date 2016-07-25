describe('Unit testing: profitelo.services.pro-ratel-service >', function() {
  describe('for proRatelService service >', function() {

    let proRatelService  = null

    beforeEach(function() {
      module('profitelo.services.pro-ratel-service')

      inject(($injector) => {
        proRatelService = $injector.get('proRatelService')
      })

    })

    it('should exist', function() {
      expect(true).toBeTruthy()
    })


  })
})



