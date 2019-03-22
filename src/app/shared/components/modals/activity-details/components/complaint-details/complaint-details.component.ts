import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GetClientComplaint } from '@anymind-ng/api';
import { FormUtilsService } from '@anymind-ng/core';
import { ComplaintDetailsComponentService } from './complaint-details.component.service';
import { Animations } from '@platform/shared/animations/animations';
import { StepperComponent } from '@platform/shared/components/stepper/stepper.component';
import { FormGroup } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'plat-complaint-details',
  templateUrl: './complaint-details.component.html',
  styleUrls: ['./complaint-details.component.sass'],
  providers: [ComplaintDetailsComponentService],
  animations: Animations.collapse,
})
export class ComplaintDetailsComponent implements OnInit {
  @Input()
  public complaint: GetClientComplaint;

  @ViewChild(StepperComponent)
  public stepper: StepperComponent;

  public readonly rejectReasonMaxLength = 600;
  public readonly rejectReasonMinLength = 3;
  public readonly rejectComplaintForm: FormGroup = new FormGroup({});

  public status: string;
  public reason: string;
  public description: string;
  public isComplaintActionsVisible: boolean;
  public isRequestPending = false;
  public isSueExpert: boolean;

  public readonly rejectReasonControlName = 'rejectReason';

  constructor(
    private complaintDetailsComponentService: ComplaintDetailsComponentService,
    private formUtils: FormUtilsService,
  ) {}

  public ngOnInit(): void {
    this.complaintDetailsComponentService.getExpertProfileId().subscribe(expertId => {
      this.isSueExpert = expertId === this.complaint.expertId;
    });
    this.status = this.complaintDetailsComponentService.getStatusTrKey(this.complaint.status, this.isSueExpert);
    this.reason = this.complaintDetailsComponentService.getReasonTrKey(this.complaint.complaintType);
    this.description = this.complaint.message;
    this.isComplaintActionsVisible = this.complaint.status === GetClientComplaint.StatusEnum.NEW;
  }

  public onAcceptClick(): void {
    this.isRequestPending = true;
    this.complaintDetailsComponentService
      .acceptComplaint(this.complaint.sueId)
      .pipe(
        finalize(() => {
          this.isRequestPending = false;
        }),
      )
      .subscribe(() => {
        this.isComplaintActionsVisible = false;
        this.status = 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.ACCEPTED_BY_EXPERT';
      });
  }

  public onRejectClick(): void {
    this.stepper.next();
  }

  public onSubmitRejectClick(): void {
    if (this.rejectComplaintForm.valid) {
      this.isRequestPending = true;
      this.complaintDetailsComponentService
        .rejectComplaint(this.complaint.sueId, this.rejectComplaintForm.controls[this.rejectReasonControlName].value)
        .pipe(
          finalize(() => {
            this.isRequestPending = false;
          }),
        )
        .subscribe(() => {
          this.status = 'ACTIVITY_DETAILS.DETAIL_TITLE.COMPLAINT.STATUS.INVESTIGATE_BY_ADMIN';
          this.isComplaintActionsVisible = false;
        });
    } else {
      this.formUtils.validateAllFormFields(this.rejectComplaintForm);
    }
  }

  public onCloseRejectActionClick(): void {
    this.stepper.previous();
  }
}
