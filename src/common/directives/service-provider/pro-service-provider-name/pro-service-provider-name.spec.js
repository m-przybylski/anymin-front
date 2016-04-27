describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-name >', function() {
  describe('for pro-service-provider-name directive >', function() {

    let compile
    let scope
    let rootScope
    let validHTML = '<pro-service-provider-name data-queue="queue" data-order="1" data-service-model="serviceModel"></pro-service-provider-name>'


    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-service-provider-name')

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
      spyOn(isoScope.config, 'isValid')

      rootScope.$broadcast('isSectionValid', {
        section: 1
      })

      expect(isoScope.config.isValid).toHaveBeenCalled()

    })

    it('should validate non-empty service name', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      isoScope.model.serviceName = 'non-empty service name'

      let isValid = isoScope.config.isValid()

      expect(isValid).toEqual(true)

    })

    it('should not validate an empty service name', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      let isValid = isoScope.config.isValid()

      expect(isValid).toEqual(false)

    })

    it('should enter edit mode when clicked on', () => {
      let el = create(validHTML)

      let isoScope = el.isolateScope()

      isoScope.queue.currentActiveSection = 2
      scope.$apply()
      el.click()

    })




  })
})
