describe('Unit testing: profitelo.directives.pro-create-new-service-name >', function() {
  describe('for pro-create-new-service-name directive >', function() {

    let compile
    let scope
    let rootScope
    let validHTML = '<data-pro-create-new-service-name data-queue="queue" data-order="1" data-service-model="serviceModel"></data-pro-create-new-service-name>'




    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.wizards.pro-create-new-service-name')

      inject(($rootScope, $compile) => {
        rootScope = $rootScope
        compile   = $compile
      })
    })

    function create(html) {
      scope = rootScope.$new()
      scope.queue = {
        currentActiveSection: 1,
        sectionBeingEdited: -1
      }
      scope.serviceModel = {}

      let elem = angular.element(html)

      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should change flag after dataLoading trigger', () => {

      let el = create(validHTML)
      let isoScope = el.isolateScope()

      scope.$apply()

      expect(isoScope.config.toggles.show).toEqual(true)

    })

    it('should change flag after order change', () => {

      let el = create(validHTML)
      let isoScope = el.isolateScope()

      isoScope.queue.currentActiveSection = 2
      scope.$apply()

      expect(isoScope.config.toggles.show).toEqual(false)
      expect(isoScope.config.toggles.past).toEqual(true)
    })


    it('should trigger save function if next section is currently active', () => {

      let el = create(validHTML)
      let isoScope = el.isolateScope()

      let _testName = 'test name'

      isoScope.model.serviceName = _testName
      scope.$apply()
      rootScope.$broadcast('saveSection', 1)
      scope.$apply()

      expect(isoScope.serviceModel.serviceName).toEqual(_testName)


    })

    it('should trigger validation function if asked to', () => {

      let el = create(validHTML)
      let isoScope = el.isolateScope()

      rootScope.$broadcast('isSectionValid', {
        section: 1
      })

      scope.$apply()


    })




  })
})
