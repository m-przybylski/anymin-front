import { TranslatorService } from '../../services/translator/translator.service';
import { IInfoAlertScope, InfoAlertController } from './info-alert.controller';

describe('Testing Controller: info alert', () => {

  let scope: IInfoAlertScope;
  const $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance =
    jasmine.createSpyObj('$uibModalInstance', ['close', 'dismiss']);
  const translatorService: TranslatorService = jasmine.createSpyObj('translatorService',
    ['translate']);

  const createController = ($controller: ng.IControllerService): InfoAlertController =>
    $controller<InfoAlertController>(InfoAlertController, {
      $scope: scope,
      $uibModalInstance,
      translatorService
    });

  beforeEach(() => {
    inject(($rootScope: ng.IRootScopeService) => {
      scope = <IInfoAlertScope>$rootScope.$new();
      scope.translationMessage = 'TRANSLATE.MESSAGE';
      scope.onModalClose = (): void => void 0;
    });
  });

  it('should exists', inject(($controller: ng.IControllerService) => {
    expect(!!createController($controller)).toBe(true);
  }));

  it('should call scope callback onModalsClose after user press confirm button',
    inject(($controller: ng.IControllerService) => {
      spyOn(scope, 'onModalClose');
      createController($controller).closeModal();
      expect(scope.onModalClose).toHaveBeenCalled();
    }));

  it('should translate message after modal init', inject(($controller: ng.IControllerService) => {
    createController($controller);
    expect(translatorService.translate).toHaveBeenCalled();
  }));
});
