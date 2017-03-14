import * as angular from "angular"
import {IServiceProviderImageService} from "./service-provider-image.service"
import {FilesApiMock} from "profitelo-api-ng/api/api"
import {FileInfo} from "profitelo-api-ng/model/models"

describe('Unit testing: profitelo.resolvers.service-provider-image', () => {
  describe('for ServiceProviderChoosePathResolver service >', () => {

    let url = 'awesomeURL'
    let mockState
    let AppServiceProviderImageResolver: IServiceProviderImageService
    let $httpBackend: ng.IHttpBackendService
    let _FilesApiMock: FilesApiMock

    beforeEach(angular.mock.module(function ($provide: ng.auto.IProvideService) {
      $provide.value('apiUrl', url)
    }))

    beforeEach(() => {

      mockState = {
        go: () => {
        }
      }
      angular.mock.module('profitelo.resolvers.service-provider-image', function () {

      })

      inject(($injector: ng.auto.IInjectorService) => {
        AppServiceProviderImageResolver = $injector.get<IServiceProviderImageService>('ServiceProviderImageResolver')
        _FilesApiMock = $injector.get<FilesApiMock>('FilesApiMock')
        $httpBackend = $injector.get('$httpBackend')
      })
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
      _FilesApiMock.fileInfoPath(200, ':token', <FileInfo>{
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
      _FilesApiMock.fileInfoPath(300, ':token')

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
