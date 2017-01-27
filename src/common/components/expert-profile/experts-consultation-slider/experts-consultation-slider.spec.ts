describe('Unit testing: profitelo.components.expert-profile.experts-consultation-slider', () => {
  return describe('for expertsConsultationSlider >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let urlService
    let validHTML = '<experts-consultation-slider data-title="title" data-experts="[]"></experts-consultation-slider>'
    const bindings = {
      experts: [],
      title: 'title'
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.expert-profile.experts-consultation-slider')

      inject(($rootScope, $compile, _$componentController_, _urlService_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        urlService = _urlService_
      })

      component = componentController('expertsConsultationSlider', {$scope: rootScope}, bindings)

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

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should go to nextSlide', () => {
      rootScope.controlls = {
        nextSlide: _ => _
      }
      spyOn(rootScope.controlls, 'nextSlide')
      component.nextSlide()
      expect(rootScope.controlls.nextSlide).toHaveBeenCalled()
    })

    it('should go to prevSlide', () => {
      rootScope.controlls = {
        prevSlide: _ => _
      }
      spyOn(rootScope.controlls, 'prevSlide')
      component.prevSlide()
      expect(rootScope.controlls.prevSlide).toHaveBeenCalled()
    })

    it('should expertImage', inject(() => {
      spyOn(urlService, 'resolveFileUrl')
      component.expertImage('a')
      expect(urlService.resolveFileUrl).toHaveBeenCalled()
    }))
  })
})