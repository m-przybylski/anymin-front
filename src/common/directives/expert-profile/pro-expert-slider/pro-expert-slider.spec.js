describe('Unit testing: profitelo.directives.expert-profile.pro-expert-slider', () => {
  return describe('for expert-profile.pro-expert-slider directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let validHTML = '<pro-expert-slider></pro-expert-slider>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.expert-profile.pro-expert-slider')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }



    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should prev slide', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.prevSlide()
      expect(isoScope.prevSlide).toBeDefined(true)
    })

    it('should next slide', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      isoScope.nextSlide()
      expect(isoScope.prevSlide).toBeDefined(true)
    })

  })
})
