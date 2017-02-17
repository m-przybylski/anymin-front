namespace profitelo.services.imageZoom {
  import IImageZoomService = profitelo.services.imageZoom.IImageZoomService

  describe('Unit testing: profitelo.services.client-activities-service >', () => {
    describe('for profitelo.services.client-activities-service >', () => {

      let imageZoomService: IImageZoomService
      let img: HTMLImageElement = new Image(100, 200)
      let imgUndefined: HTMLImageElement

      beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
        $provide.value('apiUrl', 'awesomeURL')
      }))

      beforeEach(() => {
        angular.mock.module('commonConfig')
        angular.mock.module('profitelo.services.image-zoom')
      })

      beforeEach(inject(($injector: ng.auto.IInjectorService) => {
        imageZoomService = $injector.get<IImageZoomService>('imageZoomService')
      }))

      it('should have a dummy test', () => {
        expect(true).toBeTruthy()
      })

      it('should createZoomInstance undefined', () => {
        imageZoomService.createZoomInstance(imgUndefined)
        expect(imgUndefined).toEqual(void 0)
      })

      it('should createZoomInstance', () => {
        const imageSize = {
          width: 100,
          height: 200
        }

        imageZoomService.createZoomInstance(img)

        expect(img).toBeDefined()

        expect(imageSize.width).toEqual(img.width)
        expect(imageSize.height).toEqual(img.height)
      })
    })
  })
}
