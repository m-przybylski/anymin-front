describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-summary-step', function() {
  return describe('for proServiceProviderSummaryStep directive >', function() {

    let compile = null
    let scope = null

    let validHTML = '<pro-service-provider-summary-step data-consultations="consultations" ' +
    'data-edit-action="editConsultation"' +
    'data-delete-action="deleteConsultation"></pro-service-provider-summary-step>'

    beforeEach(function() {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-service-provider-summary-step')

      inject(function($rootScope, $compile) {
        scope = $rootScope.$new()
        compile = $compile
      })
    })

    function create(html) {
      let elem = angular.element(validHTML)
      scope.consultations = [{}]
      scope.editConsultation = () => {
        return null
      }
      scope.deleteConsultation = () => {
        return null
      }
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))


  })
})
