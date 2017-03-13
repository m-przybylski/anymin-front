import {MoneyDto} from "../api/model/MoneyDto"
import {Tag} from "../api/model/Tag"


export interface ServiceDetails {
  name: string
  price: MoneyDto
  tags?: Array<Tag | string>
}
