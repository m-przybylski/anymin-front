namespace profitelo.api {


  export interface ProfileFavourite {
      profileType: string /*ProfileFavourite.ProfileTypeEnum*/;
      createdAt: Date;
      profileId: string;
      accountId: string;
  }


  export namespace ProfileFavourite {
      export enum ProfileTypeEnum {
          EXP = <any> 'EXP',
          ORG = <any> 'ORG'
      }
  }
}
