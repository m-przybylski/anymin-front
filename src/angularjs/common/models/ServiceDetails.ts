import {MoneyDto, Tag} from 'profitelo-api-ng/model/models'

export interface ServiceDetails {
  name: string
  price: MoneyDto
  tags?: Array<Tag | string>
}
