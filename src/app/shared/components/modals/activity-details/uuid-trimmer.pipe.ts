import { Pipe } from '@angular/core';

@Pipe({ name: 'uuidTrimmer' })
export class UuidTrimmerPipe {
  public transform(uuid?: string): string {
    if (typeof uuid !== 'undefined') {
      const trimmedID = uuid.split('-').pop();

      return trimmedID ? trimmedID.toUpperCase() : '';
    }

    return '';
  }
}
