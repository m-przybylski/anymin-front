import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostClientComplaint } from '@anymind-ng/api';
import { FormGroup } from '@angular/forms';
import { Config } from 'config';

export interface IComplaintFormData {
  selectedComplaint: PostClientComplaint.ComplaintTypeEnum;
  comment: string;
}

@Component({
  selector: 'plat-complaint-form',
  templateUrl: './complaint-form.component.html',
  styleUrls: ['./complaint-form.component.sass'],
})
export class ComplaintFormComponent implements OnInit {
  @Input()
  public isComplaintInputDisabled: boolean;

  @Output()
  public submitFormEmitter$: EventEmitter<IComplaintFormData> = new EventEmitter();

  public readonly minValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMinLength;
  public readonly maxValidDescriptionLength = Config.inputsLengthNumbers.callSummaryCommentMaxLength;
  public readonly postClientComplaintEnum = PostClientComplaint.ComplaintTypeEnum;
  public readonly complaintFormControlName = 'complaint';
  public readonly complaintCommentFormControlName = 'complaintComment';

  public complaintForm: FormGroup;
  public isDisabled: boolean;

  public ngOnInit(): void {
    this.complaintForm = new FormGroup({});
    this.complaintForm.valueChanges.subscribe(_ => {
      this.isDisabled =
        this.isComplaintInputDisabled || this.complaintForm.controls[this.complaintFormControlName].value === '';
    });
  }

  public onSubmitComplaintForm(): void {
    if (!this.isDisabled) {
      this.submitFormEmitter$.emit({
        selectedComplaint: this.complaintForm.controls[this.complaintFormControlName].value,
        comment: this.complaintForm.controls[this.complaintCommentFormControlName].value,
      });
    }
  }
}
