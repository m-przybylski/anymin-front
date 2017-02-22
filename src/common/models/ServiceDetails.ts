namespace profitelo.models {

  import Tag = profitelo.api.Tag
  import MoneyDto = profitelo.api.MoneyDto

  export interface ServiceDetails {
    name: string
    price: MoneyDto
    tags?: Array<Tag | string>
  }
}
