describe('Unit testing: profitelo.services.pro-ratel-service >', function() {
  describe('for proRatelService service >', function() {

    let proRatelService  = null
    let _url = 'awesomeUrl'

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(function() {
      module('profitelo.services.pro-ratel-service')

      navigator.mediaDevices.getUserMedia = () => {
        
      }

      inject(($injector) => {
        proRatelService = $injector.get('proRatelService')
      })

    })

    it('should exist', function() {
      expect(true).toBeTruthy()
    })


  })
})



