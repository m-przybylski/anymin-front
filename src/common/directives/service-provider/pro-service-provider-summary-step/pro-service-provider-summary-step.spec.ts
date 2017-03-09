namespace profitelo.directives.serviceProvider.proServiceProviderSummaryStep {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-summary-step', function () {
    return describe('for proServiceProviderSummaryStep directive >', function () {

      let compile: any = null
      let scope: any = null

      let validHTML = '<pro-service-provider-summary-step data-consultations="consultations" ' +
        'data-edit-action="editConsultation"' +
        'data-delete-action="deleteConsultation"></pro-service-provider-summary-step>'

      beforeEach(function () {
        //angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.service-provider.pro-service-provider-summary-step')

        inject(function ($rootScope: IRootScopeService, $compile: ng.ICompileService) {
          scope = $rootScope.$new()
          compile = $compile
        })
      })

      function create(html: string) {
        let elem = angular.element(html)
        scope.consultations = [{invitations: [], details: {tags: []}}]
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

      it('should have a dummy test', inject(function () {
        expect(true).toBeTruthy()
      }))

      it('should create element', inject(function () {
        create(validHTML)
        expect(true).toBeTruthy()
      }))
    })
  })
}
