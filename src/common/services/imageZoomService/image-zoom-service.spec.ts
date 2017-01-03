describe('Unit testing: profitelo.services.image-zoom-service >', () => {
  describe('for profitelo.services.image-zoom-service >', () => {

    let ImageZoomService

    beforeEach(angular.mock.module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
    angular.mock.module('profitelo.services.image-zoom-service')
    })

    beforeEach(inject(($injector) => {
      ImageZoomService = $injector.get('ImageZoomService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
