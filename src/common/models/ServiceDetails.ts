namespace profitelo.models {

  export interface ServiceDetails {
    name: string
    price: Money
    tags?: Array<Tag | string>
  }
}
