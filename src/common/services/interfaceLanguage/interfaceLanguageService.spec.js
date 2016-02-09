describe('Unit testing: profitelo.services.interfaceLanguage >', function() {
  return describe('for InterfaceLanguageService service >', function() {

    var InterfaceLanguageService = null

    beforeEach(function() {
      module('profitelo.services.interfaceLanguage')

      inject(function($injector) {
        InterfaceLanguageService = $injector.get('InterfaceLanguageService')
      })
    })

    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))


    describe('getInterfaceLanguages method >', function() {
      it('should be defined', function() {
        expect(InterfaceLanguageService.getInterfaceLanguages).toBeDefined()
        expect(typeof InterfaceLanguageService.getInterfaceLanguages).toBe('function')
      })

      it('should return array of objects with ietfCode and nameNative properties', function() {
        let foo = function () {
          let bool = true
          let arr = InterfaceLanguageService.getInterfaceLanguages()
          if (!arr[0].hasOwnProperty('nativeName')) { bool = false }
          if (!arr[0].hasOwnProperty('ietfCode')) { bool = false }
          return bool
        }
        expect(foo()).toBe(true)
      })
    })


    it('getStartupLanguage method should be defined', function() {
      expect(InterfaceLanguageService.getStartupLanguage).toBeDefined()
      expect(typeof InterfaceLanguageService.getStartupLanguage).toBe('function')
    })


    it('setLanguage method should be defined', function() {
      expect(InterfaceLanguageService.setLanguage).toBeDefined()
      expect(typeof InterfaceLanguageService.setLanguage).toBe('function')
    })


    it('unifyToIetfCode method should be defined', function() {
      expect(InterfaceLanguageService.unifyToIetfCode).toBeDefined()
      expect(typeof InterfaceLanguageService.unifyToIetfCode).toBe('function')
    })

    it('unifyToIetfCode should return language with standarts of ietf codes', function() {
      expect(InterfaceLanguageService.unifyToIetfCode('pl-pl')).toEqual('pl-pl')
      expect(InterfaceLanguageService.unifyToIetfCode('pl_PL')).toEqual('pl-pl')
    })

  })
})
