describe('Unit testing: profitelo.directives.services.smooth-scrolling >', function() {
  describe('for profitelo.directives.services.smooth-scrolling >', function() {

    let smoothScrolling


    beforeEach(function() {
    angular.mock.module('profitelo.directives.services.smooth-scrolling')
    })


    beforeEach(inject(function($injector) {
      smoothScrolling = $injector.get('smoothScrolling')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

  })
})
