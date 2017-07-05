import {PriceSearchParam} from 'profitelo-api-ng/model/models'

export class SearchQueryParams {

  private query: string
  private price: PriceSearchParam
  private languages: string[]
  private serviceType: string
  private tags: string[]
  private offset: number
  private count: number

  /* @ngInject */
  constructor(){}

  public getQuery = (): string => this.query
  public getPrice = (): PriceSearchParam => this.price
  public getLanguages= (): string[] => this.languages
  public getServiceType = (): string => this.serviceType
  public getTags = (): string[] => this.tags
  public getOffset = (): number => this.offset
  public getCount = (): number => this.count

  public setQuery = (query: string) => this.query = query
  public setPrice = (price: PriceSearchParam) => this.price = price
  public setLanguages = (languages: string[]) => this.languages = languages
  public setServiceType = (serviceType: string) => this.serviceType = serviceType
  public setTags = (tags: string[]) => this.tags = tags
  public setOffset = (offset: number) => this.offset = offset
  public setCount = (count: number) => this.count = count

}
