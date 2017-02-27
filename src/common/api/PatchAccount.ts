namespace profitelo.api {


  export interface PatchAccount {
      telcoPin?: string;
      currencyUnit?: string;
      unverifiedEmail?: string;
      status?: PatchAccountStatus;
      password?: string;
      countryISO?: string;
  }

}
