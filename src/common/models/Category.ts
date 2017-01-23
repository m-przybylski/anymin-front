module profitelo.models {

  export interface Category {
    id: string
    slug: string
    recordable: boolean
    priority: number
  }
}