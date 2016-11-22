describe('Unit testing: profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized', () => {
  return describe('for messengerMaximized component >', () => {

    let scope
    let rootScope
    let compile
    let component
    let validHTML = '<messenger-maximized data-call-length="0" data-call-cost="0"></messenger-maximized>'

    const bindings = {
      callCost: 0,
      callLength: 0,
      minimizeMessenger: _ => _
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

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      module('profitelo.services.sounds')
      module('profitelo.services.uploader')
    })

    beforeEach(module(($provide) => {
      $provide.value('soundsService', {})
      $provide.value('uploaderService', uploaderService)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.services.helper')
      module('profitelo.filters.seconds-to-datetime')
      module('profitelo.filters.money')
      module('lodash')
      module('profitelo.services.messenger')
      module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized')

      inject(($rootScope, $compile, $timeout, _$componentController_, _$window_, _HelperService_, _messengerService_, ___) => {
        rootScope = $rootScope.$new()
        compile = $compile

        const injectors = {
          messengerService: _messengerService_,
          _: ___,
          HelperService: _HelperService_
        }

        component = _$componentController_('messengerMaximized', injectors, bindings)
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

