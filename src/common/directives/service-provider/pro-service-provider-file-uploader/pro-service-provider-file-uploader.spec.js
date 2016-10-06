describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-file-uploader', function() {
  return describe('for proServiceProviderFileUploader directive >', function() {

    var compile = null
    var scope = null
    let _rootScope
    let _httpBackend
    let _FilesApiDef
    let resourcesExpectations

    let file = {token: ':token'}
    let _url = 'awesomeUrl'

    var validHTML = '<pro-service-provider-file-uploader data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
      'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-file-uploader>'

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {
      module('templates-module')
      module('profitelo.directives.service-provider.pro-service-provider-file-uploader')
      module('profitelo.swaggerResources.definitions')

      inject(($rootScope, $compile, $injector) => {

        _rootScope = $rootScope

        scope = _rootScope.$new()
        compile = $compile

        _FilesApiDef = $injector.get('FilesApiDef')
        _httpBackend = $injector.get('$httpBackend')

        resourcesExpectations = {
          FilesApi: {
            fileInfoPath: _httpBackend.when(_FilesApiDef.fileInfoPath.method, _FilesApiDef.fileInfoPath.url)
          }
        }

      })
    })

    function create(html, proModel) {
      var elem = angular.element(html)
      scope.proModel = proModel
      var compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function() {
      var el
      el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })


    it('should not save invalid section', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      expect(isoScope.error.badFiles).toEqual(false)

      isoScope.saveSection()
      _rootScope.$digest()

      expect(isoScope.error.badFiles).toEqual(true)

    })

    it('should save valid section', () => {

      let el = create(validHTML, {
        files: []
      })
      let isoScope = el.isolateScope()

      isoScope.model = {
        files: [
          {
            response: {
              file: file
            }
          }
        ]
      }

      isoScope.queue = {
        completedSteps: 3
      }

      isoScope.saveSection()

      _rootScope.$digest()

      expect(isoScope.proModel.files.length > 0).toEqual(true)

    })

    it('should remove previously added file', () => {


      resourcesExpectations.FilesApi.fileInfoPath.respond(200)

      let el = create(validHTML, {
        files: [file]
      })

      let isoScope = el.isolateScope()

      isoScope.model.files = [file]

      expect(isoScope.model.files.indexOf(file) >= 0).toEqual(true)

      isoScope.removeFile(file)

      expect(isoScope.model.files.indexOf(file) === -1).toEqual(true)

    })

    it('should add saved elements to scope model', () => {

      let details = {
        token: file
      }

      resourcesExpectations.FilesApi.fileInfoPath.respond(200, {
        token: file
      })

      let el = create(validHTML, {
        files: [file]
      })

      let isoScope = el.isolateScope()

      _httpBackend.flush()
      expect(isoScope.model.files[0].file.token).toEqual(file.token)


    })

    it('should alert on backend error', () => {
      let details = {
        id: file
      }

      resourcesExpectations.FilesApi.fileInfoPath.respond(500)

      let el = create(validHTML, {
        files: [file]
      })

      _httpBackend.flush()

    })


  })
})
