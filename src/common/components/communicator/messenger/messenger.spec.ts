describe('Unit testing: profitelo.components.communicator.messenger', () => {
  return describe('for messenger component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<messenger data-call-length="0" data-call-cost="0" data-is-messenger="false"></messenger>'
    const bindings = {
      callLength: 0,
      callCost: 0,
      isMessenger: false
    }
    const uploaderFactory = {
      collectionTypes: { avatar: 'avatar' },
      getInstance: _ => _
    }

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
    angular.mock.module('profitelo.services.sounds')
    angular.mock.module('profitelo.services.uploader')
    angular.mock.module('profitelo.services.navigator')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('soundsService', {})
      $provide.value('uploaderFactory', uploaderFactory)
      $provide.value('apiUrl', 'awesomeUrl/')
      $provide.value('navigatorService', navigatorService)
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.communicator.messenger')

      inject(($rootScope, $compile, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          navigatorService: navigatorService
        }

        component = _$componentController_('messenger', injectors, bindings)
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should compile the component', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })
    
    it('should minimizeMessenger', () => {
      component.minimizeMessenger()
      expect(component.isMessenger).toBe(false)
    })
    
    it('should maximizeMessenger', () => {
      component.maximizeMessenger()
      expect(component.isMessenger).toBe(true)
    })
  })
})

