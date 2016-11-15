describe('Unit testing: profitelo.components.expert-profile.experts-consultation-slider', () => {
  return describe('for expertsConsultationSlider >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let HelperService
    let validHTML = '<experts-consultation-slider></experts-consultation-slider>'

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.expert-profile.experts-consultation-slider')

      inject(($rootScope, $compile, _$componentController_, _HelperService_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        HelperService = _HelperService_
      })

      component = componentController('expertsConsultationSlider', {})

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
  })
})