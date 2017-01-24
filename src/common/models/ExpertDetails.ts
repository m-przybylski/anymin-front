module profitelo.models {

  export interface ExpertDetails {
    name: string
    avatar?: string
    description?: string
    languages: Array<string>
    files: Array<any>
    links: Array<string>
  }
}