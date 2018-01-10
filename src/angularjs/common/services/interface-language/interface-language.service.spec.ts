// General tests which not require specyfic mocked services
import * as angular from 'angular'
import {InterfaceLanguageService} from './interface-language.service'
import '../../../../../generated_modules/translations/pl-pl'
import '../../../../../generated_modules/translations/en-us'

describe('Unit testing: profitelo.services.interface-language >', function (): void {
  describe('for InterfaceLanguageService service >', function (): void {

    let InterfaceLanguageService: InterfaceLanguageService

    beforeEach(function (): void {
      angular.mock.module('profitelo.services.interface-language')
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      InterfaceLanguageService = $injector.get<InterfaceLanguageService>('InterfaceLanguageService')
    }))

    it('should have a dummy test', inject(function (): void {
      expect(true).toBeTruthy()
    }))

    describe('getInterfaceLanguages method >', function (): void {
      it('should be defined', function (): void {
        expect(InterfaceLanguageService.getInterfaceLanguages).toBeDefined()
        expect(typeof InterfaceLanguageService.getInterfaceLanguages).toBe('function')
      })

      it('should return array of objects with ietfCode and nameNative properties', function (): void {
        const foo = function (): boolean {
          let bool = true
          const arr = InterfaceLanguageService.getInterfaceLanguages()
          if (!arr[0].hasOwnProperty('nativeName')) {
            bool = false
          }
          if (!arr[0].hasOwnProperty('ietfCode')) {
            bool = false
          }
          return bool
        }
        expect(foo()).toBe(true)
      })
    })

    describe('getStartupLanguage method >', function (): void {
      it('should be defined', function (): void {
        expect(InterfaceLanguageService.getStartupLanguage).toBeDefined()
        expect(typeof InterfaceLanguageService.getStartupLanguage).toBe('function')
      })

      it('should set translation language from parameter', function (): void {
        expect(InterfaceLanguageService.getStartupLanguage('pl-pl')).toEqual('pl-pl')
      })
    })

    it('setLanguage method should be defined', function (): void {
      expect(InterfaceLanguageService.setLanguage).toBeDefined()
      expect(typeof InterfaceLanguageService.setLanguage).toBe('function')
    })

    describe('unifyToIetfCode method >', function (): void {
      it('should be defined', function (): void {
        expect(InterfaceLanguageService.unifyToIetfCode).toBeDefined()
        expect(typeof InterfaceLanguageService.unifyToIetfCode).toBe('function')
      })

      it('should return empty string if parameter not provided', function (): void {
        expect(InterfaceLanguageService.unifyToIetfCode('')).toEqual('')
      })

      it('should return language with standarts of ietf codes', function (): void {
        expect(InterfaceLanguageService.unifyToIetfCode('pl-pl')).toEqual('pl-pl')
        expect(InterfaceLanguageService.unifyToIetfCode(' pl-pl ')).toEqual('pl-pl')
        expect(InterfaceLanguageService.unifyToIetfCode('pl_PL')).toEqual('pl-pl')
      })
    })
  })
})

// letiable lang from URL
describe('Unit testing: profitelo.services.interface-language >', function (): void {
  describe('for InterfaceLanguageService service >', function (): void {

    interface ILanguages {
      lang: string
    }
    let InterfaceLanguageService: any = null

    beforeEach(function (): void {
      const mocekdLocation = {
        search: function (): ILanguages {
          return {lang: 'en-us'}
        }
      }
      angular.mock.module('profitelo.services.interface-language', function ($provide: ng.auto.IProvideService): void {
        $provide.value('$location', mocekdLocation)
      })
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    afterEach(function (): void {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function (): void {
      it('should set translation language from URL letiable', function (): void {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })
    })

  })
})

// found right language into cookie
describe('Unit testing: profitelo.services.interface-language >', function (): void {
  describe('for InterfaceLanguageService service >', function (): void {

    let InterfaceLanguageService: any = null

    beforeEach(function (): void {
      const mockedCookie = {
        get: function (_value: any): string {
          return 'en-us'
        }
      }
      angular.mock.module('profitelo.services.interface-language', function ($provide: ng.auto.IProvideService): void {
        $provide.value('$cookies', mockedCookie)
      })
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    afterEach(function (): void {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function (): void {
      it('should set language from cookie if its code exists into `_interfaceLanguages` array', function (): void {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('en-us')
      })
    })
  })

  // language into cookie was not found into `_interfaceLanguages` so we set default
  describe('for InterfaceLanguageService service >', function (): void {

    let InterfaceLanguageService: any = null

    beforeEach(function (): void {
      const mockedCookie = {
        get: function (_value: any): string {
          return 'kaz-kaz'
        }
      }
      angular.mock.module('profitelo.services.interface-language', function ($provide: ng.auto.IProvideService): void {
        $provide.value('$cookies', mockedCookie)
      })
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
    }))

    afterEach(function (): void {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function (): void {
      it('should set default language into cookie was not found into `_interfaceLanguages` if not found', function (): void {
        expect(InterfaceLanguageService.getStartupLanguage()).toEqual('pl-pl')
      })
    })

  })
})

// Tests with specyfic mocked services
describe('Unit testing: profitelo.services.interface-language >', function (): void {

  let realTranslate: any // Hack to get full translate object for further tests !!!
  describe('Hack to get full translate object for further test', function (): void {

    beforeEach(function (): void {
      angular.mock.module('profitelo.services.interface-language')
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      realTranslate = $injector.get('$translate')
    }))

    it('this accually just inject $translate object before evaluate next test', function (): void {
    })
  })

  // found language
  describe('for InterfaceLanguageService service >', function (): void {
    describe('getStartupLanguage method with mocked services >', function (): void {

      let InterfaceLanguageService: InterfaceLanguageService

      beforeEach(function (): void {
        const mockedTranslation = realTranslate
        mockedTranslation.use = function (_value: any): string { // mock letiable
          return 'en-us' // language that should exsist into array
        }

        angular.mock.module('profitelo.services.interface-language', function ($provide: ng.auto.IProvideService): void {
          $provide.value('$translate', mockedTranslation)
        })
      })

      beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
        InterfaceLanguageService = $injector.get<InterfaceLanguageService>('InterfaceLanguageService')
      }))

    })
  })

  // not found a language
  describe('for InterfaceLanguageService service >', function (): void {
    describe('getStartupLanguage method with mocked services >', function (): void {

      let InterfaceLanguageService: any = null

      beforeEach(function (): void {
        const mockedTranslation = realTranslate
        mockedTranslation.use = function (_value: any): string { // mock letiable
          return 'kuz-kaz'  // language that wont exsist into array
        }

        angular.mock.module('profitelo.services.interface-language', function ($provide: ng.auto.IProvideService): void {
          $provide.value('$translate', mockedTranslation)
        })
      })

      beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
        InterfaceLanguageService = $injector.get('InterfaceLanguageService')
      }))

      afterEach(function (): void {
        InterfaceLanguageService = null
      })

    })
  })
})

// letiable lang from URL
describe('Unit testing: profitelo.services.interface-language >', function (): void {
  describe('for InterfaceLanguageService service >', function (): void {

    let InterfaceLanguageService: any = null
    let http: any = null
    let moment: any = null
    let translate: ng.translate.ITranslateService
    let cookies: ng.cookies.ICookiesService

    beforeEach(function (): void {
      angular.mock.module('profitelo.services.interface-language')
    })

    beforeEach(inject(function ($injector: ng.auto.IInjectorService): void {
      InterfaceLanguageService = $injector.get('InterfaceLanguageService')
      http = $injector.get('$http')
      moment = $injector.get('moment')
      translate = $injector.get<ng.translate.ITranslateService>('$translate')
      cookies = $injector.get<ng.cookies.ICookiesService>('$cookies')
    }))

    afterEach(function (): void {
      InterfaceLanguageService = null
    })

    describe('getStartupLanguage method with mocked services >', function (): void {
      it('setLanguage method should be defined', function (): void {
        InterfaceLanguageService.setLanguage('en-us')
        expect(http.defaults.headers.common['X-LANG']).toEqual('en-us')
        expect(moment.locale()).toEqual('en')
        expect(translate.use()).toEqual('en-us')
        expect(cookies.get('selectedInterfaceLanguage')).toEqual('en-us')
      })
    })

  })
})
