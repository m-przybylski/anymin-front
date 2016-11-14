describe('Unit testing: profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized', () => {
  return describe('for messengerMaximized component >', () => {

    const url = 'awesomeURL'
    let scope
    let rootScope
    let compile
    let componentController
    let messengerService
    let _
    let HelperService
    let component
    let validHTML = '<messenger-maximized data-call-length="0" data-call-cost="0"></messenger-maximized>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(module(function($provide) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.services.messenger')
      module('profitelo.services.helper')
      module('lodash')
      module('profitelo.filters.seconds-to-datetime')
      module('profitelo.filters.money')
      module('profitelo.components.communicator.communicator-maximized.messenger.messenger-maximized')

      inject(($rootScope, $compile, $timeout, _$componentController_, _$window_, _messengerService_, _HelperService_, ___,) => {
        componentController = _$componentController_
        messengerService = _messengerService_
        HelperService = _HelperService_
        _ = ___
        rootScope = $rootScope.$new()
        compile = $compile
      })

      component = componentController('messengerMaximized', {
        $element: create(validHTML),
        $scope: rootScope,
        messengerService: messengerService,
        _: _,
        HelperService: HelperService
      }, {
        callCost: 0,
        callLength: 0,
        minimizeMessenger: () => {}
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

