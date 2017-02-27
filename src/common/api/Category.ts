namespace profitelo.api {


  export interface Category {
      recordable: boolean;
      id: string;
      parentCategoryId?: string;
      slug: string;
      persisted?: boolean;
      priority: number;
  }

}
