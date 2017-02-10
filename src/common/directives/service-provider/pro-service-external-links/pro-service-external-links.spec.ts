namespace profitelo.directives.serviceProvider.proServiceExternalLinks {
  import IRootScopeService = profitelo.services.rootScope.IRootScopeService
  describe('Unit testing: profitelo.directives.service-provider.pro-service-external-links', function () {
    return describe('for proServiceProviderName directive >', function () {

      let compile: ng.ICompileService
      let scope: any
      let rootScope: ng.IRootScopeService

      var validHTML = '<pro-service-external-links data-queue="queue" ' +
        'data-order="2" data-pro-model="proModel" ' +
        'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
        ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
        'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-external-links>'

      beforeEach(function () {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.service-provider.pro-service-external-links')
        inject(function ($rootScope: IRootScopeService, $compile: ng.ICompileService) {
          rootScope = $rootScope
          scope = rootScope.$new()
          compile = $compile
        })
      })


      function create(html: string) {
        var elem = angular.element(html)
        scope.proModel = {
          links: []
        }
        scope.queue = {
          completedSteps: 2
        }
        var compiledElement = compile(elem)(scope)
        scope.$digest()
        return compiledElement
      }

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('compile the directive', () => {
        let el = create(validHTML)
        expect(el.html()).toBeDefined(true)
      })

      it('should not let save empty model', () => {
        let el = create(validHTML)
        let isoScope: any = el.isolateScope()

        isoScope.saveSection()
        rootScope.$digest()

        expect(isoScope.error.noUrl).toEqual(true)

      })

      it('should validate entered urls', () => {
        let el = create(validHTML)
        let isoScope: any = el.isolateScope()

        let validUrl = 'http://facebook.com/someone'

        isoScope.linkModel = validUrl
        isoScope.onEnter()

        expect(isoScope.model.links.indexOf(validUrl)).toEqual(0)

        let invalidUrl = 'dasdsadsad/d'

        isoScope.linkModel = invalidUrl
        isoScope.onEnter()

        expect(isoScope.model.links.indexOf(invalidUrl)).toEqual(-1)

        validUrl = 'facebook.com/someone'

        isoScope.linkModel = validUrl
        isoScope.onEnter()

        expect(isoScope.model.links.indexOf('http://' + validUrl)).toEqual(0)


      })

      it('should remove added link on removeLink', () => {
        let el = create(validHTML)
        let isoScope: any = el.isolateScope()

        let validUrl = 'http://facebook.com/someone'

        isoScope.linkModel = validUrl
        isoScope.onEnter()

        expect(isoScope.model.links.indexOf(validUrl)).toEqual(0)

        isoScope.removeLink(validUrl)

        expect(isoScope.model.links.indexOf(validUrl)).toEqual(-1)


      })

      it('should save proModel if at least one valid link had been added', () => {
        let el = create(validHTML)
        let isoScope: any = el.isolateScope()

        let validUrl = 'http://facebook.com/someone'

        isoScope.linkModel = validUrl
        isoScope.onEnter()

        isoScope.saveSection()
        rootScope.$digest()

        expect(isoScope.proModel.links.indexOf(validUrl)).toEqual(0)

      })


    })
  })
}
