namespace profitelo.api {


  export interface PatchMobileViewsPermissions {
      mobilePin?: string;
      protectedViews?: Array<string>;
      password: string;
  }

}
