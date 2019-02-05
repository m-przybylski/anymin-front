import { Injectable } from '@angular/core';
import { GetPromoCode, PromoCodesService } from '@anymind-ng/api';
import { Observable } from 'rxjs';

@Injectable()
export class PromoCodeComponentService {
  constructor(private promoCodesService: PromoCodesService) {}

  public sendPromoCode = (token: string): Observable<GetPromoCode> =>
    this.promoCodesService.postRedeemPromoCodeRoute({ token });
}
