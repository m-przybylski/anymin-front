import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { LoggerService } from '../logger.service';

@Injectable({ providedIn: 'root' })
export class FormUtilsService {
  constructor(private logger: LoggerService) {}

  public isFieldInvalid = (formGroup: FormGroup, controlName: string): boolean => {
    const control = formGroup.get(controlName);
    if (control) {
      return !control.valid && control.touched;
    } else {
      this.logger.error(`FormUtilsService: field with name ${controlName} not found in formGroup`, formGroup);

      return false;
    }
  };

  public validateAllFormFields(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
