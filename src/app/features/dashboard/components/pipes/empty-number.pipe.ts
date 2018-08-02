import { Pipe, PipeTransform } from '@angular/core';
/*
 * Replace provided number with special character
 * if number equals to 0. replaceWith parameter defaults to '-'
 * Usage:
 *  value | emptyNumber:replaceWith
 * Examples:
 *  {{ 2 | emptyNumber:'x' }}
 *  formats to: '2'
 *  {{ 0 | emptyNumber }}
 *  formats to: '-'
 */

@Pipe({ name: 'emptyNumber' })
export class EmptyNumberPipe implements PipeTransform {
  public transform(value: number | undefined, replaceWith = '-'): string {
    if (typeof value === 'undefined' || value === 0) {
      return replaceWith;
    }

    return value.toString();
  }
}
