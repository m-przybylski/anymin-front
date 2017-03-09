import {ICommonConfig} from "../../../services/common-config/common-config"
import * as angular from "angular"
import {FilesApiMock} from "../../../api/api/FilesApi"
import IRootScopeService = profitelo.services.rootScope.IRootScopeService

describe('Unit testing: profitelo.directives.interface.pro-uploader', () => {
  return describe('for pro-uploader directive >', () => {

    let scope: any = null
    let rootScope: ng.IRootScopeService
    let compile: any = null
    let validHTML = '<pro-uploader type="image/*" files-uploaded="avatar" data-required data-multiple data-ngf-pattern=".jpg,.jpeg,.png"></pro-uploader>'

    let _httpBackend: ng.IHttpBackendService
    let _FilesApiMock: FilesApiMock
    let _CommonConfig: ICommonConfig
    let _timeout: ng.ITimeoutService
    let _interval: ng.IIntervalService
    let _commonConfigData: any

    let url = 'awesomeUrl'


    let fileId = '123'

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {
      //angular.mock.module('templates-module')
      angular.mock.module('profitelo.directives.interface.pro-uploader')

      inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService) => {
        rootScope = $rootScope.$new()
        compile = $compile

        _CommonConfig = $injector.get<ICommonConfig>('CommonConfig')
        _FilesApiMock = $injector.get<FilesApiMock>('FilesApiMock')
        _httpBackend = $injector.get('$httpBackend')
        _timeout = $injector.get('$timeout')
        _interval = $injector.get('$interval')

        _commonConfigData = _CommonConfig.getAllData()
      })
    })


    function create(html: string) {
      scope = rootScope.$new()

      scope.avatar = []

      let elem = angular.element(html)
      let compiledElement = compile(elem)(scope)
      scope.$digest()
      return compiledElement
    }

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should compile the directive', () => {
      let el = create(validHTML)
      expect(el.html()).toBeDefined(true)
    })

    it('should remove image on function call', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      isoScope.deleteImage()

      expect(isoScope.uploadImg).toBeFalsy()
    })

    it('should upload files', () => {
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      _httpBackend.when('POST', _commonConfigData.urls['files'] + '/files/' + fileId + '/upload').respond(200)

      _FilesApiMock.createFileTokenPath(200, 'AVATAR', {
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
      let el = create(validHTML)
      let isoScope = el.isolateScope()

      isoScope.animate()
      _timeout.flush()
      _interval.flush()
      rootScope.$digest()

    })

  })
})
