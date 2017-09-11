import {MoneyDto} from 'profitelo-api-ng/model/models'
import {Message} from 'ratel-sdk-js'

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
    (translationId: any[], interpolateParams?: any, interpolation?: string[]): string
  }
  (name: 'millisecondsToDatetime'): {
    (translationId: number, interpolateParams?: any, interpolation?: string): string
  }
  (name: 'money'): {
    (translationId: MoneyDto, interpolateParams?: any, interpolation?: string): string
  }
  (name: 'message'): {
    (message: Message, interpolateParams?: any, interpolation?: string): string
  }
  (name: 'newLineFilter'): {
    (content: string): string
  }
}

