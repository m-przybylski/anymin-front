import * as angular from 'angular'
import {ImageZoomService} from './image-zoom.service'
describe('Unit testing: profitelo.services.client-activities-service >', () => {
  describe('for profitelo.services.client-activities-service >', () => {

    const img: HTMLImageElement = new Image(100, 100)
    let imageZoomService: ImageZoomService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      angular.mock.module('profitelo.services.image-zoom')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      imageZoomService = $injector.get<ImageZoomService>('imageZoomService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })

    it('should createZoomInstance undefined', () => {

      const createZoomInstance = imageZoomService.createZoomInstance(<any>null)
      expect(createZoomInstance).toEqual(void 0)

    })

    it('should createZoomInstance', () => {
      imageZoomService.createZoomInstance(img)

      imageZoomService.increaseImg()
      expect(Math.floor(img.width)).toEqual(120)
      expect(Math.floor(img.height)).toEqual(120)

      imageZoomService.resetImg()
      expect(Math.floor(img.width)).toEqual(100)
      expect(Math.floor(img.height)).toEqual(100)

      imageZoomService.decreaseImg()

      expect(Math.floor(img.width)).toEqual(83)
      expect(Math.floor(img.height)).toEqual(83)

      imageZoomService.destroy()
      expect(Math.floor(img.width)).toEqual(100)
      expect(Math.floor(img.height)).toEqual(100)
    })
  })
})
