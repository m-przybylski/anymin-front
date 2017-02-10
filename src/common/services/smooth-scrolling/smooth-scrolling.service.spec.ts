namespace profitelo.services.smoothScrolling {
describe('Unit testing: profitelo.directives.services.smooth-scrolling >', function() {
  describe('for profitelo.directives.services.smooth-scrolling >', function() {

    let smoothScrollingService


    beforeEach(function() {
    angular.mock.module('profitelo.services.smooth-scrolling')
    })


    beforeEach(inject(function($injector: ng.auto.IInjectorService) {
      smoothScrollingService = $injector.get('smoothScrollingService')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

  })
})
}
