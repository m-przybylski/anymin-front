namespace profitelo.api {


  export interface Category {
      priority: number;
      parentCategoryId?: string;
      recordable: boolean;
      slug: string;
      persisted?: boolean;
      id: string;
  }

}
