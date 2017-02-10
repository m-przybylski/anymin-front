namespace profitelo.components.expertProfile.companySingleConsultation {

  import IUrlService = profitelo.services.helper.IUrlService
  interface Window {
    Audio: any;
  }

  declare var window: Window;

  describe('Unit testing: profitelo.components.expert-profile.company-single-consultation', () => {
    return describe('for messenger component >', () => {

      let scope: any
      let rootScope: ng.IRootScopeService
      let compile: ng.ICompileService
      let component: any
      let urlService: IUrlService
      let audioOriginal: any
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
        addEventListener: () => {},
        play: () => {},
        pause: () => {}
      }

      beforeEach(() => {
        audioOriginal = window.Audio
        window.Audio = () => audioMock
      })

      afterEach(() => {
        window.Audio = audioOriginal
      })

      function create(html: string) {
        scope = rootScope.$new()
        let elem = angular.element(html)
        let compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      const navigatorService = {
        getUserMediaStream: () => {}
      }

      beforeEach(() => {
        angular.mock.module('profitelo.services.navigator')
      })

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeUrl/')
        $provide.value('navigatorService', navigatorService)
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.components.expert-profile.company-single-consultation')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService,
                _$componentController_: ng.IComponentControllerService, _urlService_: IUrlService) => {
          rootScope = $rootScope.$new()
          compile = $compile
          urlService = _urlService_

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
}
