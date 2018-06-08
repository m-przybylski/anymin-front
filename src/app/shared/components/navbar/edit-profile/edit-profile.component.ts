import {
  Component, Input, OnDestroy, OnInit
} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ModalComponentEditProfileService } from './edit-profile.component.service';
import {
  ContentHeightAnimationService
}
  from '../../../services/animation/content-height/content-height.animation.service';
import { Config } from '../../../../../config';

@Component({
  styleUrls: ['./edit-profile.component.sass'],
  templateUrl: './edit-profile.component.html',
  providers: [ModalComponentEditProfileService]
})

export class ModalComponentEditProfile implements OnInit, OnDestroy {
  public expertFormControlName = 'expertNameProfileControl';
  public expertFormControlDescription = 'expertDescriptionControl';
  public clientFormControlName = 'clientNameProfileControl';
  public clientNameForm = new FormGroup({});
  public expertNameForm = new FormGroup({});
  public isExpertForm = true;
  public readonly consultationMinlength = Config.inputsLength.consultationMinDescription;
  public readonly consultationMaxlength = Config.inputsLength.consultationMaxDescription;

  @Input()
  public isOpenAsExpert: boolean;

  constructor(public activeModal: NgbActiveModal,
              private contentHeightService: ContentHeightAnimationService) {
  }

  public ngOnInit(): void {
    this.isExpertForm = this.isOpenAsExpert;
  }

  public ngOnDestroy(): void {
    this.contentHeightService.getPreviousHeight$().next('inherit');
  }

  public onClientFormSubmit = (): void => {
  }

  public onExpertFormSubmit = (): void => {
  }

  public onBackToClientStep = (): void => {
    this.isExpertForm = false;
  }

  public onCreateExpertAccount = (): void => {
    this.isExpertForm = !this.isExpertForm;
  }

  public onModalClose = (): void =>
    this.activeModal.close()

}
