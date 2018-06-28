// tslint:disable:strict-boolean-expressions
// tslint:disable:prefer-method-signature
// tslint:disable:deprecation
// tslint:disable:curly
import { TranslatorService } from '../../services/translator/translator.service';

export interface IConfirmAlertScope extends ng.IScope {
  onCancel?: () => void;
  onConfirm: () => void;
  translationMessage: string;
  translationConfirmButtonMessage?: string;
}

export class ConfirmAlertController {

  public static $inject = ['$scope', '$uibModalInstance', 'translatorService'];
  public messageText: string;
  public messageConfirmButton: string;

  constructor(private $scope: IConfirmAlertScope,
              private $uibModalInstance: ng.ui.bootstrap.IModalServiceInstance,
              translationService: TranslatorService) {
    this.messageText = translationService.translate($scope.translationMessage);
    this.messageConfirmButton = $scope.translationConfirmButtonMessage ?
      translationService.translate($scope.translationConfirmButtonMessage) :
      translationService.translate('CONFIRM_ALERT.CONFIRM_BUTTON');
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
