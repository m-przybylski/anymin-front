namespace profitelo.models {

  export interface Tag {
    id: string
    name: string
    categoryId?: string
    status: TagStatus
  }
}