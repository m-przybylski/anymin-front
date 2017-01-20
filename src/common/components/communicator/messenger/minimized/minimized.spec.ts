describe('Unit testing: profitelo.components.communicator.messenger.minimized', () => {
  return describe('for messengerMinimized component >', () => {

    let scope
    let $rootScope
    let $compile
    let component
    const validHTML = '<minimized></minimized>'
    const bindings = {}
    let messengerService
    let timeout

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    function create(html) {
      scope = $rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = $compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('profitelo.services.sounds')
    angular.mock.module('profitelo.services.navigator')
    })

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('soundsService', {})
      $provide.value('navigatorService', {})
    }))

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.communicator.messenger.minimized')

      messengerService = {
        onClientMessage: (fn) => {
          fn()
        },
        onExpertNewChat: (fn) => {
          fn()
        },
        onExpertMessage: (fn) => {
          fn()
        },
        onClientNewChat: (fn) => {
          fn()
        },
        onChatLeft: (fn) => {
          fn()
        }
      }

      inject((_$rootScope_, _$compile_, _$timeout_, _$componentController_) => {
        $rootScope = _$rootScope_
        $compile = _$compile_
        timeout = _$timeout_

        const injectors = {
          $timeout: timeout,
          messengerService: messengerService
        }

        component = _$componentController_('messengerMinimized', injectors, bindings)
        component.messages = ['dsdfsdfsdf']
        timeout.flush()
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

