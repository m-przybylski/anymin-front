import { XSRFStrategy } from '@angular/http';

export class XSRFStrategyProvider implements XSRFStrategy {
  configureRequest(): void {
  }
}
