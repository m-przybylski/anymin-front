describe('Unit testing: profitelo.components.communicator', () => {
  return describe('for communicator component >', () => {

    let scope
    let rootScope
    let compile
    let component
    const validHTML = '<communicator></communicator>'
    const bindings = {
      minimizeCommunicator: _ => _
    }
    const uploaderService = {
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

    beforeEach(() => {
      angular.mock.module('profitelo.services.sounds')
    angular.mock.module('profitelo.services.navigator')
    angular.mock.module('profitelo.services.uploader')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('soundsService', {})
      $provide.value('uploaderService', uploaderService)
      $provide.value('navigatorService', {})
      $provide.value('apiUrl', 'awesomeUrl/')
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.communicator')

      inject(($rootScope, $compile, $timeout, _$componentController_) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          $element: create(validHTML)
        }

        component = _$componentController_('communicator', injectors, bindings)
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

