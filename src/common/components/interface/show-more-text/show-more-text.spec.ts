describe('Unit testing: profitelo.components.interface.show-more-text', () => {
  return describe('for showMoreTextController component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let element
    let validHTML = '<show-more-text data-text="text"></show-more-text>'
    const bindings = {
      text: 'Sample text'
    }

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
    angular.mock.module('templates-module')
    angular.mock.module('profitelo.components.interface.show-more-text')

      inject(($rootScope, $compile, _$componentController_, _$window_, _$timeout_, _$log_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        window = _$window_
        
        const injectors = {
          $element: create(validHTML),
          $scope: rootScope,
          $window: window,
          $timeout: _$timeout_,
          $log: _$log_
        }

        component = componentController('showMoreText', injectors, bindings)
        component.$onInit()
      })
    })

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('should expand collapse element on click', () => {
      const el = create(validHTML)
      el.find('.btn-show-more').triggerHandler('click')
    })
  })
})

