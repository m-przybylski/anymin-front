interface Window {
  Audio: any;
}

declare var window: Window;

describe('Unit testing: profitelo.components.expert-profile.company-single-consultation', () => {
  return describe('for messenger component >', () => {

    let scope
    let rootScope
    let compile
    let component
    let helperService
    let audioOriginal
    const validHTML = '<company-single-consultation data-service-tags-employees-tuple="{details: {tags: [] }}" data-title="asd"></company-single-consultation>'
    const bindings = {
      serviceTagsEmployeesTuple: {
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

    const navigatorService = {
      getUserMediaStream: _ => _
    }

    beforeEach(() => {
    angular.mock.module('profitelo.services.navigator')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('navigatorService', navigatorService)
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.expert-profile.company-single-consultation')

      inject(($rootScope, $compile, _$componentController_, _helperService_) => {
        rootScope = $rootScope.$new()
        compile = $compile
        helperService = _helperService_

        const injectors = {
          navigatorService: navigatorService
        }

        component = _$componentController_('companySingleConsultation', injectors, bindings)
        component.$onInit()
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

