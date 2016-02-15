
// General tests which not require specyfic mocked services
describe('Unit testing: profitelo.services.interfaceLanguage >', function() {
  describe('for InterfaceLanguageService service >', function() {

    let InterfaceLanguageService  = null

    beforeEach(function() {
      module('profitelo.services.interfaceLanguage')
    })


    beforeEach(inject(function($injector) {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))


    it('should have a dummy test', inject(function() {
      expect(true).toBeTruthy()
    }))


    describe('getInterfaceLanguages method >', function() {
      it('should be defined', function() {
        expect(InterfaceLanguageService.getInterfaceLanguages).toBeDefined()
        expect(typeof InterfaceLanguageService.getInterfaceLanguages).toBe('function')
      })

      it('should return array of objects with ietfCode and nameNative properties', function() {
        let foo = function() {
          let bool = true
          let arr = InterfaceLanguageService.getInterfaceLanguages()
          if (!arr[0].hasOwnProperty('nativeName')) { bool = false }
          if (!arr[0].hasOwnProperty('ietfCode')) { bool = false }
          return bool
        }
        expect(foo()).toBe(true)
      })
    })

    describe('getStartupLanguage method >', function() {
      it('should be defined', function() {
        expect(InterfaceLanguageService.getStartupLanguage).toBeDefined()
        expect(typeof InterfaceLanguageService.getStartupLanguage).toBe('function')
      })

      it('should set translation language from parameter', function() {
        expect(InterfaceLanguageService.getStartupLanguage('pl-pl')).toEqual('pl-pl')
      })
    })

    it('setLanguage method should be defined', function() {
      expect(InterfaceLanguageService.setLanguage).toBeDefined()
      expect(typeof InterfaceLanguageService.setLanguage).toBe('function')
    })


    describe('unifyToIetfCode method >', function() {
      it('should be defined', function() {
        expect(InterfaceLanguageService.unifyToIetfCode).toBeDefined()
        expect(typeof InterfaceLanguageService.unifyToIetfCode).toBe('function')
      })

      it('should return empty string if parameter not provided', function() {
        expect(InterfaceLanguageService.unifyToIetfCode()).toEqual('')
      })

      it('should return language with standarts of ietf codes', function() {
        expect(InterfaceLanguageService.unifyToIetfCode('pl-pl')).toEqual('pl-pl')
        expect(InterfaceLanguageService.unifyToIetfCode('pl_PL')).toEqual('pl-pl')
      })
    })
  })
})


// Tests with specyfic mocked services
describe('Unit testing: profitelo.services.interfaceLanguage >', function() {
  describe('for InterfaceLanguageService service >', function() {

    let InterfaceLanguageService  = null

    beforeEach(function() {
      let mocekdLocation = {
        search: function() {
          return {lang: 'en-us'}
        }
      }
      module('profitelo.services.interfaceLanguage', function ($provide) {
        $provide.value('$location', mocekdLocation)
      })
    })

    beforeEach(inject(function($injector) {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    describe('getStartupLanguage method with mocked services >', function() {
      it('should set translation language from URL variable', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })
    })

  })
})


// Tests with specyfic mocked services
describe('Unit testing: profitelo.services.interfaceLanguage >', function() {
  describe('for InterfaceLanguageService service >', function() {

    let InterfaceLanguageService  = null

    beforeEach(function() {
      let mockedCookie = {
        get: function(value) {
          return 'en-us'
        }
      }
      module('profitelo.services.interfaceLanguage', function ($provide) {
        $provide.value('$cookies',  mockedCookie)
      })
    })

    beforeEach(inject(function($injector) {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    describe('getStartupLanguage method with mocked services >', function() {
      it('should set read translation language from cookie if its code exists into `_interfaceLanguages` array', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })
    })

  })
})


// Tests with specyfic mocked services
describe('Unit testing: profitelo.services.interfaceLanguage >', function() {
  describe('for InterfaceLanguageService service >', function() {

    let InterfaceLanguageService  = null

    beforeEach(function() {
      let mockedCookie = {
        get: function(value) {
          return 'de-de'
        }
      }
      module('profitelo.services.interfaceLanguage', function ($provide) {
        $provide.value('$cookies',  mockedCookie)
      })
    })

    beforeEach(inject(function($injector) {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    describe('getStartupLanguage method with mocked services >', function() {
      it('should set default translation language if value into cookie does not exist in language array', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('pl-pl')
      })
    })

  })
})

