namespace profitelo.services.filter {

  import MoneyDto = profitelo.api.MoneyDto

  export interface IFilterService extends ng.IFilterService {
    (name: 'translate'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'normalizeTranslationKey'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'semicolonToCommaInputFilter'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'searchBoldFilter'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'rankSearch'): {
      (translationId: Array<any>, interpolateParams?: any, interpolation?: Array<string>): string
    }
    (name: 'millisecondsToDatetime'): {
      (translationId: number, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'money'): {
      (translationId: MoneyDto, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'message'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
  }
}
