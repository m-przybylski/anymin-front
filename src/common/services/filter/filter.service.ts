namespace profitelo.services.filter {
  export interface IFilterService extends ng.IFilterService {
    (name: 'translate'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
    (name: 'normalizeTranslationKey'): {
      (translationId: string, interpolateParams?: any, interpolation?: string): string
    }
  }
}