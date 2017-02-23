namespace profitelo.services.smoothScrolling {
describe('Unit testing: profitelo.directives.services.smooth-scrolling >', function() {
  describe('for profitelo.directives.services.smooth-scrolling >', function() {

    let smoothScrollingService: ISmoothScrollingService


    beforeEach(function() {
    angular.mock.module('profitelo.services.smooth-scrolling')
    })


    beforeEach(inject(($injector: ng.auto.IInjectorService) =>{
      smoothScrollingService = $injector.get<ISmoothScrollingService>('smoothScrollingService')
    }))


    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should simple scroll to', inject(() => {
      spyOn($.fn, "stop").and.returnValue("bar")
      smoothScrollingService.simpleScrollTo('<div class="dumb-class"></div>', true)
      $(window).triggerHandler('wheel')
      const result = $('html, body').stop()
      expect(result).toEqual("bar")
    }))

  })
})
}
