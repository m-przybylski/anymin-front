import { Injectable, Inject } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlSegment,
  PRIMARY_OUTLET,
} from '@angular/router';
import { LoggerFactory, LoggerService } from '@anymind-ng/core';
import { UserSessionService } from '../../../core/services/user-session/user-session.service';
import { Observable, from, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { httpCodes } from '../../constants/httpCodes';
import { RouterPaths, RouterPathsToken } from '../../routes/routes';

/**
 * Responsible of this guard is to check weather user is looged
 * or not and redirect to specific path.
 *
 * Guard gets ifroamtion from session if user is logged or nor
 * Guard calls matchPath to retrieve destination path and redirectes
 * to that path if needed.
 *
 */
@Injectable()
export class ProfileGuard implements CanActivate {
  private logger: LoggerService;

  constructor(
    private userSessionService: UserSessionService,
    private router: Router,
    loggerFactory: LoggerFactory,
    @Inject(RouterPathsToken) private routerPaths: typeof RouterPaths,
  ) {
    this.logger = loggerFactory.createLoggerService('ProfileGuard');
  }

  public canActivate = (_route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> =>
    from(this.userSessionService.getSession()).pipe(
      map(() => true),
      catchError(error => (error.status === httpCodes.unauthorized ? of(false) : throwError(error))),
      map(logged => {
        const redirectTo = this.matchPath(this.buildRedirectMap())(this.getUrlSegmentsWithNoParam(state.url), logged);
        if (redirectTo !== undefined) {
          this.logger.debug(`redirecting to ${redirectTo} and ID :)`);
          void setTimeout(() => {
            void this.router.navigate([...redirectTo.map(segment => segment.toString()), this.getLastParam(state.url)]);
          }, 0);

          return false;
        }

        return true;
      }),
    );

  private buildRedirectMap = (): IRedirectMap =>
    /**
     * setup map. Each path profile, company etc has logged and unlogged property
     * which represents path path to be redirected to.
     */
    new Map([
      [
        'profile',
        {
          logged: this.getUrlSegmentsWithNoParam(this.routerPaths.dashboard.user.profile.asPath),
          unlogged: this.getUrlSegmentsWithNoParam(this.routerPaths.browse.user.asPath),
        },
      ],
      [
        'company',
        {
          logged: this.getUrlSegmentsWithNoParam(this.routerPaths.dashboard.company.profile.asPath),
          unlogged: this.getUrlSegmentsWithNoParam(this.routerPaths.browse.company.asPath),
        },
      ],
    ]);

  /** function retrives opposite path to proviced one
   * logged <=> not logged
   *
   * first step is to setup
   * @param redirectMap map of looged and unlogged paths
   * @return function described below
   *
   * second step is to get path to be redirected to
   * @param currentPath array of URL segments for activated route
   * @param logged boolean flag determines if user is logged or not
   * @return URL segments with path to be redirected or undefined if path not found
   */
  private matchPath = (
    redirectMap: IRedirectMap,
  ): ((currentPath: ReadonlyArray<UrlSegment>, logged: boolean) => ReadonlyArray<UrlSegment> | undefined) => (
    currentPath: ReadonlyArray<UrlSegment>,
    logged: boolean,
  ): ReadonlyArray<UrlSegment> | undefined => {
    try {
      redirectMap.forEach(value => {
        if (this.comparePaths(value.logged, currentPath) && !logged) {
          throw value.unlogged;
        }
        if (this.comparePaths(value.unlogged, currentPath) && logged) {
          throw value.logged;
        }
      }, this);
    } catch (err) {
      this.logger.debug(`Path found for redirect: ${err}, current path: ${currentPath.join('/')}, logged: ${logged}`);

      return err;
    }
    this.logger.debug(`No path found for redirect current path: ${currentPath.join('/')}, logged: ${logged}`);

    return undefined;
  };

  private comparePaths = (left: ReadonlyArray<UrlSegment>, right: ReadonlyArray<UrlSegment>): boolean => {
    if (left.length !== right.length) {
      return false;
    }

    return left.every((segment, index) => right[index].toString() === segment.toString());
  };

  private getUrlSegments = (url: string): ReadonlyArray<UrlSegment> =>
    this.router.parseUrl(url).root.children[PRIMARY_OUTLET].segments;

  private getUrlSegmentsWithNoParam = (url: string): ReadonlyArray<UrlSegment> =>
    this.getUrlSegments(url).filter(
      (_segment: UrlSegment, index: number, array: ReadonlyArray<UrlSegment>): boolean => index < array.length - 1,
    );

  private getLastParam = (url: string): string => {
    const paramsArray = this.getUrlSegments(url);

    return paramsArray[paramsArray.length - 1].toString();
  };
}

type IRedirectMap = Map<string, { logged: ReadonlyArray<UrlSegment>; unlogged: ReadonlyArray<UrlSegment> }>;
