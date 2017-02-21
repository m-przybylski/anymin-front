namespace profitelo.api {


  export interface Tag {
      name: string;
      categoryId?: string;
      persisted?: boolean;
      id: string;
      status: string /*Tag.StatusEnum*/;
  }


  export namespace Tag {
      export enum StatusEnum {
          NEW = <any> 'NEW',
          ACCEPTED = <any> 'ACCEPTED',
          REJECTED = <any> 'REJECTED'
      }
  }
}
