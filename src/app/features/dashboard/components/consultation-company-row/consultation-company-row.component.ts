import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MoneyDto, ServiceWithEmployments } from '@anymind-ng/api';

@Component({
  selector: 'plat-consultation-company-row',
  templateUrl: './consultation-company-row.component.html',
  styleUrls: ['./consultation-company-row.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultationCompanyRowComponent {
  @Input()
  public consultation: ServiceWithEmployments;

  public get header(): string {
    return this.consultation.service.name;
  }

  public get price(): MoneyDto {
    return this.consultation.service.price;
  }

  public get expertAvatarTokenList(): ReadonlyArray<string> {
    return this.consultation.employments.map(employment => employment.employeeProfile.avatar);
  }
}
