describe('Unit testing: profitelo.components.expert-profile.company-single-consultation', () => {
  return describe('for messenger component >', () => {

    let scope
    let rootScope
    let compile
    let component
    let HelperService
    let audioOriginal
    const validHTML = '<company-single-consultation data-service="{details: {tags: [] }}" data-title="asd"></company-single-consultation>'
    const bindings = {
      service: {
        details: {
          tags: []
        }
      },
      title: 'title'
    }
    const audioMock = {
      addEventListener: _ => _,
      play: _ => _,
      pause: _ => _
    }

    beforeEach(() => {
      audioOriginal = window.Audio
      window.Audio = () => audioMock
    })

    afterEach(() => {
      window.Audio = audioOriginal
    })

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.expert-profile.company-single-consultation')

      inject(($rootScope, $compile, _$componentController_, _HelperService_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        HelperService = _HelperService_

        const injectors = {}

        component = _$componentController_('companySingleConsultation', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
  })
})

