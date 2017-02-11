namespace profitelo.services.imageZoom {
describe('Unit testing: profitelo.services.image-zoom >', () => {
  describe('for profitelo.services.image-zoom >', () => {

    let imageZoomService

    beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.services.image-zoom')
    })

    beforeEach(inject(($injector: ng.auto.IInjectorService) => {
      imageZoomService = $injector.get('imageZoomService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
}
