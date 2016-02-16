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

    afterEach(function() {
      InterfaceLanguageService = null
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
        expect(InterfaceLanguageService.unifyToIetfCode(' pl-pl ')).toEqual('pl-pl')
        expect(InterfaceLanguageService.unifyToIetfCode('pl_PL')).toEqual('pl-pl')
      })
    })
  })
})


// variable lang from URL
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

    afterEach(function() {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function() {
      it('should set translation language from URL variable', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })
    })

  })
})


// found right language into cookie
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

    afterEach(function() {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function() {
      it('should set language from cookie if its code exists into `_interfaceLanguages` array', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })
    })
  })


  // language into cookie was not found into `_interfaceLanguages` so we set default
  describe('for InterfaceLanguageService service >', function() {

    let InterfaceLanguageService  = null

    beforeEach(function() {
      let mockedCookie = {
        get: function(value) {
          return 'kaz-kaz'
        }
      }
      module('profitelo.services.interfaceLanguage', function ($provide) {
        $provide.value('$cookies',  mockedCookie)
      })
    })

    beforeEach(inject(function($injector) {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    afterEach(function() {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function() {
      it('should set default language into cookie was not found into `_interfaceLanguages` if not found', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('pl-pl')
      })
    })

  })
})



// Tests with specyfic mocked services
describe('Unit testing: profitelo.services.interfaceLanguage >', function() {

  var realTranslate // Hack to get full translate object for further tests !!!
  describe('Hack to get full translate object for further test', function() {

    beforeEach( function() {
      module('profitelo.services.interfaceLanguage')
    })

    beforeEach(inject(function($injector) {
      realTranslate = $injector.get('$translate')
    }))

    // afterEach(function() {
    //   InterfaceLanguageService = null
    // })

    it('this accually just inject $translate object before evaluate next test', function() {})
  })


  // found language
  describe('for InterfaceLanguageService service >', function() {
    describe('getStartupLanguage method with mocked services >', function() {

      let InterfaceLanguageService = null

      beforeEach(function() {
        let mockedTranslation = realTranslate
        mockedTranslation.use = function(value) { // mock variable
          return 'en-us' // language that should exsist into array
        }

        module('profitelo.services.interfaceLanguage', function ($provide) {
          $provide.value('$translate',  mockedTranslation)
        })
      })

      beforeEach(inject(function($injector) {
        InterfaceLanguageService = $injector.get('InterfaceLanguageService')
      }))

      afterEach(function() {
        InterfaceLanguageService = null
      })


      it('should set translation language if any parameter, URL or cookie has not been provided and exists into `_interfaceLanguages` array', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })

    })
  })


  // not found a language
  describe('for InterfaceLanguageService service >', function() {
    describe('getStartupLanguage method with mocked services >', function() {

      let InterfaceLanguageService = null

      beforeEach(function() {
        let mockedTranslation = realTranslate
        mockedTranslation.use = function(value) { // mock variable
          return 'kuz-kaz'  // language that wont exsist into array
        }

        module('profitelo.services.interfaceLanguage', function ($provide) {
          $provide.value('$translate',  mockedTranslation)
        })
      })

      beforeEach(inject(function($injector) {
        InterfaceLanguageService = $injector.get('InterfaceLanguageService')
      }))

      afterEach(function() {
        InterfaceLanguageService = null
      })


      it('should set default translation language if any parameter, URL or cookie has not been provided and not exists into `_interfaceLanguages` array', function() {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('pl-pl')
      })

    })
  })
})


// variable lang from URL
describe('Unit testing: profitelo.services.interfaceLanguage >', function() {
  describe('for InterfaceLanguageService service >', function() {

    let InterfaceLanguageService  = null
    let http = null
    let moment = null
    let translate = null
    let cookies = null

    beforeEach(function() {
      module('profitelo.services.interfaceLanguage')
    })

    beforeEach(inject(function($injector) {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
      http        = $injector.get('$http')
      moment      = $injector.get('moment')
      translate   = $injector.get('$translate')
      cookies     = $injector.get('$cookies')
    }))

    afterEach(function() {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function() {
      it('setLanguage method should be defined', function() {
        InterfaceLanguageService.setLanguage('en-us')
        expect(http.defaults.headers.common['X-LANG']).toEqual('en-us')
        expect(moment.locale()).toEqual('en')
        expect(translate.use()).toEqual('en-us')
        expect(cookies.get('selectedInterfaceLanguage')).toEqual('en-us')
      })
    })

  })
})
