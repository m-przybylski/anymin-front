import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PostTechnicalProblem } from '@anymind-ng/api';

@Component({
  selector: 'plat-technical-problem',
  templateUrl: './technical-problem.component.html',
  styleUrls: ['./technical-problem.component.sass'],
})
export class TechnicalProblemComponent implements OnInit {
  @Input()
  public isTechnicalProblemInputDisabled: boolean;

  @Output()
  public submitFormEmitter$: EventEmitter<PostTechnicalProblem.ProblemTypeEnum> = new EventEmitter();

  public readonly technicalProblemControlName = 'technicalProblem';
  public readonly postTechnicalProblemEnum = PostTechnicalProblem.ProblemTypeEnum;
  public technicalProblemForm: FormGroup;
  public isDisabled: boolean;

  public ngOnInit(): void {
    this.technicalProblemForm = new FormGroup({});
    this.technicalProblemForm.valueChanges.subscribe(_ => {
      this.isDisabled =
        this.isTechnicalProblemInputDisabled ||
        this.technicalProblemForm.controls[this.technicalProblemControlName].value === '';
    });
  }

  public onSubmitTechnicalProblem(): void {
    if (!this.isDisabled) {
      this.submitFormEmitter$.emit(this.technicalProblemForm.controls[this.technicalProblemControlName].value);
    }
  }

  public technicalProblemButtonTr(): string {
    return this.technicalProblemForm.controls[this.technicalProblemControlName].value ===
      this.postTechnicalProblemEnum.OTHER
      ? 'CALL_SUMMARY.TECHNICAL_PROBLEM_BUTTON_NEXT'
      : 'CALL_SUMMARY.TECHNICAL_PROBLEM_BUTTON_SEND';
  }
}
