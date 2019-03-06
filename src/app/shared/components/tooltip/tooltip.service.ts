import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ITooltipModalOffsets } from '@platform/shared/components/tooltip/tooltip.directive';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  private tooltipPosition$ = new Subject<ITooltipModalOffsets>();

  public get tooltipPosition(): Observable<ITooltipModalOffsets> {
    return this.tooltipPosition$.asObservable();
  }

  public pushTooltipPosition(position: ITooltipModalOffsets): void {
    this.tooltipPosition$.next(position);
  }
}
