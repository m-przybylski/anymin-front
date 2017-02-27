namespace profitelo.api {


  export interface PostServiceDetails {
      price: MoneyDto;
      name: string;
      tags: Array<PostServiceTag>;
  }

}
