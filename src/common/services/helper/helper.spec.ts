describe('Unit testing: profitelo.services.helper >', () => {
  describe('for helperService service >', () => {

    let helperService

    beforeEach(() => {
    angular.mock.module('profitelo.services.helper')

      inject(($injector) => {
        helperService = $injector.get('helperService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should have get function', () => {
      expect(helperService.socialUrlResolver).toBeDefined()
    })

    it('should match social networks classes', () => {

      var generic = helperService.socialUrlResolver('https://wykop.pl').iconClass
      var facebook = helperService.socialUrlResolver('facebook.com/costam').iconClass
      var linkedIn = helperService.socialUrlResolver('https://linkedin.com/ktostam').iconClass

      expect(facebook).toEqual('icon-facebook-24')
      expect(linkedIn).toEqual('icon-linkedin-24')
      expect(generic).toEqual('icon-www-24')
    })

  })
})



