import { TranslatorService } from '../../services/translator/translator.service';

export interface IConfirmAlertScope extends ng.IScope {
  onCancel?: () => void;
  onConfirm: () => void;
  translationMessage: string;
}

export class ConfirmAlertController {

  public static $inject = ['$scope', '$uibModalInstance', 'translatorService'];
  public messageText: string;

  constructor(private $scope: IConfirmAlertScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              translationService: TranslatorService) {
    this.messageText = translationService.translate($scope.translationMessage);
  }

  public onConfirm = (): void => {
    this.$uibModalInstance.close();
    this.$scope.onConfirm();
  }

  public onCancel = (): void => {
    this.$uibModalInstance.close();
    if (this.$scope.onCancel) this.$scope.onCancel();
  }
}
