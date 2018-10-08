import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepperComponent } from './stepper.component';
import { StepComponent } from './step.component';

@NgModule({
  imports: [CommonModule],
  exports: [StepperComponent, StepComponent],
  declarations: [StepperComponent, StepComponent],
})
export class StepperModule {}
