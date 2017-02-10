namespace profitelo.resolvers.serviceProviderImage {
  describe('Unit testing: profitelo.resolvers.service-provider-image', () => {
    describe('for ServiceProviderChoosePathResolver service >', () => {

      let url = 'awesomeURL'
      let mockState
      let AppServiceProviderImageResolver: IServiceProviderImageService
      let $httpBackend: ng.IHttpBackendService
      let _FilesApiDef: any
      let resourcesExpectations: any

      beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
        $provide.value('apiUrl', url)
      }))

      beforeEach(() => {

        mockState = {
          go: () => {
          }
        }
        angular.mock.module('profitelo.swaggerResources.definitions')
        angular.mock.module('profitelo.resolvers.service-provider-image', function () {

        })

        inject(($injector: ng.auto.IInjectorService) => {
          AppServiceProviderImageResolver = $injector.get<IServiceProviderImageService>('ServiceProviderImageResolver')
          _FilesApiDef = $injector.get('FilesApiDef')
          $httpBackend = $injector.get('$httpBackend')
        })

        resourcesExpectations = {
          FilesApi: {
            fileInfoPath: $httpBackend.when(_FilesApiDef.fileInfoPath.method, _FilesApiDef.fileInfoPath.url)
          }
        }
      })


      it('should have resolve function', () => {
        expect(AppServiceProviderImageResolver.resolve).toBeDefined()
      })

      it('should return downloadUrl', () => {
        let spy = {
          spy: () => {
          }
        }

        spyOn(spy, 'spy')
        resourcesExpectations.FilesApi.fileInfoPath.respond(200, {
          previews: [
            'http://i_just_download_image.profitelo.pl'
          ]
        })
        AppServiceProviderImageResolver.resolve(':token').then((res) => {
          expect(res).toBe('http://i_just_download_image.profitelo.pl')
          spy.spy()
        }, () => {

        })
        $httpBackend.flush()
        expect(spy.spy).toHaveBeenCalled()
      })

      it('should not get file path', () => {
        let spy = {
          spy: () => {
          }
        }

        spyOn(spy, 'spy')
        resourcesExpectations.FilesApi.fileInfoPath.respond(300, {
          meta: {
            downloadUrl: 'http://i_just_download_image.profitelo.pl'
          }
        })

        AppServiceProviderImageResolver.resolve(':token').then((res) => {
          expect(res).toBe('')
          spy.spy()
        }, () => {
        })

        $httpBackend.flush()
        expect(spy.spy).toHaveBeenCalled()
      })

    })
  })
}
