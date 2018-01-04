import * as angular from 'angular'
import {
  ConsultationSummaryClientController,
  IConsultationSummaryClientControllerScope
} from './consultation-summary-client.controller'
import consultationSummaryClientModule from './consultation-summary-client'
import {ErrorHandlerService} from '../../../../services/error-handler/error-handler.service'
import {Tag} from 'profitelo-api-ng/model/models';

describe('Testing Controller: consultationSummaryClientController', () => {

  let consultationSummaryController: ConsultationSummaryClientController
  let scope: IConsultationSummaryClientControllerScope
  let errorHandler: ErrorHandlerService

  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss'])

  beforeEach(() => {
    angular.mock.module(consultationSummaryClientModule)
  })

  beforeEach(angular.mock.module(($provide: ng.auto.IProvideService) => {
    $provide.value('apiUrl', 'awesomeURL')
  }))

  beforeEach(() => {
    inject(($rootScope: ng.IRootScopeService, $controller: ng.IControllerService) => {

      scope = <IConsultationSummaryClientControllerScope>$rootScope.$new()

      const injectors = {
        errorHandler,
        $scope: scope,
        $uibModalInstance: $uibModalInstance,
        callSummaryService: {
          onCallSummary: (attr: string): string => attr,
          takeCallSummary: (serviceId: string): string => serviceId
        }
      }

      consultationSummaryController = $controller<ConsultationSummaryClientController>(
        'consultationSummaryClientController', injectors)
    })
  })

  it('should exists', () => {
    return expect(!!consultationSummaryController).toBe(true)
  })

  it('should show tags tab', () => {
    consultationSummaryController.showTagsTab()
    expect(consultationSummaryController.currentTab).toBe('tag')
  })

  it('should show comment tab', () => {
    consultationSummaryController.showCommentTab()
    expect(consultationSummaryController.currentTab).toBe('comment')
  })

  it('should comment valid', () => {
    consultationSummaryController.clientCommentInputValue = 'some comment'
    expect(consultationSummaryController.isCommentValid()).toEqual(true)
  })

  it('should set tab container size', () => {
    consultationSummaryController.setTabsContainerSize(33)
    expect(consultationSummaryController.tabsContainerStyles.height).toEqual(33)
  })

  it('should set tag on select', () => {
    const tag: Tag[] = [{
      id: 'id',
      name: 'name',
      status: Tag.StatusEnum.NEW,
      persisted: false
    }]
    consultationSummaryController.onTagsSelectChange(tag)
    expect(consultationSummaryController.tags).toEqual([{id: 'id',
      name: 'name',
      status: Tag.StatusEnum.NEW,
      persisted: false}])
  })

})
