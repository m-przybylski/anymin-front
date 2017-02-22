namespace profitelo.api {


  export interface PatchAccount {
      currencyUnit?: string;
      countryISO?: string;
      status?: PatchAccountStatus;
      telcoPin?: string;
      unverifiedEmail?: string;
      password?: string;
  }

}
