namespace profitelo.services.rootScope {

  export interface IRootScopeService extends ng.IRootScopeService {
    loggedIn: boolean
    $locale: ng.ILocaleService
  }
}
