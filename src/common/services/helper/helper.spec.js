describe('Unit testing: profitelo.services.helper >', () => {
  describe('for HelperService service >', () => {

    let HelperService

    beforeEach(() => {
      module('profitelo.services.helper')

      inject(($injector) => {
        HelperService = $injector.get('HelperService')
      })

    })

    it('should exist', () => {
      expect(true).toBeTruthy()
    })

    it('should have get function', () => {
      expect(HelperService.socialUrlResolver).toBeDefined()
    })

    it('should match social networks classes', () => {

      var generic = HelperService.socialUrlResolver('https://wykop.pl').iconClass
      var facebook = HelperService.socialUrlResolver('facebook.com/costam').iconClass
      var linkedIn = HelperService.socialUrlResolver('https://linkedin.com/ktostam').iconClass

      expect(facebook).toEqual('icon-facebook-24')
      expect(linkedIn).toEqual('icon-linkedin-24')
      expect(generic).toEqual('icon-www-24')
    })

  })
})



