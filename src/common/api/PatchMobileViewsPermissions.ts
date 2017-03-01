namespace profitelo.api {


  export interface PatchMobileViewsPermissions {
      password: string;
      mobilePin?: string;
      protectedViews?: Array<string>;
  }

}
