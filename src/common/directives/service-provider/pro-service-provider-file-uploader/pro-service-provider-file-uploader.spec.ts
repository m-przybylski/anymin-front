import * as angular from 'angular'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {FilesApiMock} from 'profitelo-api-ng/api/api'
import {FileInfo} from 'profitelo-api-ng/model/models'

describe('Unit testing: profitelo.directives.service-provider.pro-service-provider-file-uploader', function () {
  return describe('for proServiceProviderFileUploader directive >', function () {

    let compile: any = null
    let scope: any = null
    let _rootScope: ng.IRootScopeService
    let _httpBackend: ng.IHttpBackendService
    let _FilesApiMock: FilesApiMock

    let file = {token: ':token'}
    let _url = 'awesomeUrl'

    let validHTML = '<pro-service-provider-file-uploader data-queue="vm.queue" ' +
      'data-order="2" data-pro-model="proModel" ' +
      'data-placeholder="DASHBOARD.CONSULTATION_RANGE.CONSULTANTS_LIST_PLACEHOLDER"' +
      ' data-error-message="DASHBOARD.SERVICE_PROVIDER.NAME.BAD_NAME" tr-title="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT" ' +
      'tr-desc="DASHBOARD.EXPERT_ACCOUNT.NAME_EXPERT_DESCRIPTION" required="required"></pro-service-provider-file-uploader>'

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', _url)
    }))

    beforeEach(() => {

      angular.mock.module('profitelo.directives.service-provider.pro-service-provider-file-uploader')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService) => {

        _rootScope = $rootScope

        scope = _rootScope.$new()
        compile = $compile

        _FilesApiMock = $injector.get<FilesApiMock>('FilesApiMock')
        _httpBackend = $injector.get('$httpBackend')

      })
    })

    function create(html: string, proModel: any) {
      let elem = angular.element(html)
      scope.proModel = proModel
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', inject(() => {
      expect(true).toBeTruthy()
    }))

    it('compile the directive', function () {
      let el
      el = create(validHTML, {})
      expect(el.html()).toBeDefined(true)
    })

    it('should not save invalid section', () => {
      let el = create(validHTML, {})
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

      //FIXME type
      _FilesApiMock.fileInfoPath(200, file.token, <FileInfo>{})

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

      //FIXME type
      _FilesApiMock.fileInfoPath(200, file.token, <any>{
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

      _FilesApiMock.fileInfoPath(500, file.token)

      create(validHTML, {
        files: [file]
      })

      _httpBackend.flush()

    })
  })
})
