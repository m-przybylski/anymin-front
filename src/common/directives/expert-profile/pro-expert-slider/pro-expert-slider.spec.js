describe('Unit testing: profitelo.directives.expert-profile.pro-expert-slider', () => {
  return describe('for expert-profile.pro-expert-slider directive >', () => {

    let scope = null
    let rootScope
    let compile = null
    let timeout
    let DialogService
    let validHTML = '<pro-expert-slider data-sliders="sliders"></pro-expert-slider>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.expert-profile.pro-expert-slider')
      module('profitelo.services.dialog-service')

      inject(($rootScope, $compile, $timeout, _DialogService_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = $timeout
        DialogService = _DialogService_
      })
    })
    
    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      scope.controlls = {
        nextSlide: _=>_,
        prevSlide: _=>_
      }
      scope.sliders = [{previews: 'asd'}, {previews: 'asd'}, {previews: 'asd'}]

      let compiledElement = compile(elem)(scope)
      scope.$digest()
      timeout.flush()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should nextSlide', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope.controlls, 'nextSlide')
      isoScope.nextSlide()
      expect(isoScope.controlls.nextSlide).toHaveBeenCalled()
    })
    
    it('should prevSlide', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      spyOn(isoScope.controlls, 'prevSlide')
      isoScope.prevSlide()
      expect(isoScope.controlls.prevSlide).toHaveBeenCalled()
    })

    it('should openDialog', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()
      let slide = {
        previews: 'slide'
      }
      spyOn(DialogService, 'openDialog')
      isoScope.openDialog(slide)
      expect(DialogService.openDialog).toHaveBeenCalled()
    })

  })
})
