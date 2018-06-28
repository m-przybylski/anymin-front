// tslint:disable:deprecation
// tslint:disable:curly
import { TranslatorService } from '../../services/translator/translator.service';

export interface IInfoAlertScope extends ng.IScope {
  onModalClose?: () => void;
  translationMessage: string;
}

export class InfoAlertController {

  public static $inject = ['$scope', '$uibModalInstance', 'translatorService'];
  public messageText: string;

  constructor(private $scope: IInfoAlertScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              translationService: TranslatorService) {
    this.messageText = translationService.translate($scope.translationMessage);
  }

  public closeModal = (): void => {
    this.$uibModalInstance.close();
    if (this.$scope.onModalClose) this.$scope.onModalClose();
  }
}
