import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { LoggerService } from '@anymind-ng/core';
import { CommunicatorComponent } from '@platform/features/communicator/communicator.component';

@Injectable()
export class CommunicatorDeactivateGuardService implements CanDeactivate<CommunicatorComponent> {
  constructor(private logger: LoggerService) {}

  public canDeactivate(component: CommunicatorComponent): boolean {
    if (component.canDeactivate) {
      const canDeactivate = component.canDeactivate();
      this.logger.debug(`DeactivateGuardService: Checking canDeactivate - ${String(canDeactivate)}`);

      return canDeactivate;
    } else {
      const err = 'DeactivateGuardService: method canDeactivate not found';
      this.logger.error(err);
      throw new Error(err);
    }
  }
}
