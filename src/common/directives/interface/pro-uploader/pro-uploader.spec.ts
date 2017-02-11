namespace profitelo.directives.interface.proUploader {
  describe('Unit testing: profitelo.directives.interface.pro-uploader', () => {
    return describe('for pro-uploader directive >', () => {

      let scope: any = null
      let rootScope: ng.IRootScopeService
      let compile: any = null
      let validHTML = '<pro-uploader type="image/*" files-uploaded="avatar" data-required data-multiple data-ngf-pattern=".jpg,.jpeg,.png"></pro-uploader>'

      let _httpBackend: ng.IHttpBackendService
      let _FilesApiDef: any
      let _CommonConfig: ICommonConfig
      let resourcesExpectations: any
      let _timeout: ng.ITimeoutService
      let _interval: ng.IIntervalService
      let _commonConfigData: any

      let url = 'awesomeUrl'


      let fileId = 123

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {
        angular.mock.module('templates-module')
        angular.mock.module('profitelo.directives.interface.pro-uploader')
        angular.mock.module('profitelo.swaggerResources.definitions')

        inject(($rootScope: IRootScopeService, $compile: ng.ICompileService, $injector: ng.auto.IInjectorService) => {
          rootScope = $rootScope.$new()
          compile = $compile

          _CommonConfig = $injector.get<ICommonConfig>('CommonConfig')
          _FilesApiDef = $injector.get('FilesApiDef')
          _httpBackend = $injector.get('$httpBackend')
          _timeout = $injector.get('$timeout')
          _interval = $injector.get('$interval')

          _commonConfigData = _CommonConfig.getAllData()

          resourcesExpectations = {
            FilesApi: {
              createFileTokenPath: _httpBackend.when(_FilesApiDef.createFileTokenPath.method, _FilesApiDef.createFileTokenPath.url.replace(':collectionType', 'AVATAR'))
            },
            Upload: {
              upload: _httpBackend.when('POST', _commonConfigData.urls['files'] + '/files/' + fileId + '/upload')
            }
          }

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

        resourcesExpectations.Upload.upload.respond(200)

        resourcesExpectations.FilesApi.createFileTokenPath.respond(200, {
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
}
