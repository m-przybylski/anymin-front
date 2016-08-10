describe('Unit testing: profitelo.services.wizardSectionControl >', function() {
  describe('for profitelo.services.wizardSectionControl >', function() {

    let smoothScrolling


    beforeEach(function() {
      module('profitelo.services.wizardSectionControl')
    })


    beforeEach(inject(function($injector) {
      smoothScrolling = $injector.get('wizardSectionControlService')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))

  })
})
