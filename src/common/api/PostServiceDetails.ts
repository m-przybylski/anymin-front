namespace profitelo.api {


  export interface PostServiceDetails {
      name: string;
      tags: Array<PostServiceTag>;
      price: MoneyDto;
  }

}
