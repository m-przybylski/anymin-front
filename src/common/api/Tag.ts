namespace profitelo.api {


  export interface Tag {
      categoryId?: string;
      name: string;
      id: string;
      persisted?: boolean;
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
