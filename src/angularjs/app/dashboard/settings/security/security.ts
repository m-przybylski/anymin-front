// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-template
// tslint:disable:no-shadowed-variable
// tslint:disable:no-require-imports
// tslint:disable:no-import-side-effect
// tslint:disable:no-implicit-dependencies
// tslint:disable:no-duplicate-imports
// tslint:disable-next-line:import-blacklist
import * as _ from 'lodash';
import apiModule from 'profitelo-api-ng/api.module';
import { SessionApi } from 'profitelo-api-ng/api/api';
import { GetSession } from 'profitelo-api-ng/model/models';
import { ModalsService } from '../../../../common/services/modals/modals.service';
import * as angular from 'angular';
import userModule from '../../../../common/services/user/user';
import modalsModule from '../../../../common/services/modals/modals';
import { ISecuritySettingsService } from '../../../../common/resolvers/security-settings/security-settings.service';
import 'angularjs/common/resolvers/security-settings/security-settings.service';
import 'angularjs/common/components/dashboard/settings/manage-devices/manage-devices';
import { SessionServiceWrapper } from '../../../../common/services/session/session.service';
import { UserService } from '../../../../common/services/user/user.service';
import { StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';
import { TopAlertService } from '../../../../common/services/top-alert/top-alert.service';
import topAlertModule from '../../../../common/services/top-alert/top-alert';
import { TranslatorService } from '../../../../common/services/translator/translator.service';
import { ProfiteloWebsocketService } from '../../../../common/services/profitelo-websocket/profitelo-websocket.service';
import { ISessionDeleted } from '../../../../common/services/session-deleted/session-deleted.service';

interface ISession {
  device: string;
  status: boolean;
  city?: string;
  system: string;
  apiKey: string;
}

// tslint:disable:member-ordering
export class DashboardSettingsSecurityController implements ng.IController {
  public hasMobilePin: boolean;
  public sessions: ISession[];

  public static $inject = ['modalsService', 'currentSession', 'SessionApi', 'userService', 'topAlertService',
    'translatorService', '$location', 'sessionsData', 'profiteloWebsocket'];

  constructor(private modalsService: ModalsService,
              private currentSession: GetSession,
              private SessionApi: SessionApi,
              private userService: UserService,
              private topAlertService: TopAlertService,
              private translatorService: TranslatorService,
              private $location: ng.ILocationService,
              sessionsData: GetSession[],
              profiteloWebsocket: ProfiteloWebsocketService) {

    if (currentSession.account) {
      this.hasMobilePin = currentSession.account.hasMobilePin;
    }

    this.sessions = sessionsData.map((session) => {
      // tslint:disable-next-line:cyclomatic-complexity
      const deviceType = (): string => {
        if (
          session.userAgent && (
            session.userAgent.includes('Win') ||
            session.userAgent.includes('Mac') ||
            session.userAgent.includes('Linux'))
        ) {
          return 'desktop';
        } else if (
          session.userAgent && (session.userAgent.includes('Android') ||
            session.userAgent.includes('Mobile') ||
            session.userAgent.includes('iOS') ||
            session.userAgent.includes('Windows Phone'))
        ) {
          return 'mobile';
        } else {
          return 'unknown';
        }
      };

      return {
        device: deviceType(),
        status: currentSession.apiKey === session.apiKey,
        city: session.city,
        system: String(session.userAgent),
        apiKey: session.apiKey
      };
    });

    profiteloWebsocket.onSessionDeleted(this.onSessionDeleted);

  }

  public removeSession = (apiKey: string): void => {
    if (this.currentSession.apiKey !== apiKey) {
      this.SessionApi.logoutRoute(apiKey).then(() => {
        _.remove(this.sessions, session => session.apiKey === apiKey);
      }, (error) => {
        throw new Error('Can not delete this session ' + String(error));
      });
    } else {
      this.userService.logout().then(() => {
        this.$location.path('/login');
        this.topAlertService.success({
          message: this.translatorService.translate('LOGIN.SUCCESSFUL_LOGOUT'),
          timeout: 2
        });
      });
    }
  }

  public checkIsCurrentSession = (apiKey: string): boolean => apiKey === this.currentSession.apiKey;

  public openSecurityChangePasswordSettingsModal = (): void => {
    this.modalsService.createSecurityChangePasswordSettingsModal();
  }

  public openSecurityPinSecuritySettingsModal = (): void => {
    this.modalsService.createSecurityPinSecuritySettingsModal();
  }

  private onSessionDeleted = (deletedSession: ISessionDeleted): void => {
    _.remove(this.sessions, session => session.apiKey === deletedSession.removedSessionApiKey);
  }
}

angular.module('profitelo.controller.dashboard.settings.security', [
  userModule,
  uiRouter,
  apiModule,
  topAlertModule,
  'profitelo.resolvers.security-settings',
  'profitelo.components.dashboard.settings.manage-devices',
  modalsModule
])
  .config(['$stateProvider', ($stateProvider: StateProvider): void => {
    $stateProvider.state('app.dashboard.settings.security', {
      url: '/security',
      template: require('./security.html'),
      controller: 'dashboardSettingsSecurityController',
      controllerAs: 'vm',
      resolve: {
        currentSession: ['sessionServiceWrapper',
          (sessionServiceWrapper: SessionServiceWrapper): ng.IPromise<GetSession> =>
            sessionServiceWrapper.getSession(true)],
        sessionsData: ['securitySettingsResolver',
          (securitySettingsResolver: ISecuritySettingsService): ng.IPromise<GetSession[]> =>
            securitySettingsResolver.resolve()]
      }
    });
  }])
  .controller('dashboardSettingsSecurityController', DashboardSettingsSecurityController);
