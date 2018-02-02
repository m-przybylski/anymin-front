import { ConfirmAlertController, IConfirmAlertScope } from './confirm-alert.controller';
import { TranslatorService } from '../../services/translator/translator.service';

describe('Testing Controller: confirm alert', () => {

  let scope: IConfirmAlertScope;
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
  const translatorService: TranslatorService = jasmine.createSpyObj('translatorService',
    ['translate']);

  const createController = ($controller: ng.IControllerService): ConfirmAlertController =>
    $controller<ConfirmAlertController>(ConfirmAlertController, {
      $scope: scope,
      $uibModalInstance,
      translatorService
    });

  beforeEach(() => {
    inject(($rootScope: ng.IRootScopeService) => {

      scope = <IConfirmAlertScope>$rootScope.$new();
      scope.onCancel = (): void => void 0;
      scope.onConfirm = (): void => void 0;
      scope.translationMessage = 'TRANSLATE.MESSAGE';
    });
  });

  it('should exists', inject(($controller: ng.IControllerService) => {
    expect(!!createController($controller)).toBe(true);
  }));

  it('should call scope callback onConfirm after user press confirm button',
    inject(($controller: ng.IControllerService) => {
      spyOn(scope, 'onConfirm');
      createController($controller).onConfirm();
      expect(scope.onConfirm).toHaveBeenCalled();
    }));

  it('should call scope callback onCancel after user press cancel button',
    inject(($controller: ng.IControllerService) => {
      spyOn(scope, 'onCancel');
      createController($controller).onCancel();
      expect(scope.onCancel).toHaveBeenCalled();
    }));

  it('should translate message after modal init', inject(($controller: ng.IControllerService) => {
    createController($controller);
    expect(translatorService.translate).toHaveBeenCalled();
  }));
});
