describe('Unit testing: profitelo.components.interface.show-more-text', () => {
  return describe('for showMoreTextController component >', () => {

    let scope
    let rootScope
    let compile
    let componentController
    let component
    let window
    let element
    let bindings
    let timeout
    let validHTML = '<show-more-text data-text="text"></show-more-text>'

    function create(html) {
      scope = rootScope.$new()
      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    beforeEach(() => {
      module('templates-module')
      module('profitelo.components.interface.show-more-text')

      inject(($rootScope, $compile, _$componentController_, _$window_, _$timeout_) => {
        componentController = _$componentController_
        rootScope = $rootScope.$new()
        compile = $compile
        timeout = _$timeout_
        window = _$window_
      })

      component = componentController('showMoreText', {$element: create(validHTML), $scope: rootScope, $window: window}, bindings )
      timeout.flush()
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

