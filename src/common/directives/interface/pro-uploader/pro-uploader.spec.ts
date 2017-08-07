import * as angular from 'angular'
import {FilesApiMock} from 'profitelo-api-ng/api/api'
import IRootScopeService = profitelo.services.rootScope.IRootScopeService
import {CommonConfig} from '../../../../../generated_modules/common-config/common-config'
import {IProUploaderScope} from './pro-uploader'

describe('Unit testing: profitelo.directives.interface.pro-uploader', () => {
  return describe('for pro-uploader directive >', () => {

    let scope: IProUploaderScope
    let rootScope: ng.IRootScopeService
    let compile: any = null
    const validHTML = '<pro-uploader type="image/*" files-uploaded="avatar" data-required data-multiple data-ngf-pattern=".jpg,.jpeg,.png"></pro-uploader>'

    let _httpBackend: ng.IHttpBackendService
    let _FilesApiMock: FilesApiMock
    let _CommonConfig: CommonConfig
    let _timeout: ng.ITimeoutService
    let _interval: ng.IIntervalService
    let _commonConfigData: any

    const url = 'awesomeUrl'

    const fileId = '123'

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.directives.interface.pro-uploader')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        _CommonConfig = $injector.get<CommonConfig>('CommonConfig')
        _FilesApiMock = $injector.get<FilesApiMock>('FilesApiMock')
        _httpBackend = $injector.get('$httpBackend')
        _timeout = $injector.get('$timeout')
        _interval = $injector.get('$interval')

        _commonConfigData = _CommonConfig.getAllData()
      })
    })

    function create(html: string): JQuery {
      scope = <IProUploaderScope>rootScope.$new()

      scope.avatar = []

      const elem = angular.element(html)
      const compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the directive', () => {
      const el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should remove image on function call', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProUploaderScope>()
      isoScope.deleteImage()
      expect(isoScope.uploadImg).toBeFalsy()
    })

    it('should upload files', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProUploaderScope>()
      _httpBackend.when('POST', _commonConfigData.urls['files'] + '/files/' + fileId + '/upload').respond(200)

      _FilesApiMock.createFileTokenPath(200, 'documents', {
        fileId: fileId
      })

      isoScope.uploadFiles([
        {
          fileId: '123123'
        }
      ])

      rootScope.$digest()
    })

    it('should animate', () => {
      const el = create(validHTML)
      const isoScope = el.isolateScope<IProUploaderScope>()
      isoScope.animate()
      _timeout.flush()
      _interval.flush()
      rootScope.$digest()
    })

  })
})
