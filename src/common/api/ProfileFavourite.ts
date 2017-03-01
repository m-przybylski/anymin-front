namespace profitelo.api {


  export interface ProfileFavourite {
      accountId: string;
      profileId: string;
      profileType: string /*ProfileFavourite.ProfileTypeEnum*/;
      createdAt: Date;
  }


  export namespace ProfileFavourite {
      export enum ProfileTypeEnum {
          EXP = <any> 'EXP',
          ORG = <any> 'ORG'
      }
  }
}
