import { Injectable } from '@angular/core';
import { Logger } from '@platform/core/logger';
import { LoggerFactory } from '@anymind-ng/core';

const TEXT_PLAIN = 'text/plain';

@Injectable()
export class ClipboardService extends Logger {
  constructor(loggerFactory: LoggerFactory) {
    super(loggerFactory);
  }

  public async writeText(textToCopy: string): Promise<void> {
    const thisNavigator: INavigatorClipboard = navigator as INavigatorClipboard;
    if (thisNavigator.clipboard && thisNavigator.clipboard.writeText) {
      this.loggerService.debug('Using `navigator.clipboard.writeText()`.');

      return thisNavigator.clipboard.writeText(textToCopy);
    }

    return this.write(textToCopy);
  }

  // tslint:disable-next-line:cyclomatic-complexity
  private async write(textToCopy: string): Promise<void> {
    /**
     * Internet Explorer <3
     */
    if (this.seemToBeInIE()) {
      if (this.writeIE(textToCopy)) {
        return;
      } else {
        throw new Error('Copying failed, possibly because the user rejected it.');
      }
    }

    if (this.execCopy(textToCopy)) {
      this.loggerService.debug('regular execCopy worked');

      return;
    }

    /**
     * Fallback 1 for desktop Safari 12.
     */
    if (this.copyUsingTempSelection(document.body, textToCopy)) {
      this.loggerService.debug('copyUsingTempSelection worked');

      return;
    }

    /**
     * Fallback 2 for desktop Safari 11.
     */
    if (this.copyUsingTempElem(textToCopy)) {
      this.loggerService.debug('copyUsingTempElem worked');

      return;
    }

    /**
     * Fallback for iOS Safari
     */
    if (this.copyTextUsingDOM(textToCopy)) {
      this.loggerService.debug('copyTextUsingDOM worked');

      return;
    }

    throw new Error('Copy command failed.');
  }

  /**
   * Implementation
   * execCopy is the way to go with specs
   * but some browsers do not follow the spec
   */
  private execCopy(data: string): boolean {
    const result = { success: false };
    const listener = (textToCopy: string): ((e: ClipboardEvent) => void) => (e: ClipboardEvent): void => {
      this.loggerService.debug('listener called');
      e.clipboardData.setData(TEXT_PLAIN, textToCopy);
      if (e.clipboardData.getData(TEXT_PLAIN) !== data) {
        this.loggerService.warn('setting text/plain failed');
        result.success = true;
      }
      e.preventDefault();
    };
    document.addEventListener('copy', listener(data));
    try {
      document.execCommand('copy');
    } finally {
      document.removeEventListener('copy', listener(data));
    }

    return result.success;
  }

  // Temporarily select a DOM element, so that `execCommand()` is not rejected.
  private copyUsingTempSelection(e: HTMLElement, text: string): boolean {
    this.selectionSet(e);
    const success = this.execCopy(text);
    this.selectionClear();

    return success;
  }

  private copyTextUsingDOM(str: string): boolean {
    this.loggerService.debug('copyTextUsingDOM');

    const tempElem = document.createElement('div');
    tempElem.setAttribute('style', '-webkit-user-select: text !important');
    let spanParent: Node = tempElem; // tslint:disable-line
    if (tempElem.attachShadow) {
      this.loggerService.debug('Using shadow DOM.');
      spanParent = tempElem.attachShadow({ mode: 'open' });
    }
    const span = document.createElement('span');
    span.innerText = str;
    spanParent.appendChild(span);
    document.body.appendChild(tempElem);
    this.selectionSet(span);
    const result = document.execCommand('copy');

    this.selectionClear();
    document.body.removeChild(tempElem);

    return result;
  }
  /**
   * Create a temporary DOM element to select,
   * so that `execCommand()` is not rejected
   */
  private copyUsingTempElem(text: string): boolean {
    const divElement = document.createElement('div');
    divElement.setAttribute('style', '-webkit-user-select: text !important');
    // Place some text in the elem so that Safari <3 has something to select.
    divElement.textContent = 'temporary element';
    document.body.appendChild(divElement);
    const success = this.copyUsingTempSelection(divElement, text);
    document.body.removeChild(divElement);

    return success;
  }

  /**
   * Selection helpers
   */

  private selectionSet(elem: Element): void {
    const sel = document.getSelection();
    const range = document.createRange();
    range.selectNodeContents(elem);
    sel.removeAllRanges();
    sel.addRange(range);
  }

  private selectionClear(): void {
    document.getSelection().removeAllRanges();
  }

  /**
   * Internet Explorer helpers
   */
  private seemToBeInIE(): boolean {
    return (
      // tslint:disable-next-line:strict-type-predicates
      typeof ClipboardEvent === 'undefined' &&
      // tslint:disable-next-line:strict-type-predicates
      typeof (window as IEWindow).clipboardData !== 'undefined' &&
      typeof (window as IEWindow).clipboardData.setData !== 'undefined' // tslint:disable-line
    );
  }

  private writeIE(text: string): boolean {
    return (window as IEWindow).clipboardData.setData('Text', text);
  }
}
interface IEWindow extends Window {
  clipboardData: {
    setData(key: string, value: string): boolean;
  };
}

/**
 * override future Clipboard API
 */
interface IClipboard {
  writeText(newClipText: string): Promise<void>;
  // Add any other methods you need here.
}

interface INavigatorClipboard {
  // Only available in a secure context.
  readonly clipboard?: IClipboard;
}
