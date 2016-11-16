describe('Unit testing: profitelo.services.image-zoom-service >', () => {
  describe('for profitelo.services.image-zoom-service >', () => {

    let ImageZoomService

    beforeEach(module(($provide) => {
      $provide.value('apiUrl', 'awesomeURL')
    }))

    beforeEach(() => {
      module('profitelo.services.image-zoom-service')
    })

    beforeEach(inject(($injector) => {
      ImageZoomService = $injector.get('ImageZoomService')
    }))

    it('should have a dummy test', () => {
      expect(true).toBeTruthy()
    })
  })
})
