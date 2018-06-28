// tslint:disable:no-duplicate-imports
// tslint:disable:no-any
// tslint:disable:newline-before-return
// tslint:disable:new-parens
import * as angular from 'angular';
import { MoneyDto, GetClientActivity, GetActivityFilters, GetClientActivities } from 'profitelo-api-ng/model/models';
import 'angularjs/common/components/dashboard/client/activities/client-activities/activity/activity';
import 'angularjs/common/components/interface/preloader-container/preloader-container';
import 'angularjs/common/components/complaints/status/status';
import dashboardFiltersModule from '../../../../common/components/dashboard/shared/filters/filters';
import {
  DashboardClientActivitiesService
} from '../../../../common/services/dashboard-client-activites/dashboard-client-activities.service';
import dashboardActivitiesModule from
        '../../../../common/services/dashboard-client-activites/dashboard-client-activites';
import { ActivitiesQueryParams } from '../../../../common/services/dashboard-client-activites/activities-query-params';
import noResultsInformationModule
  from '../../../../common/components/dashboard/no-results-information/no-results-information';
import promiseModule from '../../../../common/services/promise/promise';
import { PromiseService } from '../../../../common/services/promise/promise.service';
import errorHandlerModule from '../../../../common/services/error-handler/error-handler';
import { ErrorHandlerService } from '../../../../common/services/error-handler/error-handler.service';
import { StateService, StateProvider } from '@uirouter/angularjs';
import uiRouter from '@uirouter/angularjs';

// tslint:disable:member-ordering
export class DashboardClientActivitiesController {

    public static $inject = ['dashboardClientActivitiesService', 'promiseService', '$state', 'errorHandler',
        'filtersData', '$timeout'];

    private static readonly queryLimit = 10;
    private static readonly timeoutDelay = 400;
    private static readonly promiseLoaderDelay = 500;

    public balance: MoneyDto;
    public activities: GetClientActivity[];
    public isSearchLoading = true;
    public isActivitiesHistory = false;
    public isMoreResults: boolean;
    public isError = false;
    public filters: GetActivityFilters;
    public isActivitiesLoading = false;
    public translationCounter: {
        currentResultsCount: number
        allResultsCount: number
    };

    private activitiesQueryParam: ActivitiesQueryParams;

    constructor(private dashboardActivitiesService: DashboardClientActivitiesService,
                private promiseService: PromiseService,
                private $state: StateService,
                private errorHandler: ErrorHandlerService,
                filtersData: GetActivityFilters,
                $timeout: ng.ITimeoutService) {

        this.activitiesQueryParam = new ActivitiesQueryParams;
        this.setBasicQueryParam(this.activitiesQueryParam);
        this.getDashboardActivities(this.activitiesQueryParam)
            .then((getActivities) => {
                this.isActivitiesHistory = getActivities.activities.length > 0;
                this.activities = getActivities.activities;
                $timeout(() => {
                    this.isSearchLoading = false;
                    this.isError = false;
                }, DashboardClientActivitiesController.timeoutDelay);
                this.translationCounter = {
                    currentResultsCount: this.activities.length,
                    allResultsCount: getActivities.count
                };
                this.isMoreResults = !(getActivities.count === this.activities.length);
            });
        this.filters = filtersData;
    }

    public sendRequestAgain = (activitiesQueryParams: ActivitiesQueryParams): void => {
        this.isSearchLoading = true;
        this.getDashboardActivities(activitiesQueryParams).then((getActivities) => {
            this.activities = getActivities.activities;
            this.isSearchLoading = false;
            this.isError = false;
        });
    }

    public loadMoreActivities = (): void => {
        this.isActivitiesLoading = true;
        this.activitiesQueryParam.setOffset(this.activities.length);

        this.promiseService.setMinimalDelay(
            this.dashboardActivitiesService.getDashboardClientActivities(this.activitiesQueryParam),
            DashboardClientActivitiesController.promiseLoaderDelay).then((getActivities) => {
            this.activities = this.activities.concat(getActivities.activities);
            this.isMoreResults = getActivities.count > DashboardClientActivitiesController.queryLimit;
            this.translationCounter.currentResultsCount = this.activities.length;
        }).catch((error) => {
            this.errorHandler.handleServerError(error, 'Can not load more activities');
        }).finally(() => {
            this.isActivitiesLoading = false;
        });
    }

    public onSetFiltersParams = (activitiesQueryParams: ActivitiesQueryParams): void => {
        this.setBasicQueryParam(activitiesQueryParams);
        this.getDashboardActivities(activitiesQueryParams)
            .then((getActivities) => {
                this.activitiesQueryParam = activitiesQueryParams;
                this.activities = getActivities.activities;
            });
    }

    public searchForExpert = (): void => {
        this.$state.go('app.search-result');
    }

    private getDashboardActivities = (activitiesQueryParams: ActivitiesQueryParams):
        ng.IPromise<GetClientActivities> => {
        const promise = this.dashboardActivitiesService.getDashboardClientActivities(activitiesQueryParams);

        promise.catch((error) => {
            this.isSearchLoading = false;
            this.isError = true;
            this.errorHandler.handleServerError(error, 'Can not load activities');
        });
        return promise;
    }

    private setBasicQueryParam = (activitiesQueryParams: ActivitiesQueryParams): void => {
        activitiesQueryParams.setLimit(DashboardClientActivitiesController.queryLimit);
        activitiesQueryParams.setOffset(0);
    }

}

angular.module('profitelo.controller.dashboard.client.activities', [
    dashboardFiltersModule,
    uiRouter,
    dashboardActivitiesModule,
    'profitelo.components.dashboard.client.activities.client-activity',
    'profitelo.components.interface.preloader-container',
    'profitelo.components.complaints.status',
    noResultsInformationModule,
    promiseModule,
    errorHandlerModule
])
    .config(['$stateProvider', ($stateProvider: StateProvider): void => {
        $stateProvider.state('app.dashboard.client.activities', {
            url: '/activities',
            template: require('./activities.html'),
            controller: 'dashboardClientActivitiesController',
            controllerAs: 'vm',
            resolve: {
                filtersData: ['dashboardClientActivitiesService',
                    (dashboardActivitiesService: DashboardClientActivitiesService):
                        ng.IPromise<GetActivityFilters | void> =>
                        dashboardActivitiesService.resolveFilters().catch(handleFilterResponseError)]
            }
        });
    }])
    .controller('dashboardClientActivitiesController', DashboardClientActivitiesController);

function handleFilterResponseError(error: any): void {
    this.logger.warn('ClientActivitiesModule: Can not get filters data: ' + String(error));
}
